import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  Calendar,
  Clock,
  Heart,
  MapPin,
  Share2,
  TrendingUp,
  User,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import ProgressBar from "../../shared/components/ProgressBar";
import DonationModal from "../../shared/components/DonationModal";

export default function CampaignDetailPage() {
  const [campaigns, setCampaigns] = useState([
    {
      id: "cmp_001",
      currentAmount: 40000,
      targetAmount: 50000,
      endDate: "2026-12-15T23:59:59.000Z",
      images: [
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w-800&auto=format&fit=crop",
      ],
      title: "Help Rebuild Village School After Flood",
      category: "Education",
      isUrgent: true,
      description:
        "Severe flooding destroyed our local school. We need funds to rebuild classrooms and replace learning materials for 200 children.",
      currency: "USD",
      location: "Jakarta, Indonesia",
      status: "active",
    },
  ]);
  const campaign = campaigns[0];
  //   const {
  //     // currentCampaign: campaign,
  //     loading,
  //     error,
  //   } = useAppDispatch((state) => state.campaigns);
  //   const progress = (campaign.currentAmount / campaign.targetAmount) * 100;
  const progress = 20;

  const [showDonationModal, setShowDonationModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const daysLeft = Math.ceil(
    (new Date(campaign?.endDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const handleShare = () => {};

  return (
    <div className="min-h-screen bg-base-200">
      <div className="w-full sm:w-2/4 md:w-4/4 lg:w-3/4 mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="card bg-base-100 shadow overflow-hidden">
              <figure className="h-96">
                <img
                  src={
                    campaign.images[selectedImage] ||
                    "https://placehold.co/800x600?text=Campaign"
                  }
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
              </figure>
              {campaign.images.length > 1 && (
                <div className="flex gap-2 p-2 overflow-x-auto">
                  {campaign.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${campaign.title} ${idx + 1}`}
                      className={`w-20 h-20 object-cover rounded cursor-pointer ${
                        selectedImage === idx ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedImage(idx)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Campaign Info */}
            <div className="card bg-base-100 shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="badge badge-primary">
                  {campaign.category.replace("_", " ")}
                </span>
                {campaign.isUrgent && (
                  <span className="badge badge-error">Urgent</span>
                )}
                <span className="badge badge-outline">{campaign?.status}</span>
              </div>

              <h1 className="text-3xl font-bold mb-4">{campaign?.title}</h1>

              <div className="flex flex-wrap gap-4 text-sm text-base-content/70 mb-6">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>
                    by {(campaign as any).organizerId?.name || "Organizer"}
                  </span>
                </div>
                {campaign.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{campaign.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>
                    Created{" "}
                    {formatDistanceToNow(
                      new Date(
                        campaign?.createdAt ||
                          "Thu Dec 04 2025 06:40:00 GMT-0800 (Pacific Standard Time)"
                      )
                    )}{" "}
                    ago
                  </span>
                </div>
              </div>

              <div className="prose max-w-none">
                <h2>Campaign Description</h2>
                <p>{campaign.description}</p>
                {campaign.story && (
                  <>
                    <h2>Full Story</h2>
                    <p className="whitespace-pre-wrap">{campaign.story}</p>
                  </>
                )}
              </div>

              <div className="divider"></div>

              <div>
                <h3 className="text-xl font-bold mb-4">Beneficiary</h3>
                <div className="bg-base-200 rounded-lg p-4">
                  <p>
                    <strong>Name:</strong> {campaign?.beneficiary?.name}
                  </p>
                  {campaign?.beneficiary?.relationship && (
                    <p>
                      <strong>Relationship:</strong>{" "}
                      {campaign?.beneficiary?.relationship}
                    </p>
                  )}
                  {campaign?.beneficiary?.contactNumber && (
                    <p>
                      <strong>Contact:</strong>{" "}
                      {campaign?.beneficiary?.contactNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Card */}
            <div className="card bg-base-100 shadow sticky">
              <div className="card-body">
                <div className="text-3xl font-bold text-primary mb-2">
                  {campaign.currency} {campaign.currentAmount.toLocaleString()}
                </div>
                <p className="text-base-content/70 mb-4">
                  raised of {campaign.currency}{" "}
                  {campaign.targetAmount.toLocaleString()} goal
                </p>

                <ProgressBar
                  current={campaign.currentAmount}
                  target={campaign.targetAmount}
                  currency={campaign.currency}
                  showPercentage
                />

                <div className="grid grid-cols-3 gap-4 my-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-lg font-bold">
                      <TrendingUp size={20} className="text-primary" />
                      {Math.round(progress)}%
                    </div>
                    <p className="text-xs text-base-content/70">Funded</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-lg font-bold">
                      <Heart size={20} className="text-error" />0
                    </div>
                    <p className="text-xs text-base-content/70">Donors</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-lg font-bold">
                      <Clock size={20} className="text-warning" />
                      {daysLeft > 0 ? daysLeft : 0}
                    </div>
                    <p className="text-xs text-base-content/70">Days Left</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowDonationModal(true)}
                  className="btn btn-primary btn-lg w-full mb-2"
                  disabled={campaign.status !== "active" || daysLeft <= 0}
                >
                  <Heart size={20} />
                  Donate Now
                </button>

                <button
                  onClick={handleShare}
                  className="btn btn-outline w-full"
                >
                  <Share2 size={20} />
                  Share Campaign
                </button>

                {daysLeft <= 0 && (
                  <div className="alert alert-warning mt-4">
                    <span>This campaign has ended</span>
                  </div>
                )}
              </div>
            </div>

            {/* Campaign Stats */}
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="card-title">Campaign Timeline</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Start Date</span>
                    <span>
                      {new Date(campaign.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/70">End Date</span>
                    <span>
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/70">Duration</span>
                    <span>
                      {Math.ceil(
                        (new Date(campaign.endDate).getTime() -
                          new Date(campaign.startDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      {showDonationModal && (
        <DonationModal
          campaign={campaign}
          onClose={() => setShowDonationModal(false)}
        />
      )}
    </div>
  );
}
