import { useState } from "react";
import { Calendar, Clock, Bell } from "lucide-react";

interface AlarmScheduleCardProps {
  onAlarmSet?: (data: { days: number[]; hour: number; minute: number }) => void;
}

export default function AlarmScheduleCard({
  onAlarmSet,
}: AlarmScheduleCardProps) {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [hours, setHours] = useState(7);
  const [minutes, setMinutes] = useState(0);

  const daysOfWeek = [
    { id: 1, label: "CN", fullName: "Chủ Nhật" },
    { id: 2, label: "T2", fullName: "Thứ Hai" },
    { id: 3, label: "T3", fullName: "Thứ Ba" },
    { id: 4, label: "T4", fullName: "Thứ Tư" },
    { id: 5, label: "T5", fullName: "Thứ Năm" },
    { id: 6, label: "T6", fullName: "Thứ Sáu" },
    { id: 7, label: "T7", fullName: "Thứ Bảy" },
  ];

  const toggleDay = (dayId: number) => {
    setSelectedDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((id) => id !== dayId)
        : [...prev, dayId].sort((a, b) => a - b)
    );
  };

  const handleSave = () => {
    const alarmData = {
      days: selectedDays,
      hour: hours,
      minute: minutes,
    };

    if (onAlarmSet) {
      onAlarmSet(alarmData);
    }
    alert(
      "Báo thức đã được lưu: " +
        alarmData.days.join(", ") +
        " lúc " +
        `${alarmData.hour}:${
          alarmData.minute < 10 ? "0" + alarmData.minute : alarmData.minute
        }`
    );
  };

  return (
    <div
      className="bg-gradient-to-br from-slate-800 via-slate-900 to-zinc-900 rounded-3xl p-8 border border-slate-700/50"
      style={{
        fontFamily: 'var(--font-family), "Source Serif Pro", serif',
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-6 h-6 text-slate-400" />
        <h2 className="text-white text-2xl font-bold">Báo Thức</h2>
      </div>

      {/* Chọn giờ và phút */}
      <div className="mb-6">
        <label className="text-gray-300 text-sm font-medium mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Thời gian
        </label>
        <div className="flex gap-4 items-center justify-center bg-black/30 p-6 rounded-xl border border-slate-700/50">
          <div className="flex flex-col items-center">
            <input
              type="range"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="w-32 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
            />
            <input
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                setHours(Math.min(23, Math.max(0, val)));
              }}
              className="mt-2 w-20 text-4xl font-bold text-white text-center bg-transparent border-b-2 border-slate-600 focus:border-slate-400 focus:outline-none"
            />
            <span className="text-xs text-gray-400 mt-1">Giờ</span>
          </div>

          <span className="text-4xl font-bold text-white">:</span>

          <div className="flex flex-col items-center">
            <input
              type="range"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value))}
              className="w-32 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
            />
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                setMinutes(Math.min(59, Math.max(0, val)));
              }}
              className="mt-2 w-20 text-4xl font-bold text-white text-center bg-transparent border-b-2 border-slate-600 focus:border-slate-400 focus:outline-none"
            />
            <span className="text-xs text-gray-400 mt-1">Phút</span>
          </div>
        </div>
      </div>

      {/* Chọn ngày trong tuần */}
      <div className="mb-6">
        <label className="text-gray-300 text-sm font-medium mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Lặp lại vào các ngày
        </label>
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day) => (
            <button
              key={day.id}
              onClick={() => toggleDay(day.id)}
              className={`
                aspect-square rounded-xl font-semibold text-sm transition-all transform hover:scale-105 active:scale-95
                ${
                  selectedDays.includes(day.id)
                    ? "bg-slate-600 text-white shadow-lg hover:bg-slate-500"
                    : "bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-600"
                }
              `}
              title={day.fullName}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      {/* Nút lưu */}
      <button
        onClick={handleSave}
        disabled={selectedDays.length === 0}
        className={`
          w-full py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]
          ${
            selectedDays.length > 0
              ? "bg-slate-600 text-white shadow-lg hover:bg-slate-500"
              : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
          }
        `}
      >
        {selectedDays.length > 0 ? "Lưu Báo Thức" : "Chọn ít nhất 1 ngày"}
      </button>
    </div>
  );
}
