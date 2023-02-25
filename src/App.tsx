import './App.css';
import Header from './components/header/header';
import List from './components/flights-list/flights-list';
import { useState } from 'react';
import { IFlight } from './types/Flight';
import { FlightsContext } from './context/flights.context';

const App = () => {
  const [flights, setFlights] = useState<IFlight[]>([]);
  const value = { flights, setFlights };

  return (
    <FlightsContext.Provider value={value}>
      <Header />
      <List />
    </FlightsContext.Provider>
  );
};

export default App;
