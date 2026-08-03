import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button, Input } from "@/components/ui";

import UserService from "@/services/user.service";

import { useApiRequest } from "@/hooks/useApiRequest";
import { useToast } from "@/context/ToastContext";

import type { User, UpdateUserRequest } from "@/types";

interface UserFormProps {
  user: User;
  onSuccess: () => void;
  onCancel: () => void;
}

const UserForm = ({ user, onSuccess, onCancel }: UserFormProps) => {
  const { showToast } = useToast();

  const { serverError, execute } = useApiRequest();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserRequest>({
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
    },
  });

  useEffect(() => {
    reset({
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
    });
  }, [user, reset]);

  const onSubmit = async (data: UpdateUserRequest) => {
    const success = await execute(async () => {
      await UserService.update(user.id, data);

      showToast("User updated successfully.", "success");
    });

    if (!success) {
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-[13.5px] text-rose-700">
          {serverError}
        </div>
      )}

      <div>
        <Input
          placeholder="Full name"
          {...register("full_name", {
            required: "Full name is required.",
          })}
        />

        {errors.full_name && (
          <p className="mt-1.5 text-[13px] text-rose-600">
            {errors.full_name.message}
          </p>
        )}
      </div>

      <div>
        <Input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required.",
          })}
        />

        {errors.email && (
          <p className="mt-1.5 text-[13px] text-rose-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Phone number"
          {...register("phone_number", {
            required: "Phone number is required.",
          })}
        />

        {errors.phone_number && (
          <p className="mt-1.5 text-[13px] text-rose-600">
            {errors.phone_number.message}
          </p>
        )}
      </div>

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
          Update User
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
