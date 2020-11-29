import React, { useEffect, useState } from "react";
import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonTabs,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./RecordTrips.css";
import ReactApexChart from "react-apexcharts";
import instance from "../services/apiCalls";
import { GeolocationPosition, Storage } from "@capacitor/core";
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
import { connect, useDispatch } from "react-redux";
import { State } from "../reducers/stateTypes";
import AdvicesSchedulerWrapper from "../components/AdvicesSchedulerWrapper";
import { makeStyles } from "@material-ui/core";

// Paris agreement budget
const MaxBudget = 166;

const categoriesOptions = {
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 360,
      hollow: {
        margin: 5,
        size: "30%",
        background: "transparent",
        image: undefined,
      },
      dataLabels: {
        name: {
          show: true,
        },
        value: {
          show: true,
        },
      },
    },
  },
  grid: {
    padding: {
      left: 0,
      top: 0,
    },
  },
  colors: ["#EF946C", "#C4A77D", "#70877F", "#454372", "#2F2963"],
  labels: ["Trips", "Electricity", "Music", "Movies", "Food"],
  legend: {
    show: true,
    floating: true,
    fontSize: "16px",
    position: "left",
    offsetX: 0,
    offsetY: 15,
    labels: {
      useSeriesColors: true,
    },
    markers: {
      size: 0,
    },
    itemMargin: {
      vertical: 3,
    },
  },
};

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
    colors: ["#9ECE9A"],
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

interface AggregateFootprintState {
  trips: number;
  electricity: number;
  music: number;
  streaming: number;
  food: number;
}

const getPercOfMax = (value: number) => {
  return (value / MaxBudget) * 100;
};

const RecordTrips: React.FC<RecordTripsProps> = ({ creds }) => {
  const [footprint, setFootprint] = useState(0);
  const [checked, setChecked] = useState(false);
  const [aggregatedFootprint, setAggregatedFoodprint] = useState<
    AggregateFootprintState | undefined
  >(undefined);
  const [isTravelling, setIsTravelling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShowModal] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [inference, setInferenceResponse] = useState<InferenceResponse | null>(
    null
  );
  const [height, setHeight] = useState(310);
  useIonViewWillEnter(() => setHeight(310 + Math.random()));

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

  useEffect(() => {
    async function get() {
      const request = await instance.get("/footprint/monthly/grouped", {
        auth: {
          username: creds.id,
          password: creds.apiKey,
        },
      });
      setAggregatedFoodprint(request.data);
    }
    get();
  }, [setAggregatedFoodprint]);

  const onStart = () => {
    setIsTravelling(true);
  };

  const getMonthlyFootprint = async () => {
    const request = await instance.get("/footprint/monthly", {
      auth: {
        username: creds.id,
        password: creds.apiKey,
      },
    });
    setFootprint(request.data.total);
  };

  const getMonthlyFootprintAggregated = async () => {
    const request = await instance.get("/footprint/monthly/grouped", {
      auth: {
        username: creds.id,
        password: creds.apiKey,
      },
    });
    setAggregatedFoodprint(request.data);
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

    const inferenceResponse = await Axios.post<
      InferenceRequest,
      AxiosResponse<InferenceResponse>
    >(environment.inferenceEndpoint, { points: reqData });

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
    getMonthlyFootprint();
    getMonthlyFootprintAggregated();
  };

  const deleteUser = async () => {
    await instance.delete("/user", {
      auth: {
        username: creds.id,
        password: creds.apiKey,
      },
    });
    await Storage.remove({ key: "account" });

    dispatch({
      type: "SET_AUTHENTICATED",
      authenticated: false,
    });
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
            <>
              <IonRow className="ion-align-items-center">
                <IonCol>
                  <IonItem>
                    <IonLabel>Remove all user data?</IonLabel>
                    <IonButton color="danger" onClick={deleteUser}>
                      Forget me
                    </IonButton>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow className="ion-align-items-center">
                <IonCol>
                  <IonItem>
                    <IonLabel>Show fine-grained data</IonLabel>
                    <IonToggle
                      checked={checked}
                      onIonChange={(e) => setChecked(e.detail.checked)}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
              {!checked && (
                <IonRow className="ion-align-items-center">
                  <IonCol>
                    <ReactApexChart
                      options={options}
                      series={[getPercOfMax(footprint).toFixed(2)]}
                      type="radialBar"
                      height={height}
                    />
                  </IonCol>
                </IonRow>
              )}
              {aggregatedFootprint && checked && (
                <IonRow>
                  <IonCol>
                    <ReactApexChart
                      options={categoriesOptions}
                      series={[
                        getPercOfMax(aggregatedFootprint!.trips).toFixed(2),
                        getPercOfMax(aggregatedFootprint!.electricity).toFixed(
                          2
                        ),
                        getPercOfMax(aggregatedFootprint!.music).toFixed(2),
                        getPercOfMax(aggregatedFootprint!.streaming).toFixed(2),
                        getPercOfMax(aggregatedFootprint!.food).toFixed(2),
                      ]}
                      type="radialBar"
                      height={height}
                    />
                  </IonCol>
                </IonRow>
              )}
            </>
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
