import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button, Input, Textarea } from "@/components/ui";

import { zodResolver } from "@hookform/resolvers/zod";

import ProjectService from "@/services/project.service";

import { projectSchema, type ProjectData } from "@/schemas";

import type { Project } from "@/types";

import { useApiRequest } from "@/hooks/useApiRequest";
import { useToast } from "@/context/ToastContext";

interface ProjectFormProps {
  project?: Project;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, onSuccess, onCancel }: ProjectFormProps) => {
  const { showToast } = useToast();

  const { serverError, execute } = useApiRequest();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      start_date: "",
      due_date: "",
    },
  });

  useEffect(() => {
    if (!project) return;

    reset({
      name: project.name,
      description: project.description,
      start_date: project.start_date,
      due_date: project.due_date,
    });
  }, [project, reset]);

  const onSubmit = async (data: ProjectData) => {
    const success = await execute(async () => {
      if (project) {
        await ProjectService.update(project.id, data);

        showToast("Project updated successfully.", "success");
      } else {
        await ProjectService.create(data);

        showToast("Project created successfully.", "success");
      }
    });

    if (!success) {
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <Input
        label="Project Name"
        placeholder="Enter project name"
        error={errors.name?.message}
        {...register("name")}
      />

      <Textarea
        label="Description"
        rows={4}
        placeholder="Enter project description"
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          type="date"
          label="Start Date"
          error={errors.start_date?.message}
          {...register("start_date")}
        />

        <Input
          type="date"
          label="Due Date"
          error={errors.due_date?.message}
          {...register("due_date")}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          onClick={onCancel}
          className="border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={isSubmitting}
          className="bg-slate-900 text-white hover:bg-slate-800"
        >
          {project ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
