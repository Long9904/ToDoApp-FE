import { Wind, MapPin } from "lucide-react";

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
  { en: "Phu Quoc", vi: "Phú Quốc" },
  { en: "Phu Tho", vi: "Phú Thọ" },
  { en: "Tay Ninh", vi: "Tây Ninh" },
];

interface AirData {
  city: string;
  aqi: number;
  co: number;
  pm2_5: number;
  pm10: number;
  no: number;
}

interface AirQualityCardProps {
  airData: AirData | null;
}

export default function AirQualityCard({ airData }: AirQualityCardProps) {
  const getCityVietnamese = (cityName: string) => {
    const city = VALID_CITIES.find(
      (c) => c.en.toLowerCase() === cityName.toLowerCase()
    );
    return city ? city.vi : cityName;
  };

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50)
      return { text: "Tốt", color: "text-green-400", bg: "bg-green-500/20" };
    if (aqi <= 100)
      return {
        text: "Trung bình",
        color: "text-yellow-400",
        bg: "bg-yellow-500/20",
      };
    if (aqi <= 150)
      return {
        text: "Không tốt cho nhóm nhạy cảm",
        color: "text-orange-400",
        bg: "bg-orange-500/20",
      };
    if (aqi <= 200)
      return { text: "Kém", color: "text-red-400", bg: "bg-red-500/20" };
    if (aqi <= 300)
      return { text: "Xấu", color: "text-purple-400", bg: "bg-purple-500/20" };
    return { text: "Nguy hiểm", color: "text-rose-400", bg: "bg-rose-500/20" };
  };

  return (
    <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-3xl p-8 flex flex-col min-h-[500px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-teal-400" />
            <h2 className="text-white text-3xl font-bold">
              {airData?.city
                ? getCityVietnamese(airData.city)
                : "Chọn thành phố"}
            </h2>
          </div>
        </div>
      </div>

      {airData ? (
        <>
          {/* Main Air Quality Display */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <Wind className="w-40 h-40 text-slate-500 mb-6" />
            <div
              className={`px-6 py-2 rounded-full mb-4 ${
                getAQILevel(airData.aqi).bg
              }`}
            >
              <p
                className={`text-2xl font-semibold ${
                  getAQILevel(airData.aqi).color
                }`}
              >
                {getAQILevel(airData.aqi).text}
              </p>
            </div>
            <div className="text-white text-4xl font-extralight">
              Chất lượng không khí: {airData.aqi}
            </div>
          </div>

          {/* Bottom Info Card */}
          <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-white/60 text-sm mb-1">PM2.5</div>
                <div className="text-white text-lg font-semibold">
                  {airData.pm2_5.toFixed(1)} μg/m³
                </div>
              </div>
              <div className="text-center">
                <div className="text-white/60 text-sm mb-1">PM10</div>
                <div className="text-white text-lg font-semibold">
                  {airData.pm10.toFixed(1)} μg/m³
                </div>
              </div>
              <div className="text-center">
                <div className="text-white/60 text-sm mb-1">CO</div>
                <div className="text-white text-lg font-semibold">
                  {airData.co.toFixed(1)} μg/m³
                </div>
              </div>
              <div className="text-center">
                <div className="text-white/60 text-sm mb-1">NO</div>
                <div className="text-white text-lg font-semibold">
                  {airData.no.toFixed(1)} μg/m³
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Wind className="w-24 h-24 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">
              Chọn thành phố để xem chất lượng không khí
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
