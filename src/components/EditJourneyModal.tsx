import {
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { ALL_MODES, TransportMode } from "../model/TransportMode";
import { JourneyEntry } from "../model/JourneyEntry";

const DateTimeInput = ({
  value,
  setValue,
  label,
}: {
  value: Date;
  setValue: (d: Date) => void;
  label: string;
}) => (
  <IonItem>
    <IonLabel position="floating">{label}</IonLabel>
    <IonDatetime
      value={value.toISOString()}
      onIonChange={(e) => setValue(new Date(Date.parse(e.detail.value!)))}
      displayFormat="MM/DD/YYYY HH:mm"
    />
  </IonItem>
);

export const EditJourneyModal = ({
  close,
  save,
  journey,
}: {
  close: () => void;
  save: (journey: JourneyEntry) => void;
  journey: JourneyEntry;
}): JSX.Element => {
  const [mode, setMode] = useState<TransportMode>(journey.mode);
  const [startDate, setStartDate] = useState<Date>(journey.startDate);
  const [endDate, setEndDate] = useState<Date>(journey.endDate);
  const [distance, setDistance] = useState<number>(journey.distance);

  return (
    <IonModal isOpen={true} cssClass="my-custom-class">
      {journey && (
        <IonContent>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Edit your journey </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Mode of transport</IonLabel>
            </IonItem>
            <IonSegment
              value={mode.name}
              onIonChange={(e) =>
                setMode(ALL_MODES.find((m) => m.name === e.detail.value)!)
              }
            >
              {ALL_MODES.map((m) => (
                <IonSegmentButton value={m.name}>
                  <IonLabel>{m.name}</IonLabel>
                </IonSegmentButton>
              ))}
            </IonSegment>
            <IonItem>
              <IonLabel position="floating">Distance</IonLabel>
              <IonInput
                value={distance}
                type="number"
                onIonChange={(e) => setDistance(parseInt(e.detail.value!))}
                clearInput
              />
            </IonItem>
            <DateTimeInput
              value={startDate}
              setValue={setStartDate}
              label={"Start datetime"}
            />
            <DateTimeInput
              value={endDate}
              setValue={setEndDate}
              label={"End datetime"}
            />
          </IonList>
        </IonContent>
      )}
      <IonButton
        onClick={() => {
          save(
            Object.assign({}, journey, {
              distance: distance,
              startDate: startDate,
              endDate: endDate,
              mode: mode,
            })
          );
          close();
        }}
      >
        Save
      </IonButton>
      <IonButton onClick={close}>Cancel</IonButton>
    </IonModal>
  );
};
