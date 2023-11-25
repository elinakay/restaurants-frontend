import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, updateTable, readReservation } from "../utils/api";

/**
 * Represents the page for seating a reservation at a table.
 *
 * @returns {JSX.Element} - The reservation seating page.
 */
export const ReservationSeat = () => {
  // Get the reservation ID from the URL
  const { reservation_id } = useParams();

  // State variables to manage tables, selected table ID, reservation, and history
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState("");
  const [reservation, setReservation] = useState({});
  const history = useHistory();

  // Fetch the list of available tables when the component mounts
  useEffect(() => {
    listTables().then(setTables);
  }, []);

  // Fetch the reservation details when the reservation ID changes
  useEffect(() => {
    readReservation(reservation_id).then(setReservation);
  }, [reservation_id]);

  // Handle changes in the selected table
  const changeHandler = (event) => {
    setTableId(event.target.value);
  };

  // Handle the form submission to seat the reservation at the selected table
  const submitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Update the table assignment and redirect to the dashboard
    await updateTable(reservation.reservation_id, tableId);
    history.push("/dashboard");
  };

  return (
    <section>
      <h2>Seat Reservation</h2>
      <form onSubmit={submitHandler}>
        <fieldset>
          <div>
            <select
              id="table_id"
              name="table_id"
              value={tableId}
              required={true}
              onChange={changeHandler}
            >
              <option value="">- Select a table -</option>
              {tables.map((table) => (
                <option
                  key={table.table_id}
                  value={table.table_id}
                  disabled={
                    table.capacity < reservation.people || table.occupied
                  }
                >
                  {table.table_name} - {table.capacity}
                </option>
              ))}
            </select>
          </div>
          <div className="group-row">
            <button
              className="black"
              type="button"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
            <button className="yellow" type="submit">
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default ReservationSeat;