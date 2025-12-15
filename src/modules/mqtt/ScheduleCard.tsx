import { useState } from "react";
import { Calendar, Clock, Bell } from "lucide-react";

interface AlarmScheduleCardProps {
  onAlarmSet?: (data: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  }) => void;
  onAlarmDelete?: () => void;
}

export default function AlarmScheduleCard({
  onAlarmSet,
  onAlarmDelete,
}: AlarmScheduleCardProps) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [day, setDay] = useState(now.getDate());
  const [hours, setHours] = useState(7);
  const [minutes, setMinutes] = useState(0);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const handleSave = () => {
    const alarmData = {
      year,
      month,
      day,
      hour: hours,
      minute: minutes,
    };

    if (onAlarmSet) {
      onAlarmSet(alarmData);
    }
    alert(
      `Báo thức đã được đặt:\n${day}/${month}/${year} lúc ${hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }`
    );
  };

  const handleDelete = () => {
    if (onAlarmDelete) {
      onAlarmDelete();
    }
    alert("Báo thức đã được xóa");
  };

  return (
    <div
      className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 rounded-3xl p-8 border border-purple-500/30 shadow-2xl"
      style={{
        fontFamily: 'var(--font-family), "Source Serif Pro", serif',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-purple-500/20 rounded-xl">
          <Bell className="w-6 h-6 text-purple-300" />
        </div>
        <h2 className="text-white text-3xl font-bold">Đặt Báo Thức</h2>
      </div>

      {/* Date Selection */}
      <div className="mb-8">
        <label className="text-purple-200 text-sm font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Chọn Ngày
        </label>
        <div className="grid grid-cols-3 gap-4">
          {/* Day */}
          <div className="relative">
            <label className="text-xs text-purple-300 mb-2 block font-medium">
              Ngày
            </label>
            <div className="relative group">
              <input
                type="number"
                min="1"
                max={getDaysInMonth(year, month)}
                value={day}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  const maxDay = getDaysInMonth(year, month);
                  setDay(Math.min(maxDay, Math.max(1, val)));
                }}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm text-white text-2xl font-bold rounded-xl border-2 border-purple-400/30 focus:border-purple-400 focus:outline-none text-center transition-all hover:bg-white/15"
              />
            </div>
          </div>

          {/* Month */}
          <div className="relative">
            <label className="text-xs text-purple-300 mb-2 block font-medium">
              Tháng
            </label>
            <div className="relative group">
              <input
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  const newMonth = Math.min(12, Math.max(1, val));
                  setMonth(newMonth);
                  const maxDay = getDaysInMonth(year, newMonth);
                  if (day > maxDay) setDay(maxDay);
                }}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm text-white text-2xl font-bold rounded-xl border-2 border-purple-400/30 focus:border-purple-400 focus:outline-none text-center transition-all hover:bg-white/15"
              />
            </div>
          </div>

          {/* Year */}
          <div className="relative">
            <label className="text-xs text-purple-300 mb-2 block font-medium">
              Năm
            </label>
            <div className="relative group">
              <input
                type="number"
                min="2024"
                max="2099"
                value={year}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 2024;
                  setYear(Math.min(2099, Math.max(2024, val)));
                }}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm text-white text-2xl font-bold rounded-xl border-2 border-purple-400/30 focus:border-purple-400 focus:outline-none text-center transition-all hover:bg-white/15"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Time Selection */}
      <div className="mb-8">
        <label className="text-purple-200 text-sm font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Chọn Giờ
        </label>
        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border-2 border-purple-400/30">
          <div className="flex gap-8 items-center justify-center">
            {/* Hours */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative w-full mb-4">
                <input
                  type="range"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  className="w-full h-3 bg-purple-700/30 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(168 85 247) 0%, rgb(168 85 247) ${
                      (hours / 23) * 100
                    }%, rgb(88 28 135 / 0.3) ${
                      (hours / 23) * 100
                    }%, rgb(88 28 135 / 0.3) 100%)`,
                  }}
                />
              </div>
              <input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setHours(Math.min(23, Math.max(0, val)));
                }}
                className="w-28 text-6xl font-bold text-white text-center bg-transparent border-b-4 border-purple-400 focus:border-purple-300 focus:outline-none pb-2"
              />
              <span className="text-sm text-purple-300 mt-3 font-medium">
                Giờ
              </span>
            </div>

            <span className="text-6xl font-bold text-purple-300 pb-8">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative w-full mb-4">
                <input
                  type="range"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(parseInt(e.target.value))}
                  className="w-full h-3 bg-purple-700/30 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(168 85 247) 0%, rgb(168 85 247) ${
                      (minutes / 59) * 100
                    }%, rgb(88 28 135 / 0.3) ${
                      (minutes / 59) * 100
                    }%, rgb(88 28 135 / 0.3) 100%)`,
                  }}
                />
              </div>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setMinutes(Math.min(59, Math.max(0, val)));
                }}
                className="w-28 text-6xl font-bold text-white text-center bg-transparent border-b-4 border-purple-400 focus:border-purple-300 focus:outline-none pb-2"
              />
              <span className="text-sm text-purple-300 mt-3 font-medium">
                Phút
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mb-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-purple-400/20">
        <div className="text-center">
          <div className="text-purple-300 text-sm font-medium mb-1">
            Báo thức sẽ đổ vào:
          </div>
          <div className="text-white text-2xl font-bold">
            {day}/{month}/{year} - {hours}:
            {minutes < 10 ? "0" + minutes : minutes}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleSave}
          className="py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg hover:shadow-purple-500/50 hover:from-purple-400 hover:to-indigo-400"
        >
          Đặt Báo Thức
        </button>
        <button
          onClick={handleDelete}
          className="py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg hover:shadow-red-500/50 hover:from-red-400 hover:to-rose-400"
        >
          Xóa Báo Thức
        </button>
      </div>
    </div>
  );
}
