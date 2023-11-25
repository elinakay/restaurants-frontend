import React from "react";
import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * This component represents the sidebar menu for the application and provides
 * links to different sections and features of the application.
 *
 * @returns {JSX.Element} - The menu component.
 */
function Menu() {
  return (
    <nav className="navbar navbar-dark bg-primary align-items-start p-0">
      <div className="container-fluid d-flex flex-column p-0">
        {/* Application logo and title */}
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-3">
            <span>Periodic Tables</span>
          </div>
        </Link>
        {/* Sidebar divider */}
        <hr className="sidebar-divider my-0" />
        {/* Navigation links */}
        <ul className="nav navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <span className="oi oi-dashboard" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search">
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tables/new">
              <span className="oi oi-layers" />
              &nbsp;New Table
            </Link>
          </li>
        </ul>
        {/* Toggle button for sidebar (hidden on small screens) */}
        <div className="text-center d-none d-md-inline">
          <button
            className="btn btn-dark rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
