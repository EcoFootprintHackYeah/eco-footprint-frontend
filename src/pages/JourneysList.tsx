import React, {useEffect, useState} from 'react';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { EditJourneyModal } from "../components/EditJourneyModal";
import { JourneyEntry } from "../model/JourneyEntry";
import { datesAreOnSameDay } from "../services/dates";
import { makeStyles } from "@material-ui/core";
import {useSelector} from "react-redux";
import {Selectors} from "../selectors";
import instance from "../services/apiCalls";
import {travelTypeToIcon} from "./TransportSelectionModal";
import { useIonViewWillEnter } from "@ionic/react";

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

const JourneysList: React.FC = () => {
  const [editingJourney, setEditingJourney] = useState<JourneyEntry | undefined>(undefined)
  const [journeys, setJourneys] = useState<JourneyEntry[]>([])
  const [shouldRefreshJourneys, setShouldRefreshJourneys] = useState(true)
  const auth = useSelector(Selectors.getCreds)
  const classes = useStyles();
  useIonViewWillEnter(() => setShouldRefreshJourneys(true))

  useEffect(() => {
    if(shouldRefreshJourneys) {
      instance.get(
        "/footprint/trips",
        {
          auth: {
            username: auth.id.toString(),
            password: auth.apiKey,
          },
        }
      ).then(result => {
        setJourneys(result.data.map((body: any) => {
          return {
            id: body.id,
            co2Footprint: body.value,
            distance: body.totalDistance,
            avgSpeed: body.avgSpeed,
            date: new Date(Date.parse(body.createdAt)),
            mode: body.transport
          }
        }));
      })
      setShouldRefreshJourneys(false)
    }
  }, [shouldRefreshJourneys])

  const updateJourney = (update: any) => instance.patch(
    "/footprint/trip",
    update,
    {
      auth: {
        username: auth.id.toString(),
        password: auth.apiKey,
      },
    }
  ).then(() => setShouldRefreshJourneys(true))

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
        {editingJourney !== undefined &&
        <EditJourneyModal close={() => setEditingJourney(undefined)}
                          journey={editingJourney} save={updateJourney}/>}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Your journeys</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {journeys.map(journey =>
            <IonItem button detail={false} onClick={() => setEditingJourney(journey)} key={journey.id}>
              <IonAvatar><IonIcon size='large' icon={travelTypeToIcon(journey.mode)} color={'white'}/></IonAvatar>
              <IonLabel>
                <h2>{journey.date.toLocaleDateString()}</h2>
                <p>CO2: {journey.co2Footprint.toFixed(10)} kg</p>
                <p>{journey.distance.toFixed(2)} km</p>
              </IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default JourneysList;
