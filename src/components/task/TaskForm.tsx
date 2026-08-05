import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button, Input, Select } from "@/components/ui";

import TaskService from "@/services/task.service";
import { zodResolver } from "@hookform/resolvers/zod";

import { useApiRequest } from "@/hooks/useApiRequest";
import { useToast } from "@/context/ToastContext";

import {
  TaskPriority,
  TaskStatus,
  type Task,
  type Project,
  type User,
} from "@/types";

import { Combobox } from "../ui";

import { TaskFormSchema, type TaskFormData } from "@/schemas";
import { TASK_PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from "@/constants/options";

interface TaskFormProps {
  task?: Task;
  projectId?: number;
  projects?: Project[];
  users: User[];
  onSuccess: () => void;
  onCancel: () => void;
}

const TaskForm = ({
  task,
  projectId,
  projects = [],
  users,
  onSuccess,
  onCancel,
}: TaskFormProps) => {
  const { showToast } = useToast();
  const { serverError, execute } = useApiRequest();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      task_name: "",
      project_id: projectId,
      user_id: undefined,
      priority: undefined,
      status: undefined,
      due_date: "",
    },
  });

  useEffect(() => {
    if (!task) {
      reset({
        task_name: "",
        project_id: projectId,
        user_id: undefined,
        priority: TaskPriority.low,
        status: TaskStatus.in_progress,
        due_date: "",
      });

      return;
    }

    reset({
      task_name: task.task_name,
      project_id: task.project_id,
      user_id: task.user_id,
      priority: task.priority,
      status: task.status,
      due_date: task.due_date,
    });
  }, [task, projectId, reset]);

  const onSubmit = async (data: TaskFormData) => {
    const success = await execute(async () => {
      if (task) {
        await TaskService.update(task.id, data);

        showToast("Task updated successfully.", "success");
      } else {
        await TaskService.create(data);

        showToast("Task created successfully.", "success");
      }
    });

    if (!success) return;

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-[13.5px] text-rose-700">
          {serverError}
        </div>
      )}

      <Input
        placeholder="Task name"
        error={errors.task_name?.message}
        {...register("task_name")}
      />
      {!projectId && (
        <Controller
          name="project_id"
          control={control}
          render={({ field }) => (
            <Combobox
              id="project_id"
              label="Project"
              value={field.value}
              onChange={(value) => field.onChange(Number(value))}
              options={projects.map((project) => ({
                value: project.id,
                label: project.name,
              }))}
              error={errors.project_id?.message}
              placeholder="Select project"
            />
          )}
        />
      )}

      <Controller
        name="user_id"
        control={control}
        render={({ field }) => (
          <Combobox
            id="user_id"
            label="Assign User"
            value={field.value}
            onChange={(value) => field.onChange(Number(value))}
            options={users.map((user) => ({
              value: user.id,
              label: user.full_name,
            }))}
            error={errors.user_id?.message}
            placeholder="Select user"
          />
        )}
      />

      <div className="grid grid-cols-2 gap-5">
        <Select
          id="priority"
          label="Priority"
          error={errors.priority?.message}
          options={TASK_PRIORITY_OPTIONS}
          {...register("priority")}
        />

        <Select
          id="status"
          label="Status"
          error={errors.status?.message}
          options={TASK_STATUS_OPTIONS}
          {...register("status")}
        />
      </div>
        
      <Input
        type="date"
        label="Due Date"
        error={errors.due_date?.message}
        {...register("due_date")}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          onClick={onCancel}
          className="border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={isSubmitting}
          className="bg-linear-to-b from-navy-800 to-navy-900 text-white shadow-lg shadow-navy-900/15 transition-all duration-200 hover:from-navy-700 hover:to-navy-800 hover:shadow-xl"
        >
          {task ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
