import React from "react";

/**
 * Represents an error alert component to render if the specified error is truthy.
 * @param {Object} error - An instance of an object with a `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element} - A Bootstrap danger alert that contains the error message.
 */
function ErrorAlert({ error }) {
  return (
    // Render the error alert only if 'error' is truthy
    error && (
      <div className="alert alert-danger m-2">Error: {error.message}</div>
    )
  );
}

export default ErrorAlert;
