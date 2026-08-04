import { useCallback, useEffect, useState } from "react";

import { Search, Plus, AlertCircle } from "lucide-react";

import { Button, ConfirmDialog, Input, Modal } from "@/components/ui";

import TaskForm from "@/components/task/TaskForm";
import TaskList from "@/components/task/TaskList";

import TaskService from "@/services/task.service";
import ProjectService from "@/services/project.service";
import UserService from "@/services/user.service";
import { CurrentUserService } from "@/services/current-user.service";

import TasksSkeleton from "@/components/skeletons/TasksSkeleton";

import { useApiRequest } from "@/hooks/useApiRequest";
import { useToast } from "@/context/ToastContext";

import type { Project, Task, User } from "@/types";

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const isAdmin = CurrentUserService.isAdmin();

  const { execute, serverError } = useApiRequest();
  const { showToast } = useToast();

  const loadLookups = useCallback(async () => {
    await execute(async () => {
      const [projects, users] = await Promise.all([
        ProjectService.getAll(),
        UserService.getAll(),
      ]);

      setProjects(projects);
      setUsers(users);
    });
  }, [execute]);

  const loadTasks = useCallback(
    async (searchValue?: string) => {
      setLoading(true);

      await execute(async () => {
        const tasks = await TaskService.getAll({
          search: searchValue,
        });

        setTasks(tasks);
      });

      setLoading(false);
    },
    [execute],
  );

  useEffect(() => {
    void loadLookups();
  }, [loadLookups]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadTasks(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, loadTasks]);

  const handleDelete = async () => {
    if (!selectedTask) return;

    const success = await execute(async () => {
      await TaskService.delete(selectedTask.id);

      showToast("Task deleted successfully.", "success");
    });

    if (!success) return;

    setOpenDelete(false);
    setSelectedTask(null);

    void loadTasks(search);
  };

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-navy-900 text-[26px] font-semibold tracking-tight">
            Tasks
          </h1>

          <p className="mt-1 text-[14.5px] text-slate-500">Manage all tasks.</p>
        </div>

        {isAdmin && (
          <Button
            onClick={() => {
              setSelectedTask(null);
              setOpenForm(true);
            }}
            className="flex items-center gap-2 bg-linear-to-b from-navy-800 to-navy-900 px-5 py-3 font-medium text-white shadow-lg shadow-navy-900/15 transition-all duration-200 hover:from-navy-700 hover:to-navy-800 hover:shadow-xl"
          >
            <Plus size={18} />
            New Task
          </Button>
        )}
      </div>

      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startAdornment={<Search size={18} className="text-slate-400" />}
      />

      {serverError && (
        <div className="flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-[14.5px] text-rose-700">
          <AlertCircle size={17} className="mt-0.5 shrink-0 text-rose-500" />
          <span>{serverError}</span>
        </div>
      )}

      {loading ? (
        <TasksSkeleton />
      ) : (
        <TaskList
          tasks={tasks}
          isAdmin={isAdmin}
          onEdit={(task) => {
            setSelectedTask(task);
            setOpenForm(true);
          }}
          onDelete={(task) => {
            setSelectedTask(task);
            setOpenDelete(true);
          }}
        />
      )}

      <Modal
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedTask(null);
        }}
        title={selectedTask ? "Update Task" : "Create Task"}
      >
        <TaskForm
          task={selectedTask ?? undefined}
          projects={projects}
          users={users}
          onCancel={() => {
            setOpenForm(false);
            setSelectedTask(null);
          }}
          onSuccess={() => {
            setOpenForm(false);
            setSelectedTask(null);
            void loadTasks(search);
          }}
        />
      </Modal>

      <ConfirmDialog
        open={openDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${selectedTask?.task_name}"?`}
        confirmText="Delete"
        confirmVariant="danger"
        onCancel={() => {
          setOpenDelete(false);
          setSelectedTask(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default TasksPage;
