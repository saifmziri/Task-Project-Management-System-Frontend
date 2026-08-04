import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button, Input, FormError } from "@/components/ui";

import UserService from "@/services/user.service";

import { useApiRequest } from "@/hooks/useApiRequest";
import { useToast } from "@/context/ToastContext";

import type { User, UpdateUserRequest } from "@/types";

interface ProfileFormProps {
  user: User;
  onSuccess: () => void;
}

const ProfileForm = ({ user, onSuccess }: ProfileFormProps) => {
  const { showToast } = useToast();
  const { execute, serverError } = useApiRequest();

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
      phone_number: user.phone_number ?? "",
    });
  }, [user, reset]);

  const onSubmit = async (data: UpdateUserRequest) => {
    const success = await execute(async () => {
      await UserService.update(user.id, data);

      showToast("Profile updated successfully.", "success");
    });

    if (!success) return;

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormError message={serverError} />

      <Input
        id="full_name"
        label="Full Name"
        error={errors.full_name?.message}
        {...register("full_name", {
          required: "Full name is required.",
        })}
      />

      <Input
        id="email"
        type="email"
        label="Email"
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required.",
        })}
      />

      <Input
        id="phone_number"
        label="Phone Number"
        error={errors.phone_number?.message}
        {...register("phone_number")}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={isSubmitting}
          className="bg-linear-to-b from-navy-800 to-navy-900 text-white shadow-lg shadow-navy-900/15 transition-all duration-200 hover:from-navy-700 hover:to-navy-800 hover:shadow-xl"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;