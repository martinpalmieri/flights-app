import { IFlight } from './Flight';

export interface FlightsContextType {
  flights: IFlight[] | undefined;
  setFlights: React.Dispatch<React.SetStateAction<IFlight[] | undefined>>;
}
