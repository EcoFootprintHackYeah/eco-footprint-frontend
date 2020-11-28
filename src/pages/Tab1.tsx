import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import ReactApexChart from "react-apexcharts";
import instance from "../services/apiCalls";
import CreateAccount from "../components/CreateAccount";
import { Geolocation, GeolocationPosition } from "@capacitor/core";
import MapComponent from "./MapComponent";
import Axios, { AxiosResponse } from "axios";
import {
  InferenceData,
  InferenceRequest,
  InferenceResponse,
} from "../model/Inference";
import environment from "../environment";

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
  stroke: {
    lineCap: "round",
  },
  labels: ["Your current footprint"],
};

const Tab1: React.FC = () => {
  const [footprint, setFootprint] = useState(0);
  const [isTravelling, setIsTravelling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchURL = "";

  useEffect(() => {
    async function fetchFootprint() {
      const request = await instance.post(
        fetchURL,
        {},
        {
          auth: {
            username: "",
            password: "",
          },
        }
      );
      return request;
    }

    // TODO remove
    setTimeout(() => {
      console.log("World!");
      setFootprint(72);
    }, 1000);
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

    const inferenceResponse = await Axios.post<
      InferenceRequest,
      AxiosResponse<InferenceResponse>
    >(environment.inferenceEndpoint, { points: reqData });
    console.log(inferenceResponse.data);
    setIsLoading(false);
  };

  return (
    <IonPage>
      <IonLoading isOpen={isLoading} message={"Inferring..."} />
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          {!isTravelling && (
            <IonRow className="ion-align-items-center">
              <IonCol>
                <ReactApexChart
                  options={options}
                  series={[footprint]}
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

export default Tab1;
