import { createContext } from 'react';
import { FlightsContextType } from '../types/FlightContext';

export const FlightsContext = createContext<FlightsContextType | null>(null);
