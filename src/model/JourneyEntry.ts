import {TransportMode} from "./TransportMode";

export interface JourneyEntry {
  startDate: Date,
  endDate: Date,
  distance: number,
  avgSpeed: number,
  co2Footprint: number,
  mode: TransportMode
}
