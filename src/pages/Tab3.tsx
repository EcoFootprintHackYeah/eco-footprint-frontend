import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab3.css";
import HistoricalFootprintGraph, {
  sampleMonthsFootprint,
} from "../components/HistoricalFootprintGraph";


const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <HistoricalFootprintGraph
          data={sampleMonthsFootprint}
          recommendedLevel={90}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
