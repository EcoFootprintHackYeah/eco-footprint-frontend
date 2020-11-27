import {airplane, bicycle, bus, car} from "ionicons/icons";

export interface TransportMode {
  icon: string,
  name: string
}

export const CAR: TransportMode = {
  icon: car,
  name: 'Car',
}

export const AIRPLANE: TransportMode = {
  icon: airplane,
  name: 'Airplane',
}

export const BICYCLE: TransportMode = {
  icon: bicycle,
  name: 'Bicycle',
}

export const BUS: TransportMode = {
  icon: bus,
  name: 'Bus',
}

export const ALL_MODES = [CAR, AIRPLANE, BICYCLE, BUS]