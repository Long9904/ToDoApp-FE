import type { Task, TaskList, Tag } from "../home/sampleType";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Research content ideas",
    description: "",
    completed: false,
    dueDate: "",
    list: "Work",
    tags: [],
    subtasks: [],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Create a database of guest authors",
    description: "",
    completed: false,
    dueDate: "",
    list: "Work",
    tags: [],
    subtasks: [],
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    title: "Renew driver's license",
    description: "",
    completed: false,
    dueDate: "2025-05-11",
    list: "Personal",
    tags: ["Tag 1"],
    subtasks: [
      { id: "s1", title: "Gather required documents", completed: false },
    ],
    createdAt: "2024-01-15",
  },
  {
    id: "4",
    title: "Consult accountant",
    description: "",
    completed: false,
    dueDate: "",
    list: "List 1",
    tags: [],
    subtasks: [
      { id: "s2", title: "Prepare financial documents", completed: false },
    ],
    createdAt: "2024-01-15",
  },
  {
    id: "5",
    title: "Print business card",
    description: "",
    completed: false,
    dueDate: "",
    list: "Work",
    tags: [],
    subtasks: [],
    createdAt: "2024-01-15",
  },
];

export const mockLists: TaskList[] = [
  { id: "1", name: "Personal", color: "bg-red-500", count: 3 },
  { id: "2", name: "Work", color: "bg-teal-500", count: 6 },
  { id: "3", name: "List 1", color: "bg-yellow-500", count: 3 },
];

export const mockTags: Tag[] = [
  { id: "1", name: "Tag 1", color: "bg-blue-100 text-blue-800" },
  { id: "2", name: "Tag 2", color: "bg-purple-100 text-purple-800" },
];
