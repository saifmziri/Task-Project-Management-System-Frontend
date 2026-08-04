import { useCallback, useEffect, useState } from "react";

import { AlertCircle, KeyRound } from "lucide-react";

import { Button, Modal } from "@/components/ui";

import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import ProfileForm from "@/components/profile/ProfileForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

import AuthService from "@/services/auth.service";

import { useApiRequest } from "@/hooks/useApiRequest";

import type { User } from "@/types";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [openPassword, setOpenPassword] = useState(false);

  const { execute, serverError } = useApiRequest();

  const loadProfile = useCallback(async () => {
    setLoading(true);

    await execute(async () => {
      const data = await AuthService.getCurrentUser();

      setUser(data);
    });

    setLoading(false);
  }, [execute]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (serverError) {
    return (
      <div className="m-8 flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-[14.5px] text-rose-700">
        <AlertCircle size={17} className="mt-0.5 shrink-0 text-rose-500" />
        <span>{serverError}</span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <div className="space-y-8 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-navy-900 text-[26px] font-semibold tracking-tight">
              Profile
            </h1>

            <p className="mt-1 text-[14.5px] text-slate-500">
              Manage your personal information.
            </p>
          </div>

          <Button
            onClick={() => setOpenPassword(true)}
            className="bg-slate-900 text-white hover:bg-slate-800"
          >
            <KeyRound size={18} />
            Change Password
          </Button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <ProfileForm
            user={user}
            onSuccess={() => {
              void loadProfile();
            }}
          />
        </div>
      </div>

      <Modal
        open={openPassword}
        onClose={() => setOpenPassword(false)}
        title="Change Password"
      >
        <ChangePasswordForm />
      </Modal>
    </>
  );
};

export default ProfilePage;
