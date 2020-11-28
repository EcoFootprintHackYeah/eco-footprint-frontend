import React from "react";
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import HistoricalFootprintGraph, {
  sampleMonthsFootprint,
} from "../components/HistoricalFootprintGraph";
import { makeStyles } from "@material-ui/core";

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

const Statistics: React.FC = () => {
  const classes = useStyles();

  return (
    <IonPage>
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
            <IonTitle size="large">Statistics</IonTitle>
          </IonToolbar>
        </IonHeader>
        <HistoricalFootprintGraph
          data={sampleMonthsFootprint}
          recommendedLevel={166}
        />
      </IonContent>
    </IonPage>
  );
};

export default Statistics;
