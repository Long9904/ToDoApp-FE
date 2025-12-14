import { Clock, Globe } from "lucide-react";
import { useState, useEffect } from "react";

interface ClockSettingProps {
  onTimeSet: (data: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    utcOffset: number;
  }) => void;
}

const UTC_OFFSETS = [
  { value: -12, label: "UTC-12:00" },
  { value: -11, label: "UTC-11:00" },
  { value: -10, label: "UTC-10:00" },
  { value: -9, label: "UTC-09:00" },
  { value: -8, label: "UTC-08:00" },
  { value: -7, label: "UTC-07:00" },
  { value: -6, label: "UTC-06:00" },
  { value: -5, label: "UTC-05:00" },
  { value: -4, label: "UTC-04:00" },
  { value: -3, label: "UTC-03:00" },
  { value: -2, label: "UTC-02:00" },
  { value: -1, label: "UTC-01:00" },
  { value: 0, label: "UTC±00:00" },
  { value: 1, label: "UTC+01:00" },
  { value: 2, label: "UTC+02:00" },
  { value: 3, label: "UTC+03:00" },
  { value: 4, label: "UTC+04:00" },
  { value: 5, label: "UTC+05:00" },
  { value: 6, label: "UTC+06:00" },
  { value: 7, label: "UTC+07:00 - Vietnam" },
  { value: 8, label: "UTC+08:00" },
  { value: 9, label: "UTC+09:00" },
  { value: 10, label: "UTC+10:00" },
  { value: 11, label: "UTC+11:00" },
  { value: 12, label: "UTC+12:00" },
];

export default function ClockSetting({ onTimeSet }: ClockSettingProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [utcOffset, setUtcOffset] = useState(7);
  const [manualMode, setManualMode] = useState(false);
  const [manualYear, setManualYear] = useState(new Date().getFullYear());
  const [manualMonth, setManualMonth] = useState(new Date().getMonth() + 1);
  const [manualDay, setManualDay] = useState(new Date().getDate());
  const [manualHour, setManualHour] = useState(new Date().getHours());
  const [manualMinute, setManualMinute] = useState(new Date().getMinutes());
  const [manualSecond, setManualSecond] = useState(new Date().getSeconds());

  useEffect(() => {
    if (!manualMode) {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [manualMode]);

  const getAdjustedTime = () => {
    if (manualMode) {
      return new Date(
        manualYear,
        manualMonth - 1,
        manualDay,
        manualHour,
        manualMinute,
        manualSecond
      );
    }
    const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * utcOffset);
  };

  const adjustedTime = getAdjustedTime();

  const formatTime = (date: Date) => {
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    const s = date.getSeconds().toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSetTime = () => {
    onTimeSet({
      year: adjustedTime.getFullYear(),
      month: adjustedTime.getMonth() + 1,
      day: adjustedTime.getDate(),
      hour: adjustedTime.getHours(),
      minute: adjustedTime.getMinutes(),
      second: adjustedTime.getSeconds(),
      utcOffset: utcOffset,
    });
  };

  const toggleMode = () => {
    const now = getAdjustedTime();
    setManualYear(now.getFullYear());
    setManualMonth(now.getMonth() + 1);
    setManualDay(now.getDate());
    setManualHour(now.getHours());
    setManualMinute(now.getMinutes());
    setManualSecond(now.getSeconds());
    setManualMode(!manualMode);
  };

  return (
    <div
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-8 flex flex-col min-h-[300px] border border-gray-700/50"
      style={{ fontFamily: 'var(--font-family), "Source Serif Pro", serif' }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-blue-400" />
          <h2 className="text-white text-2xl font-bold">Đồng hồ RTC</h2>
        </div>
        <Globe className="w-6 h-6 text-blue-400/60" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {/* Mode Toggle */}
        <div className="flex gap-2 bg-gray-800/50 rounded-xl p-1">
          <button
            onClick={() => setManualMode(false)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              !manualMode
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Thời gian thực
          </button>
          <button
            onClick={toggleMode}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              manualMode
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Điều chỉnh thủ công
          </button>
        </div>

        {/* Current Time Display */}
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
            <div className="relative text-white text-6xl font-light mb-2 tracking-wider">
              {formatTime(adjustedTime)}
            </div>
          </div>
          <div className="text-gray-400 text-xl mt-2">
            {formatDate(adjustedTime)}
          </div>
        </div>

        {/* Manual Time Controls */}
        {manualMode && (
          <div className="w-full max-w-md space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Ngày</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={manualDay}
                  onChange={(e) => setManualDay(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  Tháng
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={manualMonth}
                  onChange={(e) => setManualMonth(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Năm</label>
                <input
                  type="number"
                  min="2000"
                  max="2100"
                  value={manualYear}
                  onChange={(e) => setManualYear(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Giờ</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={manualHour}
                  onChange={(e) => setManualHour(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Phút</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={manualMinute}
                  onChange={(e) => setManualMinute(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Giây</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={manualSecond}
                  onChange={(e) => setManualSecond(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* UTC Offset Selector - Only show in real-time mode */}
        {!manualMode && (
          <div className="w-full max-w-xs">
            <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Múi giờ
            </label>
            <select
              value={utcOffset}
              onChange={(e) => setUtcOffset(Number(e.target.value))}
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {UTC_OFFSETS.map((offset) => (
                <option key={offset.value} value={offset.value}>
                  {offset.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Set Time Button */}
        <button
          onClick={handleSetTime}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 active:scale-95"
        >
          Đồng bộ RTC
        </button>
      </div>
    </div>
  );
}
