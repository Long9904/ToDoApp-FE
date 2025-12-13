import { Bell, Clock } from "lucide-react";
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
  const [utcOffset, setUtcOffset] = useState(7); // Default UTC+7

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getAdjustedTime = () => {
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

  return (
    <div
      className="bg-gradient-to-br from-purple-700 via-purple-800 to-fuchsia-900 rounded-3xl p-8 flex flex-col min-h-[300px]"
      style={{ fontFamily: 'var(--font-family), "Source Serif Pro", serif' }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-purple-300" />
          <h2 className="text-white text-2xl font-bold">Đồng hồ RTC</h2>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {/* Current Time Display */}
        <div className="text-center">
          <Clock className="w-20 h-20 text-purple-300/50 mx-auto mb-4" />
          <div className="text-white text-5xl font-light mb-2">
            {formatTime(adjustedTime)}
          </div>
          <div className="text-purple-200 text-xl">
            {formatDate(adjustedTime)}
          </div>
        </div>

        {/* UTC Offset Selector */}
        <div className="w-full max-w-xs">
          <label className="block text-purple-200 text-sm mb-2">Múi giờ</label>
          <select
            value={utcOffset}
            onChange={(e) => setUtcOffset(Number(e.target.value))}
            className="w-full bg-purple-600/100  text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          >
            {UTC_OFFSETS.map((offset) => (
              <option key={offset.value} value={offset.value}>
                {offset.label}
              </option>
            ))}
          </select>
        </div>

        {/* Set Time Button */}
        <button
          onClick={handleSetTime}
          className="px-8 py-3 bg-purple-500/40 hover:bg-purple-500/60 rounded-xl text-white text-lg font-semibold transition-colors shadow-lg"
        >
          Đồng bộ RTC
        </button>
      </div>
    </div>
  );
}
