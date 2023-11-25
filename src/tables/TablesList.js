import React from "react";

/**
 * Displays a list of tables and allows finishing occupied tables.
 * @param {Object[]} tables - An array of table objects.
 * @param {function} finishHandler - A function to handle finishing tables.
 * @returns {JSX.Element} - A list of tables.
 */
export const TablesList = ({ tables, finishHandler }) => {
  return (
    <div className="group-col">
      {tables.map((table) => (
        <div className="table" key={table.table_id}>
          <div className="group-row">
            <div className="item-quad">
              <div className="group-col no-gap">
                <h3 className="item inline">Table {table.table_name}</h3>
                <div>
                  <h5 className="item red inline">{table.capacity} seats </h5>
                  <p
                    className="item inline"
                    data-table-id-status={table.table_id}
                  >
                    &nbsp;/ &nbsp;{table.occupied ? "occupied" : "free"}
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              {table.occupied ? (
                <button
                  className="finish"
                  data-table-id-finish={table.table_id}
                  onClick={() => finishHandler(table.table_id)}
                >
                  Finish
                </button>
              ) : (
                // Display nothing if the table is not occupied
                ""
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TablesList;