import {
  DollarSign,
  Edit,
  Eye,
  Heart,
  Pause,
  Play,
  Plus,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { campaigns } from "../../data/campaigns";
import ProgressBar from "../../shared/components/ProgressBar";
import type { Donation } from "../../shared/types";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<"campaigns" | "donations">(
    "campaigns"
  );
  const [donations, setDonations] = useState<Donation[]>([]);

  const [stats, setStats] = useState({
    totalCampaigns: 10,
    totalRaised: 20,
    totalDonated: 3000,
    activeCampaigns: 30,
  });

  const handlePublishCampaign = () => {};
  const handlePauseCampaign = () => {};
  const handleDeleteCampaign = () => {};
  return (
    <div className="min-h-screen bg-base-200 pt-3">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-base-content/70">Welcome back, {user?.name}!</p>
          </div>
          <Link to="/campaigns/create" className="btn btn-primary">
            <Plus size={20} />
            Create Campaign
          </Link>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content/70 text-sm">
                    Total Campaigns
                  </p>
                  <p className="text-3xl font-bold">{stats.totalCampaigns}</p>
                </div>
                <TrendingUp className="text-primary" size={40} />
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content/70 text-sm">
                    Active Campaigns
                  </p>
                  <p className="text-3xl font-bold">{stats.activeCampaigns}</p>
                </div>
                <Play className="text-success" size={40} />
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content/70 text-sm">Total Raised</p>
                  <p className="text-3xl font-bold">
                    ₦{stats.totalRaised.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="text-warning" size={40} />
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content/70 text-sm">Total Donated</p>
                  <p className="text-3xl font-bold">
                    ₦{stats.totalDonated.toLocaleString()}
                  </p>
                </div>
                <Heart className="text-error" size={40} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs tabs-boxed bg-base-100 shadow mb-6">
          <a
            className={`tab ${activeTab === "campaigns" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("campaigns")}
          >
            My Campaigns
          </a>
          <a
            className={`tab ${activeTab === "donations" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("donations")}
          >
            My Donations
          </a>
        </div>
        {/* My Campaigns Tab */}
        {activeTab === "campaigns" && (
          <div className="space-y-4">
            {campaigns.length === 0 ? (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center py-16">
                  <TrendingUp
                    className="mx-auto text-base-content/30"
                    size={64}
                  />
                  <h3 className="text-2xl font-bold mt-4">No Campaigns Yet</h3>
                  <p className="text-base-content/70 mt-2">
                    Start your first fundraising campaign today
                  </p>
                  <Link to="/campaigns/create" className="btn btn-primary mt-4">
                    Create Campaign
                  </Link>
                </div>
              </div>
            ) : (
              campaigns.map((campaign) => (
                <div key={campaign.id} className="card bg-base-100 shadow">
                  <div className="card-body">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Image */}
                      <div className="w-full lg:w-48 h-48 flex-shrink-0">
                        <img
                          src={
                            campaign.images[0] ||
                            "https://placehold.co/400x300?text=Campaign"
                          }
                          alt={campaign.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="badge badge-primary">
                            {campaign.category.replace("_", " ")}
                          </span>
                          <span
                            className={`badge ${
                              campaign.status === "active"
                                ? "badge-success"
                                : campaign.status === "draft"
                                ? "badge-warning"
                                : "badge-ghost"
                            }`}
                          >
                            {campaign.status}
                          </span>
                          {campaign.isUrgent && (
                            <span className="badge badge-error">Urgent</span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold mb-2">
                          {campaign.title}
                        </h3>
                        <p className="text-base-content/70 mb-4 line-clamp-2">
                          {campaign.description}
                        </p>

                        <ProgressBar
                          current={campaign.currentAmount}
                          target={campaign.targetAmount}
                          currency={campaign.currency}
                        />

                        <div className="flex flex-wrap gap-2 mt-4">
                          <Link
                            to={`/campaigns/${campaign.id}`}
                            className="btn btn-sm btn-outline"
                          >
                            <Eye size={16} />
                            View
                          </Link>
                          <Link
                            to={`/campaigns/${campaign.id}/edit`}
                            className="btn btn-sm btn-outline"
                          >
                            <Edit size={16} />
                            Edit
                          </Link>
                          {campaign.status === "draft" && (
                            <button
                              onClick={() =>
                                handlePublishCampaign(campaign?.id)
                              }
                              className="btn btn-sm btn-success"
                            >
                              <Play size={16} />
                              Publish
                            </button>
                          )}
                          {campaign.status === "active" && (
                            <button
                              onClick={() => handlePauseCampaign(campaign.id)}
                              className="btn btn-sm btn-warning"
                            >
                              <Pause size={16} />
                              Pause
                            </button>
                          )}
                          {campaign.currentAmount === 0 && (
                            <button
                              onClick={() => handleDeleteCampaign(campaign.id)}
                              className="btn btn-sm btn-error"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* My Donations Tab */}
        {activeTab === "donations" && (
          <div className="space-y-4">
            {donations.length === 0 ? (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center py-16">
                  <Heart className="mx-auto text-base-content/30" size={64} />
                  <h3 className="text-2xl font-bold mt-4">No Donations Yet</h3>
                  <p className="text-base-content/70 mt-2">
                    Browse campaigns and make your first donation
                  </p>
                  <Link to="/campaigns" className="btn btn-primary mt-4">
                    Browse Campaigns
                  </Link>
                </div>
              </div>
            ) : (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Campaign</th>
                          <th>Amount</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {donations.map((donation) => (
                          <tr key={donation.id}>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    <img
                                      src={
                                        (donation as any).campaignId
                                          ?.images?.[0] ||
                                        "https://placehold.co/100x100?text=C"
                                      }
                                      alt="Campaign"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">
                                    {(donation as any).campaignId?.title ||
                                      "Campaign"}
                                  </div>
                                  {donation.message && (
                                    <div className="text-sm opacity-50 line-clamp-1">
                                      {donation.message}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="font-semibold">
                                {donation.currency}{" "}
                                {donation.amount.toLocaleString()}
                              </span>
                            </td>
                            <td>
                              {new Date(
                                donation.createdAt
                              ).toLocaleDateString()}
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  donation.paymentStatus === "successful"
                                    ? "badge-success"
                                    : donation.paymentStatus === "pending"
                                    ? "badge-warning"
                                    : "badge-error"
                                }`}
                              >
                                {donation.paymentStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
