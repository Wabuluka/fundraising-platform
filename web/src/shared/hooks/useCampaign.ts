import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCampaignById } from "../../features/campaigns/campaignSlice";

export const useCampaign = (id: string) => {
  const dispatch = useAppDispatch();
  const { currentCampaign, loading, error } = useAppSelector(
    (state) => state.campaigns
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCampaignById(id));
    }
  }, [id, dispatch]);

  const progress = currentCampaign
    ? (currentCampaign.currentAmount / currentCampaign.targetAmount) * 100
    : 0;

  const daysLeft = currentCampaign
    ? Math.ceil(
        (new Date(currentCampaign.endDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;
  return {
    campaign: currentCampaign,
    loading,
    error,
    progress,
    daysLeft,
  };
};
