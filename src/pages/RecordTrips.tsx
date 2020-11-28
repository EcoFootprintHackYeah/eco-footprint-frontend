import React, { useEffect, useState } from "react";
import {
  IonAvatar,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonLoading,
  IonPage,
  IonRow, IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./RecordTrips.css";
import ReactApexChart from "react-apexcharts";
import instance from "../services/apiCalls";
import { GeolocationPosition } from "@capacitor/core";
import MapComponent from "./MapComponent";
import Axios, { AxiosResponse } from "axios";
import {
  InferenceData,
  InferenceRequest,
  InferenceResponse,
} from "../model/Inference";
import environment from "../environment";
import TransportSelectionModal from "./TransportSelectionModal";
import { Selectors } from "../selectors";
import { connect } from "react-redux";
import { State } from "../reducers/stateTypes";
import AdvicesSchedulerWrapper from "../components/AdvicesSchedulerWrapper";

// Paris agreement budget
const MaxBudget = 166;
import { makeStyles } from "@material-ui/core";

const options = {
  chart: {
    height: 350,
    type: "radialBar",
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: "70%",
      },
    },
  },
  fill: {
    colors: ["#9ECE9A"]
  },
  stroke: {
    lineCap: "round",
  },
  colors: ["#296160"],
  labels: ["Your monthly footprint"],
};

const FakeBike = [
  { lat: 46.25304015892485, lng: 6.0266320669602065, ts: 1606576457052 },
  { lat: 46.25304015892485, lng: 6.0266320669602065, ts: 1606576457052 },
  { lat: 46.25304015892485, lng: 6.0266320669602065, ts: 1606576457052 },
  { lat: 46.25404015892485, lng: 6.0266320669602065, ts: 1606576468945 },
  { lat: 46.25404015892485, lng: 6.0266320669602065, ts: 1606576468945 },
  { lat: 46.25414015892485, lng: 6.0266320669602065, ts: 1606576482177 },
  { lat: 46.25414015892485, lng: 6.0266320669602065, ts: 1606576482177 },
  { lat: 46.25424015892485, lng: 6.0266320669602065, ts: 1606576490761 },
  { lat: 46.25424015892485, lng: 6.0266320669602065, ts: 1606576490761 },
  { lat: 46.25434015892485, lng: 6.0266320669602065, ts: 1606576500593 },
  { lat: 46.25434015892485, lng: 6.0266320669602065, ts: 1606576500593 },
  { lat: 46.25434015892485, lng: 6.0266320669602065, ts: 1606576504630 },
];

const FakeWalk = [
  { lat: 46.25434015892485, lng: 6.0266320669602065, ts: 1606576504630 },
  { lat: 46.25434015892485, lng: 6.0266320669602065, ts: 1606576504630 },
  { lat: 46.25434015892485, lng: 6.0266320669602065, ts: 1606576504630 },
  { lat: 46.25444015892485, lng: 6.0266320669602065, ts: 1606576835730 },
  { lat: 46.25444015892485, lng: 6.0266320669602065, ts: 1606576835730 },
  { lat: 46.25544015892485, lng: 6.0266320669602065, ts: 1606576841673 },
  { lat: 46.25544015892485, lng: 6.0266320669602065, ts: 1606576841673 },
  { lat: 46.25644015892485, lng: 6.0266320669602065, ts: 1606576859401 },
  { lat: 46.25644015892485, lng: 6.0266320669602065, ts: 1606576859401 },
  { lat: 46.25664015892485, lng: 6.0266320669602065, ts: 1606576868945 },
  { lat: 46.25664015892485, lng: 6.0266320669602065, ts: 1606576868945 },
  { lat: 46.25684015892485, lng: 6.0266320669602065, ts: 1606576876880 },
  { lat: 46.25684015892485, lng: 6.0266320669602065, ts: 1606576876880 },
  { lat: 46.25684015892485, lng: 6.0266320669602065, ts: 1606576879889 },
];

const useStyles = makeStyles({
  title: {
    display: "inline-block",
    verticalAlign: "middle",
  },
  image: {
    display: "inline-block",
    transform: "scale(0.75)",
    verticalAlign: "middle",
  },
});

interface RecordTripsProps {
  creds: any;
}

const getPercOfMax = (value: number) => {
  return (value / MaxBudget) * 100;
};

const RecordTrips: React.FC<RecordTripsProps> = ({ creds }) => {
  const [footprint, setFootprint] = useState(0);
  const [isTravelling, setIsTravelling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShowModal] = useState(false);
  const classes = useStyles();

  const [inference, setInferenceResponse] = useState<InferenceResponse | null>(
    null
  );

  useEffect(() => {
    async function fetchFootprint() {
      const request = await instance.get("/footprint/monthly", {
        auth: {
          username: creds.id,
          password: creds.apiKey,
        },
      });
      setFootprint(request.data.total);
    }

    fetchFootprint();
  }, []);

  const onStart = () => {
    setIsTravelling(true);
  };

  const onEnd = async (data: GeolocationPosition[]) => {
    console.log(data);
    setIsTravelling(false);
    setIsLoading(true);

    const reqData: InferenceData[] = data.map((d) => ({
      lat: d.coords.latitude,
      lng: d.coords.longitude,
      ts: d.timestamp,
    }));

    // console.log(FakeBike);
    // console.log(reqData);

    const inferenceResponse = await Axios.post<
      InferenceRequest,
      AxiosResponse<InferenceResponse>
    >(environment.inferenceEndpoint, { points: FakeBike });

    setInferenceResponse(inferenceResponse.data);
    setShowModal(true);
    setIsLoading(false);
  };

  const submitTrip = async (data: InferenceResponse) => {
    setIsLoading(true);
    try {
      await instance.post("/footprint/trip", data, {
        auth: {
          username: creds.id,
          password: creds.apiKey,
        },
      });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    setShowModal(false);
  };

  return (
    <IonPage>
      <AdvicesSchedulerWrapper />
      {inference && (
        <TransportSelectionModal
          show={show}
          resp={inference}
          onSubmit={(d) => submitTrip(d)}
        />
      )}
      <IonLoading isOpen={isLoading} message={"Inferring..."} />
      <IonHeader>
        <IonToolbar color="primary">
          <IonAvatar className={classes.image}>
            <IonImg src="/logo.png" />
          </IonAvatar>
          <IonTitle className={classes.title}>EloEco</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Record trip</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          {!isTravelling && (
            <IonRow className="ion-align-items-center">
              <IonCol>
                <ReactApexChart
                  options={options}
                  series={[getPercOfMax(footprint).toFixed(2)]}
                  type="radialBar"
                  height={350}
                />
              </IonCol>
            </IonRow>
          )}
          <IonRow>
            <MapComponent onTravelStart={onStart} onTravelEnd={onEnd} />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default connect((s: State) => ({
  creds: Selectors.getCreds(s),
}))(RecordTrips);
