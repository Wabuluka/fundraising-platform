import { Heart, X } from "lucide-react";
import type { DonationForm, DonationModalProps } from "../types";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { useState } from "react";

export default function DonationModal({
  campaign,
  onClose,
}: DonationModalProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DonationForm>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      isAnonymous: false,
    },
  });
  const onSubmit = async (data: DonationForm) => {};
  const isAnonymous = watch("isAnonymous");
  const amount = watch("amount");
  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          <X size={20} />
        </button>

        <h3 className="font-bold text-2xl mb-4 flex items-center gap-2">
          <Heart className="text-primary" size={28} />
          Support This Campaign
        </h3>

        <div className="bg-base-200 rounded-lg p-4 mb-6">
          <p className="font-semibold">{campaign.title}</p>
          <p className="text-sm text-base-content/70">
            {campaign.currency} {campaign.currentAmount.toLocaleString()} raised
            of {campaign.currency} {campaign.targetAmount.toLocaleString()}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Preset Amounts */}
          <div>
            <label className="label">
              <span className="label-text">Select Amount</span>
            </label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[1000, 2500, 5000, 10000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    const amountInput = document.querySelector(
                      'input[name="amount"]'
                    ) as HTMLInputElement;
                    if (amountInput) amountInput.value = preset.toString();
                  }}
                  className="btn btn-outline btn-sm"
                >
                  {campaign.currency} {preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col form-control">
            <label className="label">
              <span className="label-text">Donation Amount *</span>
            </label>
            <label className="flex input-group gap-2 items-center">
              <span>{campaign.currency}</span>
              <input
                type="number"
                placeholder="1000"
                className={`input input-bordered flex-1 ${
                  errors.amount ? "input-error" : ""
                }`}
                {...register("amount", {
                  required: "Amount is required",
                  min: { value: 10, message: "Minimum donation is 10" },
                })}
              />
            </label>
            {errors.amount && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.amount.message}
                </span>
              </label>
            )}
          </div>
          {!user && (
            <>
              <div className="flex flex-col form-control">
                <label className="label">
                  <span className="label-text">Your Name *</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`input input-bordered w-full ${
                    errors.name ? "input-error" : ""
                  }`}
                  {...register("name", { required: "Name is required" })}
                  disabled={isAnonymous}
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
                  <span className="label-text">Email Address *</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={`input input-bordered w-full ${
                    errors.email ? "input-error" : ""
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.email.message}
                    </span>
                  </label>
                )}
              </div>
            </>
          )}
          <div className="flex flex-col form-control">
            <label className="label">
              <span className="label-text">Message (Optional)</span>
            </label>
            <textarea
              placeholder="Leave a message of support..."
              className="textarea textarea-bordered h-20 w-full"
              {...register("message")}
            />
          </div>

          <div className=" form-control">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                {...register("isAnonymous")}
              />
              <span className="label-text">Donate anonymously</span>
            </label>
          </div>

          {amount > 0 && (
            <div className="bg-primary/10 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Your donation:</span>
                <span className="text-2xl font-bold text-primary">
                  {campaign.currency} {amount?.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Proceed to Payment"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
