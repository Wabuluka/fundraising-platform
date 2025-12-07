import { Calendar, MapPin, TrendingUp } from "lucide-react";
import type { Campaign } from "../types";

interface CampaignCardProps {
  campaign: Campaign;
}
export default function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = (campaign.currentAmount / campaign.targetAmount) * 100;
  const daysLeft = Math.ceil(
    (new Date(campaign.endDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return (
    <a
      className="card bg-base-100 shadow hover:shadow-lg transition-shadow"
      href={`/campaigns/${campaign.id}`}
    >
      <figure className="h-48 overflow-hidden">
        <img
          src={
            campaign.images[0] || "https://placehold.co/600x400?text=Campaign"
          }
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="flex flex-col px-4 py-4 gap-2">
        {/* <div className="flex items-center gap-2 text-sm text-base-content/70">
          <span className="badge badge-primary badge-sm">
            {campaign.category.replace("_", " ")}
          </span>
          {campaign.isUrgent && (
            <span className="badge badge-error badge-sm">Urgent</span>
          )}
        </div> */}

        <div className="h-10">
          <h2 className="card-title line-clamp-2 leading-5">
            {campaign.title}
          </h2>
        </div>
        <div className="space-y-2 mt-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold">
              {campaign.currency} {campaign.currentAmount.toLocaleString()}
            </span>
            <span className="text-base-content/70">
              of {campaign.currency} {campaign.targetAmount.toLocaleString()}
            </span>
          </div>

          <progress
            className="progress progress-primary w-full"
            value={progress}
            max="100"
          />

          <div className="flex justify-between items-center text-xs text-base-content/70">
            <div className="flex items-center gap-1">
              <TrendingUp size={14} />
              <span>{Math.round(progress)}% funded</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{daysLeft > 0 ? `${daysLeft} days left` : "Ended"}</span>
            </div>
          </div>
        </div>

        {campaign.location && (
          <div className="flex items-center gap-1 text-xs text-base-content/70 mt-2">
            <MapPin size={14} />
            <span>{campaign.location}</span>
          </div>
        )}
      </div>
    </a>
  );
}
