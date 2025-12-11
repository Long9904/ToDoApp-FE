import { useEffect, useState } from "react";
import mqtt from "mqtt";
import {
  Cloud,
  Droplets,
  MapPin,
  Calendar,
  Bell,
  Activity,
} from "lucide-react";

const VALID_CITIES = [
  { en: "Ha Noi", vi: "Hà Nội" },
  { en: "Ho Chi Minh", vi: "Hồ Chí Minh" },
  { en: "Da Nang", vi: "Đà Nẵng" },
  { en: "Can Tho", vi: "Cần Thơ" },
  { en: "Bien Hoa", vi: "Biên Hòa" },
  { en: "Vung Tau", vi: "Vũng Tàu" },
  { en: "Quy Nhon", vi: "Quy Nhơn" },
  { en: "Nha Trang", vi: "Nha Trang" },
  { en: "Hue", vi: "Huế" },
  { en: "Da Lat", vi: "Đà Lạt" },
  { en: "Buon Ma Thuot", vi: "Buôn Ma Thuột" },
  { en: "Cam Ranh", vi: "Cam Ranh" },
  { en: "Ca Mau", vi: "Cà Mau" },
  { en: "Vinh", vi: "Vinh" },
  { en: "Long Xuyen", vi: "Long Xuyên" },
  { en: "Rach Gia", vi: "Rạch Giá" },
  { en: "Soc Trang", vi: "Sóc Trăng" },
  { en: "Tra Vinh", vi: "Trà Vinh" },
  { en: "Ben Tre", vi: "Bến Tre" },
  { en: "Vinh Long", vi: "Vĩnh Long" },
  { en: "Phan Thiet", vi: "Phan Thiết" },
  { en: "Phan Rang-Thap Cham", vi: "Phan Rang - Tháp Chàm" },
  { en: "Quang Ngai", vi: "Quảng Ngãi" },
  { en: "Tuy Hoa", vi: "Tuy Hòa" },
  { en: "Ha Tinh", vi: "Hà Tĩnh" },
  { en: "Thanh Hoa", vi: "Thanh Hóa" },
  { en: "Nam Dinh", vi: "Nam Định" },
  { en: "Thai Nguyen", vi: "Thái Nguyên" },
  { en: "Thai Binh", vi: "Thái Bình" },
  { en: "Bac Ninh", vi: "Bắc Ninh" },
  { en: "Bac Giang", vi: "Bắc Giang" },
  { en: "Ha Nam", vi: "Hà Nam" },
  { en: "Ha Giang", vi: "Hà Giang" },
  { en: "Ha Long", vi: "Hạ Long" },
  { en: "Uong Bi", vi: "Uông Bí" },
  { en: "Lang Son", vi: "Lạng Sơn" },
  { en: "Cao Bang", vi: "Cao Bằng" },
  { en: "Dien Bien Phu", vi: "Điện Biên Phủ" },
  { en: "Lao Cai", vi: "Lào Cai" },
  { en: "Yen Bai", vi: "Yên Bái" },
  { en: "Tuyen Quang", vi: "Tuyên Quang" },
  { en: "Hoa Binh", vi: "Hòa Bình" },
  { en: "Ninh Binh", vi: "Ninh Bình" },
  { en: "Tam Ky", vi: "Tam Kỳ" },
  { en: "Quang Tri", vi: "Quảng Trị" },
  { en: "Dong Ha", vi: "Đông Hà" },
  { en: "Pleiku", vi: "Pleiku" },
  { en: "Kontum", vi: "Kon Tum" },
  { en: "Buon Ho", vi: "Buôn Hồ" },
  { en: "My Tho", vi: "Mỹ Tho" },
  { en: "Tan An", vi: "Tân An" },
  { en: "Cao Lanh", vi: "Cao Lãnh" },
  { en: "Sa Dec", vi: "Sa Đéc" },
  { en: "Chau Doc", vi: "Châu Đốc" },
  { en: "Son La", vi: "Sơn La" },
  { en: "Lai Chau", vi: "Lai Châu" },
  { en: "Dong Hoi", vi: "Đồng Hới" },
  { en: "Bac Lieu", vi: "Bạc Liêu" },
  { en: "Gia Nghia", vi: "Gia Nghĩa" },
  { en: "Bao Loc", vi: "Bảo Lộc" },
  { en: "Song Cau", vi: "Sông Cầu" },
  { en: "Ba Ria", vi: "Bà Rịa" },
  { en: "Go Cong", vi: "Gò Công" },
  { en: "Cu Chi", vi: "Củ Chi" },
  { en: "Hoai Nhon", vi: "Hoài Nhơn" },
  { en: "Gia Rai", vi: "Gia Rai" },
  { en: "An Khe", vi: "An Khê" },
  { en: "Phu Ly", vi: "Phủ Lý" },
  { en: "Son Tay", vi: "Sơn Tây" },
  { en: "Dong Xoai", vi: "Đồng Xoài" },
  { en: "Hong Linh", vi: "Hồng Lĩnh" },
  { en: "Kien Luong", vi: "Kiên Lương" },
  { en: "Tan Chau", vi: "Tân Châu" },
  { en: "Khanh Hoa", vi: "Khánh Hòa" },
  { en: "Ha Tien", vi: "Hà Tiên" },
  { en: "Quang Yen", vi: "Quảng Yên" },
  { en: "Phu Quoc", vi: "Phú Quốc" },
  { en: "Phu Tho", vi: "Phú Thọ" },
  { en: "Tay Ninh", vi: "Tây Ninh" },
  { en: "Thu Dau Mot", vi: "Thủ Dầu Một" },
];

