import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from './App';
import Header from './components/header/header';
import List from './components/flights-list/flights-list';
import { FlightsContext } from './context/flights.context';

let container: any = null;
const setFlights = () => null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders without crashing', () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    createRoot(container!).render(<App />);
  });
});

it('FlightsApp title', () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    createRoot(container!).render(<App />);
  });
  expect(screen.getByText('FlightsApp')).toBeInTheDocument();
});

it("App shows initial 'Start typing to search' message", () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    createRoot(container!).render(
      <FlightsContext.Provider value={{ flights: [], setFlights }}>
        <Header />
        <List />
      </FlightsContext.Provider>,
    );
  });
  expect(
    screen.getByText('Start typing to search for flights...'),
  ).toBeInTheDocument();
});

it("App doest not show initial 'Start typing to search' message' if context has flights", () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    createRoot(container!).render(
      <FlightsContext.Provider
        value={{
          flights: [
            {
              flightIdentifier: 'D20190401UA969',
              flightNumber: 'UA 969',
              airport: 'San Francisco',
              expectedTime: '14:50',
              originalTime: '14:50',
              url: '/en/departures/flight/D20190401UA969/',
              score: '70.55272',
            },
          ],
          setFlights,
        }}
      >
        <Header />
        <List />
      </FlightsContext.Provider>,
    );
  });
  expect(
    screen.queryByText('Start typing to search for flights...'),
  ).not.toBeInTheDocument();
});

it('App show flight number if context has flights', () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    createRoot(container!).render(
      <FlightsContext.Provider
        value={{
          flights: [
            {
              flightIdentifier: 'D20190401UA969',
              flightNumber: 'UA 969',
              airport: 'San Francisco',
              expectedTime: '14:50',
              originalTime: '14:50',
              url: '/en/departures/flight/D20190401UA969/',
              score: '70.55272',
            },
          ],
          setFlights,
        }}
      >
        <Header />
        <List />
      </FlightsContext.Provider>,
    );
  });
  expect(screen.getByText('UA 969')).toBeInTheDocument();
});
