import { ClipboardList } from "lucide-react";

import TaskCard from "./TaskCard";

import type { Task } from "@/types";

interface TaskListProps {
  tasks: Task[];
  isAdmin: boolean;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onChangeStatus?: (task: Task) => void;
}

const TaskList = ({
  tasks,
  isAdmin,
  onEdit,
  onDelete,
  onChangeStatus,
}: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 py-16 text-center">
        <div className="brass-ring mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
          <ClipboardList
            size={20}
            strokeWidth={1.75}
            className="text-navy-900"
          />
        </div>

        <h2 className="text-navy-900 text-lg font-semibold tracking-tight">
          No tasks found
        </h2>

        <p className="mt-1.5 text-[14.5px] text-slate-500">
          There are no tasks in this project yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
        />
      ))}
    </div>
  );
};

export default TaskList;
