import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button, Input, Textarea } from "@/components/ui";

import ProjectService from "@/services/project.service";

import type { Project, SaveProjectRequest } from "@/types";

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
  } = useForm<SaveProjectRequest>({
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

  const onSubmit = async (data: SaveProjectRequest) => {
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

      <div>
        <Input
          placeholder="Project name"
          {...register("name", {
            required: "Project name is required.",
          })}
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Textarea
          rows={4}
          placeholder="Description"
          {...register("description", {
            required: "Description is required.",
          })}
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            type="date"
            {...register("start_date", {
              required: "Start date is required.",
            })}
          />

          {errors.start_date && (
            <p className="mt-1 text-sm text-red-600">
              {errors.start_date.message}
            </p>
          )}
        </div>

        <div>
          <Input
            type="date"
            {...register("due_date", {
              required: "Due date is required.",
            })}
          />

          {errors.due_date && (
            <p className="mt-1 text-sm text-red-600">
              {errors.due_date.message}
            </p>
          )}
        </div>
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
