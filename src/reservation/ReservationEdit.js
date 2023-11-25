import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ReservationErrors from "./ReservationErrors";
import ReservationForm from "./ReservationForm";
import { hasValidDateAndTime } from "./ReservationValidate";

/**
 * Represents the reservation edit page.
 *
 * This component allows the user to edit an existing reservation. It fetches the reservation
 * data, updates it, and handles form submissions and errors.
 *
 * @returns {JSX.Element} - The reservation edit page.
 */
export const ReservationEdit = () => {
  // Initial state for the reservation form
  const initialReservationState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  // State variables to manage the reservation data and errors
  const [reservation, setReservation] = useState({ ...initialReservationState });
  const [reservationErrors, setReservationErrors] = useState(null);

  // Get the reservation_id from the URL parameters and set up history for navigation
  const { reservation_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    // Fetch the reservation data when the component mounts
    const abortController = new AbortController();
    setReservationErrors(null);

    // Use the API to read the reservation data and update the state
    readReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReservationErrors);

    // Cleanup the abort controller when the component unmounts
    return () => abortController.abort();
  }, [reservation_id]);

  // Handle changes in form input fields
  const changeHandler = (event) => {
    // Update the reservation state based on the changed input field
    if (event.target.name === "people") {
      setReservation({
        ...reservation,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setReservation({
        ...reservation,
        [event.target.name]: event.target.value,
      });
    }
  };

  // Handle form submission
  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    // Validate the reservation date and time
    const errors = hasValidDateAndTime(reservation);
    if (errors.length) {
      return setReservationErrors(errors);
    }

    try {
      // Use the API to update the reservation data and navigate to the dashboard
      await updateReservation(reservation, abortController.signal);
      history.push(`/dashboard?date=${reservation.reservation_date}`);
    } catch (error) {
      setReservationErrors([error]);
    }

    // Cleanup the abort controller
    return () => abortController.abort();
  };

  return (
    <section>
      <h2>Edit Reservation:</h2>
      <ReservationErrors errors={reservationErrors} />
      <ReservationForm
        reservation={reservation}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </section>
  );
};

export default ReservationEdit;