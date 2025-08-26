import { Outlet } from "react-router";
import ScrollToTop from "./router/scroll-to-top";

function AppLayout() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ScrollToTop />
      <Outlet />
    </div>
  );
}

export default AppLayout;
