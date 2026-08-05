import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button, Input } from "@/components/ui";

import UserService from "@/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type userForm } from "@/schemas";

import { useApiRequest } from "@/hooks/useApiRequest";
import { useToast } from "@/context/ToastContext";

import type { User } from "@/types";

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
  } = useForm<userForm>({
    resolver: zodResolver(userSchema),
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

  const onSubmit = async (data: userForm) => {
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
          error={errors.full_name?.message}
          {...register("full_name")}
        />
      </div>

      <div>
        <Input
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          {...register("email")}
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
          error={errors.phone_number?.message}
          {...register("phone_number")}
        />
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
