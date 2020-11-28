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
  IonSegmentButton, IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { JourneyEntry } from "../model/JourneyEntry";
import {TravelType} from "../model/Inference";

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
      displayFormat="MM/DD/YYYY"
    />
  </IonItem>
);

export const EditJourneyModal = ({
  close,
  save,
  journey,
}: {
  close: () => void;
  save: (update: any) => void;
  journey: JourneyEntry;
}): JSX.Element => {
  const [mode, setMode] = useState<TravelType>(journey.mode);
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
              <IonLabel>Transport mode</IonLabel>
              <IonSelect
                value={mode}
                okText="Okay"
                cancelText="Dismiss"
                onIonChange={(e) =>
                  setMode(e.detail.value)
                }
              >
                <IonSelectOption value="walking">Walking</IonSelectOption>
                <IonSelectOption value="jogging">Jogging</IonSelectOption>
                <IonSelectOption value="biking">Biking</IonSelectOption>
                <IonSelectOption value="driving">Driving</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Distance</IonLabel>
              <IonInput
                value={distance.toFixed(2)}
                type="number"
                onIonChange={(e) => {
                  setDistance(parseFloat(e.detail.value!))
                }}
                step={"0.01"}
              />
            </IonItem>
            {/*<DateTimeInput*/}
            {/*  value={date}*/}
            {/*  setValue={setDate}*/}
            {/*  label={"Date"}*/}
            {/*/>*/}
          </IonList>
        </IonContent>
      )}
      <IonButton
        onClick={() => {
          save({
              distance: distance,
              transport: mode,
              id: journey.id,
            });
          close();
        }}
      >
        Save
      </IonButton>
      <IonButton onClick={close}>Cancel</IonButton>
    </IonModal>
  );
};
