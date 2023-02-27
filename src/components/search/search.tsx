import {
  useContext,
  ChangeEvent,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { DISPLAY_FLIGHTS_COUNT } from '../../common/constants';
import { FlightsContext } from '../../context/flights.context';
import { IFlight } from '../../types/Flight';
import { FlightsContextType } from '../../types/FlightContext';
import debounce from 'lodash.debounce';
import './search.css';

export const Search = () => {
  const { setFlights } = useContext(FlightsContext) as FlightsContextType;

  const onInputChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length < 3) {
        setFlights(undefined);
      }
      if (event.target.value.length >= 3) {
        fetch(process.env.PUBLIC_URL + '/db/flights.json')
          .then((response) => response.json())
          .then((data) => {
            const searchResult = data.flights
              .filter((flight: IFlight) =>
                flight.airport
                  .toLowerCase()
                  .includes(event.target.value.toLowerCase()),
              )
              .slice(0, DISPLAY_FLIGHTS_COUNT);
            setFlights(searchResult);
          })
          .catch((err) => console.log(err));
      }
    },
    [setFlights],
  );

  const debouncedChangeHandler = useMemo(
    () => debounce(onInputChangeHandler, 250),
    [onInputChangeHandler],
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  return (
    <input
      onChange={debouncedChangeHandler}
      name="flightSearch"
      className="FlightSearch-input"
      placeholder="Search for flights"
    />
  );
};

export default Search;
