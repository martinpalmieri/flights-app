import { IFlight } from '../types/Flight';

const cache: any = {};
export const fetchFlights = async (query: string, count: number) => {
  if (cache[query]) {
    return cache[query];
  }

  const response = await fetch(
    `${process.env.PUBLIC_URL}/db/flights.json?q=${encodeURIComponent(
      query,
    )}&l=${count}`,
  );
  const parsed = await response.json();
  // @TODO needed until we implement filtering server side
  const result = parsed.flights
    .filter((flight: IFlight) =>
      flight.airport.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, count);

  cache[query] = result;

  return result;
};
