import { useState } from "react";
import { CampaignCategory, type CampaignForm } from "../../shared/types";
import { useForm } from "react-hook-form";
import { Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CampaignForm>({
    defaultValues: {
      currency: "NGN",
      isUrgent: false,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  const handleImageUpload = () => {};
  const removeImage = () => {};

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container flex flex-col gap-5 mx-auto px-4 max-w-4xl">
        <div className="card bg-base-100 shadow mt-5">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center">Create Campaign</h1>
            <p className="text-base-content/70 mb-2 text-center">
              Start a fundraising campaign for your cause
            </p>

            {/* Progress Steps */}
            <ul className="steps w-full mb-2">
              <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>
                Basic Info
              </li>
              <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>
                Details
              </li>
              <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>
                Beneficiary
              </li>
              <li className={`step ${currentStep >= 4 ? "step-primary" : ""}`}>
                Review
              </li>
            </ul>
          </div>
        </div>
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-col form-control">
                    <label className="label">
                      <span className="label-text">Campaign Title *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Help John Get Medical Treatment"
                      className={`input input-bordered w-full ${
                        errors.title ? "input-error" : ""
                      }`}
                      {...register("title", {
                        required: "Title is required",
                        minLength: {
                          value: 10,
                          message: "Title must be at least 10 characters",
                        },
                        maxLength: {
                          value: 200,
                          message: "Title must be less than 200 characters",
                        },
                      })}
                    />
                    {errors.title && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.title.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="flex flex-col form-control">
                    <label className="label">
                      <span className="label-text">Category *</span>
                    </label>
                    <select
                      className={`select select-bordered w-full ${
                        errors.category ? "select-error" : ""
                      }`}
                      {...register("category", {
                        required: "Category is required",
                      })}
                    >
                      <option value="">Select a category</option>
                      {Object.values(CampaignCategory).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.replace("_", " ").toUpperCase()}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.category.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col form-control">
                      <label className="label">
                        <span className="label-text">Target Amount *</span>
                      </label>
                      <input
                        type="number"
                        placeholder="50000"
                        className={`input input-bordered w-full ${
                          errors.targetAmount ? "input-error" : ""
                        }`}
                        {...register("targetAmount", {
                          required: "Target amount is required",
                          min: { value: 100, message: "Minimum amount is 100" },
                        })}
                      />
                      {errors.targetAmount && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.targetAmount.message}
                          </span>
                        </label>
                      )}
                    </div>

                    <div className="flex flex-col form-control">
                      <label className="label">
                        <span className="label-text">Currency</span>
                      </label>
                      <select
                        className="select select-bordered w-full"
                        {...register("currency")}
                      >
                        <option value="NGN">NGN (₦)</option>
                        <option value="USD">USD ($)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col form-control">
                    <label className="label">
                      <span className="label-text">End Date *</span>
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className={`input input-bordered w-full ${
                        errors.endDate ? "input-error" : ""
                      }`}
                      {...register("endDate", {
                        required: "End date is required",
                      })}
                    />
                    {errors.endDate && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.endDate.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="flex flex-col form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        {...register("isUrgent")}
                      />
                      <span className="label-text">Mark as urgent</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-col form-control">
                    <label className="label">
                      <span className="label-text">Short Description *</span>
                      <span className="label-text-alt">
                        {watch("description")?.length || 0}/500
                      </span>
                    </label>
                    <textarea
                      placeholder="Brief description of your campaign..."
                      className={`textarea textarea-bordered h-24 w-full ${
                        errors.description ? "textarea-error" : ""
                      }`}
                      {...register("description", {
                        required: "Description is required",
                        minLength: {
                          value: 50,
                          message: "Description must be at least 50 characters",
                        },
                        maxLength: {
                          value: 500,
                          message:
                            "Description must be less than 500 characters",
                        },
                      })}
                    />
                    {errors.description && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.description.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="flex flex-col form-control">
                    <label className="label">
                      <span className="label-text">Full Story *</span>
                      <span className="label-text-alt">
                        {watch("story")?.length || 0}/2000
                      </span>
                    </label>
                    <textarea
                      placeholder="Tell your story in detail. Why are you fundraising? How will the funds be used?"
                      className={`textarea textarea-bordered h-48 w-full ${
                        errors.story ? "textarea-error" : ""
                      }`}
                      {...register("story", {
                        required: "Story is required",
                        minLength: {
                          value: 100,
                          message: "Story must be at least 100 characters",
                        },
                      })}
                    />
                    {errors?.story && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.story.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="flex flex-col form-control">
                    <label className="label">
                      <span className="label-text">Location</span>
                    </label>
                    <input
                      type="text"
                      placeholder="City, State"
                      className="input input-bordered w-full"
                      {...register("location")}
                    />
                  </div>

                  <div className="flex flex-col form-control">
                    <label className="label">
                      <span className="label-text">Campaign Images</span>
                    </label>
                    <div className="border-2 border-dashed border-base-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload
                          className="mx-auto mb-2 text-base-content/50"
                          size={48}
                        />
                        <p className="text-base-content/70">
                          Click to upload images
                        </p>
                        <p className="text-sm text-base-content/50">
                          PNG, JPG up to 5MB
                        </p>
                      </label>
                    </div>

                    {images?.length > 0 && (
                      <div className="grid grid-cols-4 gap-2 mt-4">
                        {images?.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={img}
                              alt={`Upload ${idx + 1}`}
                              className="w-full h-24 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Beneficiary */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="alert alert-info">
                    <span>
                      Provide information about who will benefit from this
                      campaign
                    </span>
                  </div>

                  <div className="flex flex-col form-control">
                    <label className="label">
                      <span className="label-text">Beneficiary Name *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Full name of beneficiary"
                      className={`input input-bordered w-full ${
                        errors.beneficiaryName ? "input-error" : ""
                      }`}
                      {...register("beneficiaryName", {
                        required: "Beneficiary name is required",
                      })}
                    />
                    {errors.beneficiaryName && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.beneficiaryName.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="flex flex-col form-control">
                    <label className="label">
                      <span className="label-text">
                        Relationship to Beneficiary
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Self, Mother, Friend"
                      className="input input-bordered w-full"
                      {...register("beneficiaryRelationship")}
                    />
                  </div>

                  <div className="flex flex-col form-control">
                    <label className="label">
                      <span className="label-text">
                        Beneficiary Contact Number
                      </span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+1234567890"
                      className="input input-bordered w-full"
                      {...register("beneficiaryContact")}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="alert alert-success">
                    <span>Review your campaign details before submitting</span>
                  </div>

                  <div className="bg-base-200 rounded-lg p-6 space-y-4">
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        {watch("title")}
                      </h3>
                      <div className="flex gap-2 mb-4">
                        <span className="badge badge-primary">
                          {watch("category")?.replace("_", " ")}
                        </span>
                        {watch("isUrgent") && (
                          <span className="badge badge-error">Urgent</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-base-content/70">
                          Target Amount
                        </p>
                        <p className="font-semibold">
                          {watch("currency")}{" "}
                          {watch("targetAmount")?.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-base-content/70">End Date</p>
                        <p className="font-semibold">{watch("endDate")}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-base-content/70 mb-1">
                        Description
                      </p>
                      <p className="text-sm">{watch("description")}</p>
                    </div>

                    <div>
                      <p className="text-sm text-base-content/70 mb-1">
                        Beneficiary
                      </p>
                      <p className="text-sm">{watch("beneficiaryName")}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn btn-outline"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn btn-primary ml-auto"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary ml-auto"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Create Campaign"
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
