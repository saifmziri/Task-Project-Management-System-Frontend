import TaskCard from "./TaskCard";

import type { Task } from "@/types";

interface TaskListProps {
  tasks: Task[];
  isAdmin: boolean;
}

const TaskList = ({ tasks, isAdmin }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center">
        <h2 className="text-xl font-semibold text-slate-900">No tasks found</h2>

        <p className="mt-2 text-slate-500">
          There are no tasks in this project yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} isAdmin={isAdmin} />
      ))}
    </div>
  );
};

export default TaskList;
