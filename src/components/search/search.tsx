import {
  useContext,
  ChangeEvent,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { DISPLAY_FLIGHTS_COUNT, MIN_CHAR_SEARCH } from '../../common/constants';
import { FlightsContext } from '../../context/flights.context';
import { FlightsContextType } from '../../types/FlightContext';
import debounce from 'lodash.debounce';
import './search.css';
import { fetchFlights } from '../../api/fetchFlights';

export const Search = () => {
  const { setFlights } = useContext(FlightsContext) as FlightsContextType;

  const onInputChangeHandler = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length < MIN_CHAR_SEARCH) {
        setFlights(undefined);
        return;
      }

      try {
        const flights = await fetchFlights(
          event.target.value.toLowerCase(),
          DISPLAY_FLIGHTS_COUNT,
        );
        setFlights(flights);
      } catch (error) {
        console.error(error);
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
