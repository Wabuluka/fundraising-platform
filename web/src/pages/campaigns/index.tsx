import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { CampaignCategory, CampaignStatus } from "../../shared/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Loading from "../../shared/components/Loading";
import ErrorMessage from "../../shared/components/ErrorMessage";
import CampaignCard from "../../shared/components/CampaignCard";
// import { campaigns } from "../../data/campaigns";

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { campaigns, loading, error, filters, pagination } = useAppSelector(
    (state) => state.campaigns
  );
  const dispatch = useAppDispatch();

  console.log(campaigns);

  const handleSearch = () => {};
  const handleCategoryFilter = (category: CampaignCategory) => {};
  const handleStatusFilter = (status: CampaignStatus) => {};
  const handleClearFilters = () => {};
  const loadMore = () => {};
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mt-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">Browse Campaigns</h1>
          <p className="text-base-content/70">
            Support meaningful causes and help communities in need
          </p>
        </div>
        {/* Search and Filters */}
        <div className="card bg-base-100 shadow p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Search campaigns..."
              className="input input-bordered flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              <Search size={20} />
              Search
            </button>
          </form>
          {/* Category Filters */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter size={20} />
              <span className="font-semibold">Category</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.values(CampaignCategory).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`btn btn-sm ${
                    filters?.category === category
                      ? "btn-primary"
                      : "btn-outline"
                  }`}
                >
                  {category.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
          {/* Status Filters */}
          <div className="mb-4">
            <span className="font-semibold mb-3 block">Status</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleStatusFilter(CampaignStatus.ACTIVE)}
                className={`btn btn-sm ${
                  filters?.status === CampaignStatus.ACTIVE
                    ? "btn-primary"
                    : "btn-outline"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => handleStatusFilter(CampaignStatus.COMPLETED)}
                className={`btn btn-sm ${
                  filters?.status === CampaignStatus.COMPLETED
                    ? "btn-primary"
                    : "btn-outline"
                }`}
              >
                Completed
              </button>
            </div>
          </div>
          {(filters?.category || filters?.status || filters?.search) && (
            <button
              onClick={handleClearFilters}
              className="btn btn-sm btn-ghost"
            >
              Clear All Filters
            </button>
          )}
        </div>
        {/* Results */}
        {loading && campaigns?.length === 0 ? (
          <Loading />
        ) : error ? (
          <ErrorMessage
            message={error}
            onRetry={() => console.log("Hello here")}
          />
        ) : campaigns?.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-base-content/70">No campaigns found</p>
            <p className="text-base-content/60 mt-2">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-base-content/70">
              Showing {campaigns?.length} of {pagination?.total} campaigns
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {campaigns?.map((campaign) => (
                <CampaignCard key={campaign?.id} campaign={campaign} />
              ))}
            </div>

            {/* Load More */}
            {pagination?.page < pagination?.pages && (
              <div className="text-center">
                <button
                  onClick={loadMore}
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Load More"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
