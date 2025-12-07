import { Mail, Phone, Shield, User } from "lucide-react";
import { useAppSelector } from "../../app/hooks";
import { useForm } from "react-hook-form";
import type { ProfileForm } from "../../shared/types";
import { useState } from "react";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileForm>();
  const onSubmit = () => {};
  return (
    <div className="min-h-screen bg-base-200 pt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-3 text-center">
            Profile Settings
          </h1>

          <div className="card bg-base-100 shadow">
            <div className="card-body">
              {/* Profile Header */}
              <div className="flex flex-col items-center gap-4 mb-6 pb-6">
                <div className="avatar avatar-placeholder">
                  <div className="bg-neutral text-neutral-content w-24 rounded-full">
                    <span className="text-3xl">
                      {user?.name?.[0]?.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="">
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <div className="flex items-center gap-2 text-base-content/70">
                    <span className="flex items-center justify-center w-full gap-1">
                      <Shield size={15} />
                      <span className="capitalize">{user?.role}</span>
                    </span>
                  </div>
                </div>
              </div>
              {/* Profile form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <User size={16} />
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    className={`input input-bordered w-full ${
                      errors.name ? "input-error" : ""
                    }`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.name.message}
                      </span>
                    </label>
                  )}
                </div>
                <div className="flex flex-col form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <Mail size={16} />
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    className="input input-bordered w-full"
                    {...register("email")}
                    disabled
                  />
                  <label className="label">
                    <span className="label-text-alt">
                      Email cannot be changed
                    </span>
                  </label>
                </div>
                <div className="flex flex-col form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <Phone size={16} />
                      Phone Number
                    </span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1234567890"
                    value={user.phoneNumber}
                    className="input input-bordered w-full"
                    {...register("phoneNumber")}
                  />
                </div>
                <div className="card-actions justify-end pt-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Account Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <p className="text-base-content/70 text-sm">Member Since</p>
                <p className="text-xl font-bold">
                  {new Date(
                    user?.createdAt ||
                      "Thu Dec 04 2025 06:40:00 GMT-0800 (Pacific Standard Time)"
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <p className="text-base-content/70 text-sm">Account Status</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`badge ${
                      user?.isVerified ? "badge-success" : "badge-warning"
                    }`}
                  >
                    {user?.isVerified ? "Verified" : "Unverified"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
