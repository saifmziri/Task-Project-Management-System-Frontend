import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button, Select } from "@/components/ui";

import TaskService from "@/services/task.service";

import { useApiRequest } from "@/hooks/useApiRequest";
import { useToast } from "@/context/ToastContext";

import { TaskStatus, type Task } from "@/types";

interface TaskStatusFormProps {
  task: Task;
  onSuccess: () => void;
  onCancel: () => void;
}

interface UpdateTaskStatusRequest {
  status: TaskStatus;
}

const TaskStatusForm = ({ task, onSuccess, onCancel }: TaskStatusFormProps) => {
  const { showToast } = useToast();
  const { execute, serverError } = useApiRequest();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateTaskStatusRequest>({
    defaultValues: {
      status: task.status,
    },
  });

  useEffect(() => {
    reset({
      status: task.status,
    });
  }, [task, reset]);

  const onSubmit = async (data: UpdateTaskStatusRequest) => {
    const success = await execute(async () => {
      await TaskService.changeStatus(task.id, data);

      showToast("Task status updated successfully.", "success");
    });

    if (!success) return;

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <Select
        id="status"
        label="Status"
        error={errors.status?.message}
        {...register("status", {
          required: "Status is required.",
        })}
        options={[
          {
            value: TaskStatus.in_progress,
            label: "In Progress",
          },
          {
            value: TaskStatus.completed,
            label: "Completed",
          },
          {
            value: TaskStatus.canceled,
            label: "Canceled",
          },
        ]}
      />

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
          Update Status
        </Button>
      </div>
    </form>
  );
};

export default TaskStatusForm;
