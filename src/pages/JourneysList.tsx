import React, {useState} from 'react';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {AIRPLANE, BICYCLE, BUS, CAR} from "../model/TransportMode";
import {EditJourneyModal} from "../components/EditJourneyModal";
import {JourneyEntry} from "../model/JourneyEntry";

const data: JourneyEntry[] = [{
  startDate: new Date(2020, 11, 20, 10, 15),
  endDate: new Date(2020, 11, 20, 11, 30),
  distance: 600,
  avgSpeed: 100,
  co2Footprint: 70,
  mode: CAR
}, {
  startDate: new Date(),
  endDate: new Date(),
  distance: 600,
  avgSpeed: 100,
  co2Footprint: 70,
  mode: CAR
}, {
  startDate: new Date(2020, 5, 20, 10, 15),
  endDate: new Date(2020, 5, 20, 11, 30),
  distance: 600,
  avgSpeed: 100,
  co2Footprint: 70,
  mode: AIRPLANE
}, {
  startDate: new Date(2020, 3, 20, 14, 15),
  endDate: new Date(2020, 3, 21, 11, 30),
  distance: 600,
  avgSpeed: 100,
  co2Footprint: 70,
  mode: BICYCLE
}, {
  startDate: new Date(2020, 3, 20, 10, 15),
  endDate: new Date(2020, 3, 20, 11, 30),
  distance: 600,
  avgSpeed: 100,
  co2Footprint: 70,
  mode: BUS
}]

const datesAreOnSameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();


const JourneysList: React.FC = () => {
  const [editingJourney, setEditingJourney] = useState<JourneyEntry | undefined>(undefined)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your journeys</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {editingJourney !== undefined &&
        <EditJourneyModal close={() => setEditingJourney(undefined)}
                          journey={editingJourney} save={journey => alert(JSON.stringify(journey))}/>}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Your journeys</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {data.map(journey =>
            <IonItem button detail={false} onClick={() => setEditingJourney(journey)}>
              <IonAvatar><IonIcon size='large' icon={journey.mode.icon} color={'white'}/></IonAvatar>
              <IonLabel>
                <h2>
                  {journey.startDate.toLocaleDateString()}
                  {!datesAreOnSameDay(journey.startDate, journey.endDate) ? ' - ' + journey.endDate.toLocaleDateString() : ''}
                </h2>
                <p>{journey.startDate.toLocaleTimeString()} - {journey.endDate.toLocaleTimeString()}</p>
                <p>CO2: {journey.co2Footprint}</p>
                <p>{journey.distance} km ({journey.avgSpeed} km/h)</p>
              </IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default JourneysList;
