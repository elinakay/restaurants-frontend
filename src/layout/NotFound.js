import React from "react";

/**
 * Defines the "Not Found" page that is displayed for any unmatched route.
 *
 * This component represents a simple "Not Found" page that is shown when a user
 * navigates to a route that does not match any existing routes in the application.
 * It displays an "Not Found" heading.
 *
 * @returns {JSX.Element} - The "Not Found" page component.
 */
function NotFound() {
  return (
    <div className="NotFound">
      <h1>Not Found</h1>
    </div>
  );
}

export default NotFound;
