import React from "react";

/**
 * Renders error messages if errors are present.
 * @param {Array} errors - An array of error objects to display.
 * @returns {JSX.Element | null} - A Bootstrap danger alert displaying error messages, or null if no errors are present.
 */
function TableErrors({ errors }) {
  if (errors !== null) {
    if (errors.length) {
      // Render an alert containing error messages
      return (
        <div className="alert alert-danger">
          <p>ERROR:</p>
          {errors.map((error, index) => (
            <p key={index}>{error.message}</p>
          ))}
        </div>
      );
    }
  }
  // Return null if no errors are present
  return null;
}

export default TableErrors;