import React, { useState } from "react";
import { listReservations, updateStatus } from "../utils/api";
import ReservationsList from "../reservation/ReservationsList";

export const Search = () => {
  // State variables to manage reservations, mobile number, and submission status
  const [reservations, setReservations] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const filterResults = false; // Set to false to display all results

  // Event handler for mobile number input changes
  const changeHandler = (event) => {
    setMobileNumber(event.target.value);
  };

  // Event handler for form submission
  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    // Fetch reservations based on the provided mobile number
    let res = await listReservations(
      { mobile_number: mobileNumber },
      abortController.signal
    );
    
    // Update the reservations state and set submission status to true
    await setReservations(res);
    setSubmitted(true);

    return () => abortController.abort();
  };

  // Event handler for canceling a reservation
  const cancelHandler = async (event) => {
    const abortController = new AbortController();

    const result = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );

    if (result) {
      // Update the status of the reservation to "cancelled"
      await updateStatus(event.target.value, "cancelled");

      // Refetch the reservations based on the mobile number
      let res = await listReservations(
        { mobile_number: mobileNumber },
        abortController.signal
      );
      await setReservations(res);

      // Set submission status to true
      setSubmitted(true);
    }

    return () => abortController.abort();
  };

  return (
    <section>
      <h2>Search</h2>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="mobile_number">Mobile Number:</label>
            <input
              id="mobile_number"
              name="mobile_number"
              type="text"
              required={true}
              placeholder="Enter a customer's phone number"
              value={mobileNumber}
              maxLength="12"
              onChange={changeHandler}
            />
          </div>
          <button type="submit" className="black">
            Find
          </button>
        </form>
      </div>
      {submitted ? (
        <ReservationsList
          reservations={reservations}
          filterResults={filterResults}
          cancelHandler={cancelHandler}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default Search;