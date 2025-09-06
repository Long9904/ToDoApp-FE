import React from "react";
import {
  Search,
  Calendar,
  StickyNote,
  Plus,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { mockLists, mockTags } from "../home/sampleMockData";

interface SidebarProps {
  selectedTask: string | null;
}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Menu</h1>
          <Menu className="w-5 h-5 text-gray-500" />
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Tasks Section */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            TASKS
          </h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Upcoming</span>
              </div>
              <span className="text-sm text-gray-500">12</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700 font-medium">Today</span>
              </div>
              <span className="text-sm text-gray-500">5</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Calendar</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <StickyNote className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Sticky Wall</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lists Section */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            LISTS
          </h2>
          <div className="space-y-2">
            {mockLists.map((list) => (
              <div
                key={list.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${list.color}`}></div>
                  <span className="text-gray-700">{list.name}</span>
                </div>
                <span className="text-sm text-gray-500">{list.count}</span>
              </div>
            ))}

            <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-500 hover:text-gray-700 w-full">
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add New List</span>
            </button>
          </div>
        </div>

        {/* Tags Section */}
        <div className="p-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            TAGS
          </h2>
          <div className="flex flex-wrap gap-2">
            {mockTags.map((tag) => (
              <span
                key={tag.id}
                className={`px-3 py-1 rounded-full text-xs ${tag.color}`}
              >
                {tag.name}
              </span>
            ))}
            <button className="px-3 py-1 rounded-full text-xs border border-dashed border-gray-300 text-gray-500 hover:bg-gray-50">
              + Add Tag
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-100">
        <div className="space-y-2">
          <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-500 hover:text-gray-700 w-full">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
          <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-500 hover:text-gray-700 w-full">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
