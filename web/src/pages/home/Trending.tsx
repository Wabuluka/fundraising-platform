import { Link } from "react-router-dom";
import Loading from "../../shared/components/Loading";
import { campaigns } from "../../data/campaigns";
import CampaignCard from "../../shared/components/CampaignCard";

export default function Trending() {
  const loading = false;
  return (
    <section className="py-10">
      <div className="xl:w-2/4 lg:w-3/4 md:w-3/4 sm:mx-auto">
        <div className="flex justify-between items-center mx-4 mb-2">
          <h2 className="text-2xl font-bold">Featured</h2>
          <Link to="/campaigns" className="btn btn-outline">
            View All
          </Link>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.slice(0, 6).map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
