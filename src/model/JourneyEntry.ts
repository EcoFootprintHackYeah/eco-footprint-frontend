import {TravelType} from "./Inference";

export interface JourneyEntry {
  id: number,
  date: Date,
  distance: number,
  avgSpeed: number,
  co2Footprint: number,
  mode: TravelType
}
