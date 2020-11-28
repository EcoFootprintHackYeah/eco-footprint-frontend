const environment = {
  apiBase: process.env.REACT_APP_API_PATH!,
  inferenceEndpoint: process.env.REACT_APP_SERVERLESS_INFERENCE!,
  mapsApiKey: process.env.REACT_APP_MAPS_API_KEY!,
};

console.log("Env is: ", environment);

export default environment;
