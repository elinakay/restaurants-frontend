import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * This component represents the overall structure of the application, including
 * the sidebar menu and the main content area. It imports and includes the 'Menu'
 * component on the sidebar and the 'Routes' component in the main content area.
 *
 * @returns {JSX.Element} - The main layout of the application.
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        {/* Sidebar section */}
        <div className="col-md-2 side-bar">
          <Menu />
        </div>
        {/* Main content section */}
        <div className="col">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
