import { useContext } from 'react';
import { FlightsContext } from '../../context/flights.context';
import { useSort } from '../../hooks/useSort';
import { IFlight } from '../../types/Flight';
import { FlightsContextType } from '../../types/FlightContext';
import { Flight } from './flight/flight';
import './flights-list.css';

export const FlightsList = () => {
  const { flights } = useContext(FlightsContext) as FlightsContextType;

  const { items, requestSort, sortConfig } = useSort(flights || []);

  const getClassNamesFor = (name: keyof IFlight) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="FlightsList">
      {items.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>
                <span
                  className={getClassNamesFor('flightNumber')}
                  onClick={() => requestSort('flightNumber')}
                >
                  Flight Number
                </span>
              </th>
              <th>
                <span
                  className={getClassNamesFor('airport')}
                  onClick={() => requestSort('airport')}
                >
                  Destination
                </span>
              </th>
              <th>
                <span
                  className={getClassNamesFor('expectedTime')}
                  onClick={() => requestSort('expectedTime')}
                >
                  Expected Time
                </span>
              </th>
              <th>
                <span
                  className={getClassNamesFor('originalTime')}
                  onClick={() => requestSort('originalTime')}
                >
                  Original Time
                </span>
              </th>
              <th>
                <span
                  className={getClassNamesFor('score')}
                  onClick={() => requestSort('score')}
                >
                  Score
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((flight: IFlight) => (
              <Flight key={flight.flightIdentifier} flight={flight} />
            ))}
          </tbody>
        </table>
      )}
      {flights && flights.length === 0 && <h4>No results.</h4>}
      {!flights && <h4>Start typing to search for flights...</h4>}
    </div>
  );
};

export default FlightsList;
