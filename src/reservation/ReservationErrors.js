import React from "react";

/**
 * Represents an error message component for displaying reservation-related errors.
 *
 * This component takes a list of errors as a prop and displays them as a list of error messages if any errors exist.
 *
 * @param {Array} errors - An array of error objects, each containing a `message` property.
 * @returns {JSX.Element | null} - A list of error messages, or null if no errors are provided.
 */
function ReservationErrors({ errors }) {
  // Check if errors exist
  if (errors !== null) {
    if (errors.length) {
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
  // Return null if no errors
  return null;
}

export default ReservationErrors;