import { CampaignCategory } from "../types";
import {
  Heart,
  GraduationCap,
  AlertCircle,
  Users,
  MoreHorizontal,
} from "lucide-react";

interface CategoryBadgeProps {
  category: CampaignCategory;
  size?: "sm" | "md" | "lg";
}

const categoryIcons = {
  [CampaignCategory.MEDICAL]: Heart,
  [CampaignCategory.EDUCATION]: GraduationCap,
  [CampaignCategory.DISASTER_RELIEF]: AlertCircle,
  [CampaignCategory.COMMUNITY]: Users,
  [CampaignCategory.OTHER]: MoreHorizontal,
};

const categoryColors = {
  [CampaignCategory.MEDICAL]: "badge-error",
  [CampaignCategory.EDUCATION]: "badge-info",
  [CampaignCategory.DISASTER_RELIEF]: "badge-warning",
  [CampaignCategory.COMMUNITY]: "badge-success",
  [CampaignCategory.OTHER]: "badge-ghost",
};

export default function CategoryBadge({
  category,
  size = "md",
}: CategoryBadgeProps) {
  const Icon = categoryIcons[category];
  const colorClass = categoryColors[category];
  const sizeClass =
    size === "sm" ? "badge-sm" : size === "lg" ? "badge-lg" : "";

  return (
    <div className={`badge ${colorClass} ${sizeClass} gap-1`}>
      <Icon size={size === "sm" ? 12 : size === "lg" ? 20 : 16} />
      {category.replace("_", " ")}
    </div>
  );
}
