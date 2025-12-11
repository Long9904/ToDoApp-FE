import { Calendar } from "lucide-react";

export default function ScheduleCard() {
  return (
    <div
      className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-blue-900 rounded-3xl p-8 flex flex-col min-h-[300px]"
      style={{ fontFamily: 'var(--font-family), "Source Serif Pro", serif' }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-indigo-300" />
        <h2 className="text-white text-2xl font-bold">Lịch Trình Hôm Nay</h2>
      </div>

      <div className="flex-1 flex items-center justify-center text-indigo-200/70 text-lg">
        Quản lý lịch trình và sự kiện
      </div>
    </div>
  );
}
