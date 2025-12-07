import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div>
      <Navbar />

      <main className="min-h-[calc(100vh-128px)] bg-base-200">
        <div className="mt-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
