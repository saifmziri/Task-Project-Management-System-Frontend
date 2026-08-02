import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Search, Plus } from "lucide-react";

import ProjectHeader from "@/components/project/ProjectHeader";
import TaskList from "@/components/task/TaskList";
import { Button, Input } from "@/components/ui";

import ProjectService from "@/services/project.service";
import TaskService from "@/services/task.service";
import { CurrentUserService } from "@/services/current-user.service";

import type { Project, Task } from "@/types";

import { useApiRequest } from "@/hooks/useApiRequest";

const ProjectDetailsPage = () => {
  const { id } = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { serverError, execute } = useApiRequest();

  const isAdmin = CurrentUserService.isAdmin();

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
    return (
      <div className="p-8 text-center text-slate-500">Loading project...</div>
    );
  }

  if (serverError) {
    return <div className="p-8 text-red-600">{serverError}</div>;
  }

  if (!project) {
    return <div className="p-8 text-slate-500">Project not found.</div>;
  }

  return (
    <div className="space-y-8 p-8">
      <ProjectHeader project={project}/>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Tasks</h2>

            <p className="mt-1 text-slate-500">
              Manage all tasks in this project.
            </p>
          </div>

          {isAdmin && (
            <Button className="bg-slate-900 text-white hover:bg-slate-800">
              <Plus size={18} />
              Add Task
            </Button>
          )}
        </div>

        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          startAdornment={<Search size={18} className="text-gray-400" />}
        />

        <TaskList tasks={tasks} isAdmin={isAdmin} />
      </section>
    </div>
  );
};

export default ProjectDetailsPage;
