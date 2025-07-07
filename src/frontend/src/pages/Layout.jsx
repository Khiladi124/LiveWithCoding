// src/pages/Layout.jsx
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* Optional: Navigation bar or header here */}
      <Outlet /> {/* This renders the child route's element */}
    </div>
  );
};

export default Layout;
