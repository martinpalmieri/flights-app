import { IFlight } from '../../../types/Flight';

export const Flight = ({ flight }: { flight: IFlight }) => (
  <tr>
    <td data-column="Flight Number">{flight.flightNumber}</td>
    <td data-column="Destination">{flight.airport}</td>
    <td data-column="Expected Time">{flight.expectedTime}</td>
    <td data-column="Original Time">{flight.originalTime}</td>
    <td data-column="Score">{flight.score}</td>
  </tr>
);
