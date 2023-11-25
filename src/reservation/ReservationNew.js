import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationErrors from "./ReservationErrors";
import ReservationForm from "./ReservationForm";
import { hasValidDateAndTime } from "./ReservationValidate";

/**
 * Represents the page for creating a new reservation.
 *
 * @returns {JSX.Element} - The reservation creation page.
 */
export const ReservationNew = () => {
  // Initial reservation state
  const initialReservationState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  // Reservation state and error state
  const [reservation, setReservation] = useState({ ...initialReservationState });
  const [reservationErrors, setReservationErrors] = useState(null);
  const history = useHistory();

  // Handle changes in input fields
  const changeHandler = (event) => {
    // If 'people' input, convert value to number
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

    const errors = hasValidDateAndTime(reservation);

    if (errors.length) {
      // If there are validation errors, set them and exit
      return setReservationErrors(errors);
    }

    try {
      // Create the reservation
      await createReservation(reservation, abortController.signal);
      // Redirect to the dashboard with the chosen date
      history.push(`/dashboard?date=${reservation.reservation_date}`);
    } catch (error) {
      // If an error occurs, set it in the reservationErrors state
      setReservationErrors([error]);
    }

    // Cleanup: abort the controller
    return () => abortController.abort();
  };

  return (
    <section>
      <h2>Create a Reservation:</h2>
      <ReservationErrors errors={reservationErrors} />
      <ReservationForm
        reservation={reservation}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </section>
  );
};

export default ReservationNew;