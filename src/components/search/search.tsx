import { useContext, ChangeEvent } from 'react';
import { DISPLAY_FLIGHTS_COUNT } from '../../common/constants';
import { FlightsContext } from '../../context/flights.context';
import { IFlight } from '../../types/Flight';
import { FlightsContextType } from '../../types/FlightContext';
import './search.css';

export const Search = () => {
  const { setFlights } = useContext(FlightsContext) as FlightsContextType;

  const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 3) {
      setFlights([]);
    }
    if (event.target.value.length >= 3) {
      fetch('/db/flights.json')
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
  };

  const handleKeyDown = (event: any) => {
    // Ver que onda aca
    if (event.keyCode === 8) {
      event.stopPropagation();
    }
  };

  return (
    <input
      onChange={onInputChangeHandler}
      onKeyDown={handleKeyDown}
      name="flightSearch"
      className="FlightSearch-input"
      placeholder="Search for flights"
    />
  );
};

export default Search;