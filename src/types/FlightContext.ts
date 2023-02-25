import { IFlight } from './Flight';

export interface FlightsContextType {
  flights: IFlight[];
  setFlights: React.Dispatch<React.SetStateAction<IFlight[]>>;
}
