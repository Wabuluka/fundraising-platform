import { Bell, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";

export default function Navbar() {
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div
      className="navbar bg-base-100 shadow fixed 
                w-full top-0 left-0 z-10"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <ul className="menu menu-horizontal px-1 font-medium">
            <li>
              <Link to="/campaigns">Browse Campaigns</Link>
            </li>
            <li>
              <Link to="/campaigns/create">Start Campaign</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link className="text-xl font-bold" to="/">
          WeGo! Harambe
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <Search />
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Bell />
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        {user && isAuthenticated && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-6 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-40 p-2 shadow"
            >
              <li>
                <Link to={"/dashboard"} className="justify-between">
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  className="bg-gray-500 text-amber-50 mt-1"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
