export interface InferenceResponse {
  distances: number[];
  speeds: number[];
  avgSpeed: number;
  transport: string;
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
