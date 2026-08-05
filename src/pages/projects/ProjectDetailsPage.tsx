import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Search, Plus, AlertCircle, FolderX } from "lucide-react";

import ProjectHeader from "@/components/project/ProjectHeader";
import TaskList from "@/components/task/TaskList";
import { Button, Input, Modal, ConfirmDialog } from "@/components/ui";

import ProjectDetailsSkeleton from "@/components/skeletons/ProjectDetailsSkeleton";
import ProjectService from "@/services/project.service";
import TaskService from "@/services/task.service";
import TaskStatusForm from "@/components/task/TaskStatusForm";

import type { Project, Task, User } from "@/types";

import UserService from "@/services/user.service";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import { useApiRequest } from "@/hooks/useApiRequest";
import TaskForm from "@/components/task/TaskForm";

const ProjectDetailsPage = () => {
  const { id } = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const { showToast } = useToast();

  const { serverError, execute } = useApiRequest();

  const { isAdmin } = useAuth();

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
  const loadUsers = useCallback(async () => {
    await execute(async () => {
      const data = await UserService.getAll();

      setUsers(data);
    });
  }, [execute]);

  useEffect(() => {
    if (!isAdmin) return;
    void loadUsers();
  }, [loadUsers, isAdmin]);

  const loadProject = useCallback(async () => {
    if (!id) return;

    await execute(async () => {
      const data = await ProjectService.getById(id);

      setProject(data);
    });
  }, [id, execute]);

  const loadTasks = useCallback(
    async (searchValue?: string) => {
      if (!id) return;

      await execute(async () => {
        const data = await TaskService.getAll({
          project_id: Number(id),
          search: searchValue,
        });

        setTasks(data);
      });
    },
    [id, execute],
  );

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);

      try {
        await loadProject();
      } finally {
        setLoading(false);
      }
    };

    void fetchProject();
  }, [loadProject]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadTasks(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, loadTasks]);

  if (loading) {
    return <ProjectDetailsSkeleton />;
  }

  if (serverError) {
    return (
      <div className="m-8 flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-[14.5px] text-rose-700">
        <AlertCircle size={17} className="mt-0.5 shrink-0 text-rose-500" />
        <span>{serverError}</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
          <FolderX size={20} strokeWidth={1.75} className="text-slate-400" />
        </div>
        <p className="text-[14.5px] text-slate-500">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <ProjectHeader project={project} />

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-navy-900 text-[22px] font-semibold tracking-tight">
              Tasks
            </h2>

            <p className="mt-1 text-[14.5px] text-slate-500">
              Manage all tasks in this project.
            </p>
          </div>

          {isAdmin && (
            <Button
              onClick={() => {
                setSelectedTask(null);
                setOpenForm(true);
              }}
              className="bg-linear-to-b from-navy-800 to-navy-900 px-5 py-2.5 font-medium text-white shadow-lg shadow-navy-900/15 hover:from-navy-700 hover:to-navy-800"
            >
              <Plus size={18} />
              Add Task
            </Button>
          )}
        </div>

        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          startAdornment={<Search size={18} className="text-slate-400" />}
        />

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
          onChangeStatus={(task) => {
            setSelectedTask(task);
            setOpenStatus(true);
          }}
        />
      </section>
      {/* Create / Update Task */}
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
          projectId={Number(id)}
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

      {/* Update Task Status */}
      <Modal
        open={openStatus}
        onClose={() => {
          setOpenStatus(false);
          setSelectedTask(null);
        }}
        title="Update Task Status"
      >
        {selectedTask && (
          <TaskStatusForm
            task={selectedTask}
            onCancel={() => {
              setOpenStatus(false);
              setSelectedTask(null);
            }}
            onSuccess={() => {
              setOpenStatus(false);
              setSelectedTask(null);

              void loadTasks(search);
            }}
          />
        )}
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

export default ProjectDetailsPage;
