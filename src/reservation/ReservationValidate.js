/**
 * Checks if a reservation's date and time are valid.
 * @param {Object} reservation - The reservation to validate.
 * @returns {Array} An array of error messages (empty if no errors).
 */
export function hasValidDateAndTime(reservation) {
  const date = reservation.reservation_date;
  const time = reservation.reservation_time;
  const errors = [];

  // Check if the restaurant is closed on Tuesdays (Tuesday is day 2)
  const day = new Date(date).getUTCDay();
  if (day === 2) {
    errors.push(new Error("Restaurant is closed on Tuesdays"));
  }

  // Check if the reservation date and time are in the past
  const formattedDate = new Date(`${date}T${time}`);
  if (formattedDate <= new Date()) {
    errors.push(new Error("Reservation must be in the future"));
  }

  // Check if the reservation time is before 10:30AM
  const hours = Number(time.split(":")[0]);
  const minutes = Number(time.split(":")[1]);
  if (hours < 10 || (hours === 10 && minutes < 30)) {
    errors.push(new Error("Reservation must be after 10:30AM"));
  }

  // Check if the reservation time is after 9:30PM
  if (hours > 21 || (hours === 21 && minutes > 30)) {
    errors.push(new Error("Reservation must be before 9:30PM"));
  }

  return errors;
}
