import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import ReactApexChart from "react-apexcharts";
import instance from "../services/apiCalls";

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

  return (
    <IonPage>
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
          <IonRow className="ion-align-items-center">
            <IonCol className="ion-text-center">
              <IonButton>Start Travelling</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
