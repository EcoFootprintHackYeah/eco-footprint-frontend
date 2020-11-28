export enum TravelType {
  walking = "walking",
  jogging = "jogging",
  biking = "biking",
  driving = "driving",
}

export interface InferenceResponse {
  distances: number[];
  speeds: number[];
  avgSpeed: number;
  transport: TravelType;
  totalDistance: number;
}

export interface InferenceRequest {
  points: InferenceData[];
}

export interface InferenceData {
  lat: number;
  lng: number;
  ts: number;
}
