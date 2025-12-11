import { Bell } from "lucide-react";

export default function NotificationsCard() {
  return (
    <div
      className="bg-gradient-to-br from-purple-700 via-purple-800 to-fuchsia-900 rounded-3xl p-8 flex flex-col min-h-[300px]"
      style={{ fontFamily: 'var(--font-family), "Source Serif Pro", serif' }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-6 h-6 text-purple-300" />
        <h2 className="text-white text-2xl font-bold">Thông Báo</h2>
      </div>

      <div className="flex-1 flex items-center justify-center text-purple-200/70 text-lg">
        Nhận thông báo và cảnh báo
      </div>
    </div>
  );
}
