import { useCallback, useEffect, useState } from "react";

import { Search, Plus, AlertCircle, FolderKanban } from "lucide-react";

import { Button, Input, Modal, Spinner } from "@/components/ui";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectForm from "@/components/project/ProjectForm";

import ProjectService from "@/services/project.service";
import { CurrentUserService } from "@/services/current-user.service";
import { useToast } from "@/context/ToastContext";
import type { Project } from "@/types";
import { ConfirmDialog } from "@/components/ui";

import { useApiRequest } from "@/hooks/useApiRequest";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const { showToast } = useToast();
  const [openDelete, setOpenDelete] = useState(false);

  const { serverError, execute } = useApiRequest();

  const isAdmin = CurrentUserService.isAdmin();

  const loadProjects = useCallback(
    async (searchValue?: string) => {
      setLoading(true);

      await execute(async () => {
        const data = await ProjectService.getAll({
          search: searchValue,
        });

        setProjects(data);
      });

      setLoading(false);
    },
    [execute],
  );

  const handleDelete = useCallback(async () => {
    if (!selectedProject) {
      return;
    }

    const success = await execute(async () => {
      await ProjectService.delete(selectedProject.id);

      showToast("Project deleted successfully.", "success");
    });

    if (!success) {
      setOpenDelete(false);
      return;
    }

    setOpenDelete(false);
    setSelectedProject(null);

    await loadProjects(search);
  }, [selectedProject, execute, loadProjects, search, showToast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadProjects(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, loadProjects]);

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-navy-900 text-[26px] font-semibold tracking-tight">
            Projects
          </h1>

          <p className="mt-1 text-[14.5px] text-slate-500">
            Manage all your projects.
          </p>
        </div>

        {isAdmin && (
          <Button
            onClick={() => {
              setSelectedProject(null);
              setOpenForm(true);
            }}
            className="flex items-center gap-2 bg-linear-to-b from-navy-800 to-navy-900 px-5 py-3 font-medium text-white shadow-lg shadow-navy-900/15 transition-all duration-200 hover:from-navy-700 hover:to-navy-800 hover:shadow-xl"
          >
            <Plus size={18} />
            New Project
          </Button>
        )}
      </div>

      {/* Search */}
      <Input
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startAdornment={<Search size={18} className="text-slate-400" />}
      />

      {/* Error */}
      {serverError && (
        <div className="flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-[14.5px] text-rose-700">
          <AlertCircle size={17} className="mt-0.5 shrink-0 text-rose-500" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center gap-2.5 py-20 text-[14.5px] text-slate-500">
          <Spinner size={18} className="text-navy-900" />
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 py-20 text-center">
          <div className="brass-ring mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
            <FolderKanban
              size={20}
              strokeWidth={1.75}
              className="text-navy-900"
            />
          </div>

          <h2 className="text-navy-900 text-lg font-semibold tracking-tight">
            No projects found
          </h2>

          <p className="mt-1.5 text-[14.5px] text-slate-500">
            Create your first project to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isAdmin={isAdmin}
              onEdit={(project) => {
                setSelectedProject(project);
                setOpenForm(true);
              }}
              onDelete={(project) => {
                setSelectedProject(project);
                setOpenDelete(true);
              }}
            />
          ))}
        </div>
      )}

      <Modal
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedProject(null);
        }}
        title={selectedProject ? "Update Project" : "Create Project"}
      >
        <ProjectForm
          project={selectedProject ?? undefined}
          onCancel={() => {
            setOpenForm(false);
            setSelectedProject(null);
          }}
          onSuccess={() => {
            setOpenForm(false);
            setSelectedProject(null);
            void loadProjects(search);
          }}
        />
      </Modal>
      <ConfirmDialog
        open={openDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${selectedProject?.name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => {
          setOpenDelete(false);
          setSelectedProject(null);
        }}
        onConfirm={() => {
          void handleDelete();
        }}
      />
    </div>
  );
};

export default ProjectsPage;
