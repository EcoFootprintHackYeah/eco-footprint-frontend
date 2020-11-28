import React, { useState } from "react";
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import HistoricalFootprintGraph, {
  HistoricalFootprint,
  sampleMonthsFootprint,
} from "../components/HistoricalFootprintGraph";
import { makeStyles } from "@material-ui/core";
import instance from "../services/apiCalls";
import { Selectors } from "../selectors";
import { useSelector } from "react-redux";
import { AxiosResponse } from "axios";

interface Resp {
  points: RespProps[];
}
interface RespProps {
  value: number;
  month: string;
}

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
  const auth = useSelector(Selectors.getCreds);
  const [historical, setHistorical] = useState<HistoricalFootprint>({
    xlabel: "Month",
    ys: [],
    xs: [],
  });

  useIonViewWillEnter(() => {
    async function get() {
      const resp = await instance.get<any, AxiosResponse<Resp>>(
        "/historicalData",
        {
          auth: {
            username: auth.id.toString(),
            password: auth.apiKey,
          },
        }
      );
      const xs = resp.data.points.map((d) => d.month);
      const ys = resp.data.points.map((d) => d.value);
      const hist = {
        xlabel: "Month",
        xs: [...xs],
        ys: [...ys],
      };
      console.log(hist);
      setHistorical(hist);
    }
    get();
  }, []);

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
        {historical.xs && historical.xs.length > 0 && (
          <HistoricalFootprintGraph data={historical} recommendedLevel={166} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Statistics;