export default function WeatherMQTT() {
  const [weather, setWeather] = useState<any>(null);
  const [client, setClient] = useState<any>(null);
  const [, setSelectedCity] = useState("");
  const [showCitySelect, setShowCitySelect] = useState(false);

  useEffect(() => {
    const c = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
    setClient(c);

    c.on("connect", () => {
      c.subscribe("out/weather");
    });

    c.on("message", (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log(topic);
        setWeather(data);
      } catch (err) {
        console.error("Invalid JSON", err);
      }
    });

    return () => {
      if (c.connected) {
        c.end(true);
      }
    };
  }, []);

  const publishLocation = (city: string) => {
    if (!client) return;
    client.publish("home/location", city);
    setSelectedCity(city);
    setShowCitySelect(false);
  };

  const getCityVietnamese = (cityName: string) => {
    const city = VALID_CITIES.find(
      (c) => c.en.toLowerCase() === cityName.toLowerCase()
    );
    return city ? city.vi : cityName;
  };

  if (showCitySelect) {
    return (
      <div className="min-h-screen bg-slate-900 p-6 flex items-center justify-center">
        <div className="w-full max-w-md bg-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Chọn thành phố</h2>
            <button
              onClick={() => setShowCitySelect(false)}
              className="text-white/60 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {VALID_CITIES.map((city) => (
              <button
                key={city.en}
                onClick={() => publishLocation(city.en)}
                className="w-full text-left px-4 py-3 text-white/80 hover:bg-teal-500/20 rounded-xl transition-colors"
              >
                {city.vi}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TOP LEFT - Weather */}
        <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-3xl p-8 flex flex-col min-h-[500px]">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-teal-400" />
                <h2 className="text-white text-2xl font-bold">
                  {weather?.city
                    ? getCityVietnamese(weather.city)
                    : "Chọn thành phố"}
                </h2>
              </div>
              <p className="text-slate-400 text-sm capitalize">
                {weather?.desc || "Chưa có dữ liệu"}
              </p>
            </div>
            <button
              onClick={() => setShowCitySelect(true)}
              className="px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 rounded-xl text-teal-400 text-sm font-medium transition-colors"
            >
              Đổi
            </button>
          </div>

          {weather ? (
            <>
              {/* Main Weather Display */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <Cloud className="w-40 h-40 text-slate-500 mb-6" />
                <p className="text-slate-300 text-xl mb-4 capitalize">
                  {weather.desc}
                </p>
                <div className="text-white text-9xl font-extralight">
                  {weather.temp}°
                </div>
              </div>

              {/* Bottom Info Card */}
              <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5">
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <div className="text-slate-400 text-xs mb-2">Hiện tại</div>
                    <Cloud className="w-10 h-10 text-teal-400 mx-auto mb-2" />
                    <div className="text-white text-lg font-semibold">
                      {weather.temp}°
                    </div>
                  </div>
                  <div className="w-px h-20 bg-slate-600"></div>
                  <div className="text-center">
                    <div className="text-slate-400 text-xs mb-2">Độ ẩm</div>
                    <Droplets className="w-10 h-10 text-teal-400 mx-auto mb-2" />
                    <div className="text-white text-lg font-semibold">
                      {weather.humidity}%
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Cloud className="w-24 h-24 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">
                  Chọn thành phố để xem thời tiết
                </p>
              </div>
            </div>
          )}
        </div>

        {/* TOP RIGHT - Air Quality */}
        <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 rounded-3xl p-8 flex flex-col min-h-[500px]">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-emerald-300" />
            <h2 className="text-white text-2xl font-bold">
              Chất Lượng Không Khí
            </h2>
          </div>

          <div className="flex-1 flex items-center justify-center text-emerald-200/70 text-lg">
            Theo dõi chất lượng không khí
          </div>
        </div>

        {/* BOTTOM LEFT - Schedule */}
        <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-blue-900 rounded-3xl p-8 flex flex-col min-h-[300px]">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-indigo-300" />
            <h2 className="text-white text-2xl font-bold">
              Lịch Trình Hôm Nay
            </h2>
          </div>

          <div className="flex-1 flex items-center justify-center text-indigo-200/70 text-lg">
            Quản lý lịch trình và sự kiện
          </div>
        </div>

        {/* BOTTOM RIGHT - Notifications */}
        <div className="bg-gradient-to-br from-purple-700 via-purple-800 to-fuchsia-900 rounded-3xl p-8 flex flex-col min-h-[300px]">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-purple-300" />
            <h2 className="text-white text-2xl font-bold">Thông Báo</h2>
          </div>

          <div className="flex-1 flex items-center justify-center text-purple-200/70 text-lg">
            Nhận thông báo và cảnh báo
          </div>
        </div>
      </div>
    </div>
  );
}
