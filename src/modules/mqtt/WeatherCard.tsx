import { Cloud, Droplets, MapPin, Search } from "lucide-react";
import { useState } from "react";

const VALID_CITIES = [
  { en: "Ha Noi", vi: "Hà Nội" },
  { en: "Ho Chi Minh", vi: "Hồ Chí Minh" },
  { en: "Thu Duc", vi: "Thủ Đức" },
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

interface WeatherData {
  city: string;
  temp: number;
  desc: string;
  humidity: number;
}

interface WeatherCardProps {
  weather: WeatherData | null;
  onCitySelect: (city: string) => void;
  showCitySelect: boolean;
  setShowCitySelect: (show: boolean) => void;
}

export default function WeatherCard({
  weather,
  onCitySelect,
  showCitySelect,
  setShowCitySelect,
}: WeatherCardProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const getCityVietnamese = (cityName: string) => {
    const city = VALID_CITIES.find(
      (c) => c.en.toLowerCase() === cityName.toLowerCase()
    );
    return city ? city.vi : cityName;
  };

  const handleCityClick = (city: string) => {
    onCitySelect(city);
    setSearchQuery("");
  };

  const filteredCities = VALID_CITIES.filter(
    (city) =>
      city.vi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.en.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showCitySelect) {
    return (
      <div
        className="min-h-screen bg-slate-900 p-6 flex items-center justify-center fixed inset-0 z-50"
        style={{ fontFamily: 'var(--font-family), "Source Serif Pro", serif' }}
      >
        <div className="w-full max-w-md bg-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Chọn thành phố</h2>
            <button
              onClick={() => {
                setShowCitySelect(false);
                setSearchQuery("");
              }}
              className="text-white/60 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm thành phố..."
              className="w-full bg-slate-700/50 text-white placeholder-slate-400 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Results Info */}
          {searchQuery && (
            <div className="text-sm text-slate-400 mb-3 px-1">
              {filteredCities.length} kết quả
            </div>
          )}

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <button
                  key={city.en}
                  onClick={() => handleCityClick(city.en)}
                  className="w-full text-left px-4 py-3 text-white/80 hover:bg-teal-500/20 rounded-xl transition-colors"
                >
                  {city.vi}
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                Không tìm thấy thành phố
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-3xl p-8 flex flex-col min-h-[500px]"
      style={{ fontFamily: 'var(--font-family), "Source Serif Pro", serif' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-teal-400" />
            <h2 className="text-white text-3xl font-bold">
              {weather?.city
                ? getCityVietnamese(weather.city)
                : "Chọn thành phố"}
            </h2>
          </div>
        </div>
        <button
          onClick={() => setShowCitySelect(true)}
          className="px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 rounded-xl text-teal-200 text-lg font-medium transition-colors"
        >
          Đổi thành phố
        </button>
      </div>

      {weather ? (
        <>
          {/* Main Weather Display */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <Cloud className="w-40 h-40 text-slate-500 mb-6" />
            <p className="text-slate-300 text-2xl mb-4 capitalize">
              {weather.desc}
            </p>
            <div className="text-white text-5xl font-extralight">
              {weather.temp}°
            </div>
          </div>

          {/* Bottom Info Card */}
          <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5">
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="text-white text-sm mb-2">Hiện tại</div>
                <Cloud className="w-10 h-10 text-teal-400 mx-auto mb-2" />
                <div className="text-white text-lg font-semibold">
                  {weather.temp}°
                </div>
              </div>
              <div className="w-px h-20 bg-slate-600"></div>
              <div className="text-center">
                <div className="text-white text-sm mb-2">Độ ẩm</div>
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
  );
}
