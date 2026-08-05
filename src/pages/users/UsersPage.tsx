import { useCallback, useEffect, useState } from "react";

import { Search, AlertCircle, Plus } from "lucide-react";

import { Button, Input, Modal } from "@/components/ui";
import { ConfirmDialog } from "@/components/ui";
import UserList from "@/components/user/UserList";
import UserForm from "@/components/user/UserForm";

import { useNavigate } from "react-router-dom";

import UsersSkeleton from "@/components/skeletons/UsersSkeleton";

import UserService from "@/services/user.service";

import { useApiRequest } from "@/hooks/useApiRequest";
import { useToast } from "@/context/ToastContext";

import type { User } from "@/types";
import { useAuth } from "@/context/AuthContext";

const UsersPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [openForm, setOpenForm] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const { execute, serverError } = useApiRequest();
  const { showToast } = useToast();

  const loadUsers = useCallback(
    async (searchValue?: string) => {
      setLoading(true);

      await execute(async () => {
        const data = await UserService.getAll({
          search: searchValue,
        });

        setUsers(data);
      });

      setLoading(false);
    },
    [execute],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadUsers(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, loadUsers]);

  const handleChangeStatus = async () => {
    if (!selectedUser) return;

    const success = await execute(async () => {
      await UserService.changeStatus(selectedUser.id, {
        status: selectedUser.status === "active" ? "inactive" : "active",
      });

      showToast("User status updated successfully.", "success");
    });

    if (!success) return;

    setOpenStatus(false);
    setSelectedUser(null);

    void loadUsers(search);
  };

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-navy-900 text-[26px] font-semibold tracking-tight">
            Users
          </h1>

          <p className="mt-1 text-[14.5px] text-slate-500">Manage all users.</p>
        </div>

        {isAdmin && (
          <Button
            onClick={() => navigate("/register")}
            className="bg-slate-900 text-white hover:bg-slate-800"
          >
            <Plus size={18} />
            New User
          </Button>
        )}
      </div>

      {/* Search */}
      <Input
        placeholder="Search users..."
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
        <UsersSkeleton />
      ) : (
        <UserList
          users={users}
          isAdmin={isAdmin}
          onEdit={(user) => {
            setSelectedUser(user);
            setOpenForm(true);
          }}
          onChangeStatus={(user) => {
            setSelectedUser(user);
            setOpenStatus(true);
          }}
        />
      )}

      {/* Edit User */}
      <Modal
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedUser(null);
        }}
        title="Update User"
      >
        <UserForm
          user={selectedUser!}
          onCancel={() => {
            setOpenForm(false);
            setSelectedUser(null);
          }}
          onSuccess={() => {
            setOpenForm(false);
            setSelectedUser(null);

            void loadUsers(search);
          }}
        />
      </Modal>

      {/* Change Status */}
      <ConfirmDialog
        open={openStatus}
        title={
          selectedUser?.status === "active"
            ? "Deactivate User"
            : "Activate User"
        }
        message={`Are you sure you want to ${
          selectedUser?.status === "active" ? "deactivate" : "activate"
        } "${selectedUser?.full_name}"?`}
        confirmText={
          selectedUser?.status === "active" ? "Deactivate" : "Activate"
        }
        confirmVariant={
          selectedUser?.status === "active" ? "danger" : "success"
        }
        onCancel={() => {
          setOpenStatus(false);
          setSelectedUser(null);
        }}
        onConfirm={handleChangeStatus}
      />
    </div>
  );
};

export default UsersPage;
