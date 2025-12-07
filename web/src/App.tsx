import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Layout from "./shared/components/Layout";
import HomePage from "./pages/home/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import Campaigns from "./pages/campaigns";
import RegisterPage from "./pages/auth/RegisterPage";
import CampaignDetailPage from "./pages/campaigns/CampaignDetailPage";
import CreateCampaign from "./pages/campaigns/CreateCampaign";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import PaymentVerificationPage from "./pages/campaigns/PaymentVerificationPage";
import PrivateRoute from "./shared/components/PrivateRoute";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect, useState } from "react";
import Loading from "./shared/components/Loading";
import { getCurrentUser, logout } from "./features/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { accessToken, refreshToken, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  const [isInitialized, setIsInitialized] = useState(false);

  /**
   * Auth Initialization
   * This runs once when the app loads
   */
  useEffect(() => {
    const initializeAuth = async () => {
      // console.log("Initializing Authentication...");
      // Check localStorage for tokens
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      // If we have tokens, try to get user data
      if (storedAccessToken && storedRefreshToken) {
        // console.log("Fetching user data...");
        try {
          await dispatch(getCurrentUser()).unwrap();
        } catch (error) {
          console.error("❌ Authentication failed:", error);
          // console.log("🧹 Clearing invalid tokens...");

          // Tokens are invalid, clear everything
          dispatch(logout());
        }
      } else {
        console.log("ℹ️ No tokens found - user not logged in");
      }
      setIsInitialized(true);
      console.log("✅ Auth initialization complete");
    };
    initializeAuth();
  }, [dispatch]);

  /**
   * Token Sync
   * Keep redux state in sync with the localstorage to ensure consistency across tabs
   */
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "accessToken" || e.key === "refreshToken") {
        console.log("localStorage changed, syncing...");
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        // If tokens were removed in another tab, logout
        if (!storedAccessToken || !storedRefreshToken) {
          console.log("🚪 Tokens removed - logging out");
          dispatch(logout());
          navigate("/login");
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch, navigate]);

  /**
   * Debug: Log auth state changes
   */
  useEffect(() => {
    console.log("🔐 Auth State:", {
      isAuthenticated,
      hasUser: !!user,
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      userName: user?.name,
    });
  }, [isAuthenticated, user, accessToken, refreshToken]);

  /**
   * Debug: Log route changes
   */
  useEffect(() => {
    console.log("🛣️ Route changed:", location.pathname);
  }, [location.pathname]);

  // Show loading while initializing
  if (!isInitialized) return <Loading />;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
        <Route path="/donations/verify" element={<PaymentVerificationPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/campaigns/create"
          element={
            <PrivateRoute>
              <CreateCampaign />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
