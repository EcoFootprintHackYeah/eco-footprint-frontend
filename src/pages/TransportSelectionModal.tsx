import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { InferenceResponse, TravelType } from "../model/Inference";

import { walk, walkSharp, bicycle, car, leaf, send } from "ionicons/icons";

import { transport } from "carbon-footprint";

export interface TransportSelectionModalProps {
  show: boolean;
  resp: InferenceResponse;
  onSubmit: (d: InferenceResponse) => void;
}

const resultToIcon = (transport: TravelType) => {
  switch (transport) {
    case TravelType.biking:
      return bicycle;
    case TravelType.walking:
      return walk;
    case TravelType.jogging:
      return walkSharp;
    case TravelType.driving:
      return car;
    default:
      return car;
  }
};

const resultToCarbonValue = (tr: TravelType) => {
  switch (tr) {
    case TravelType.biking:
      return transport.motorbike;
    case TravelType.walking:
      return 0;
    case TravelType.jogging:
      return 0;
    case TravelType.driving:
      console.log(transport.car);
      return transport.car;
    default:
      return transport.car;
  }
};

export const TransportSelectionModal: React.FC<TransportSelectionModalProps> = ({
  show,
  resp,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(resp);

  console.log(formData);

  const producedCO2 =
    formData.totalDistance * 1000 * resultToCarbonValue(formData.transport);

  return (
    <IonModal isOpen={show} cssClass="my-custom-class">
      <IonContent fullscreen class="ion-padding">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Inference details - confirm </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <p>We have detected the following details about your journey:</p>
          <IonItem>
            <IonAvatar>
              <IonAvatar>
                <IonIcon
                  size="large"
                  icon={resultToIcon(formData.transport)}
                  color={"white"}
                />
              </IonAvatar>
            </IonAvatar>
            <IonLabel>
              Traveled {formData.totalDistance.toFixed(2)} km by{" "}
              {formData.transport}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonAvatar>
              <IonAvatar>
                <IonIcon size="large" icon={leaf} color={"green"} />
              </IonAvatar>
            </IonAvatar>
            <IonLabel>
              <h3>Recording this trip adds</h3>
              {producedCO2 !== 0 && <p> {producedCO2.toFixed(6)} kgCO2</p>}
              {!producedCO2 && (
                <p style={{ color: "green" }}>0 kgCO2, congrats!</p>
              )}
              <p>Please click below to change transport.</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonAvatar>
              <IonAvatar>
                <IonIcon size="large" icon={send} color={"white"} />
              </IonAvatar>
            </IonAvatar>
            <IonLabel>
              <h3>Your average velocity:</h3>
              <p> {formData.avgSpeed.toFixed(1)} km/h.</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Transport mode</IonLabel>
            <IonSelect
              value={formData.transport}
              okText="Okay"
              cancelText="Dismiss"
              onIonChange={(e) =>
                setFormData({ ...formData, transport: e.detail.value })
              }
            >
              <IonSelectOption value="walking">Walking</IonSelectOption>
              <IonSelectOption value="jogging">Jogging</IonSelectOption>
              <IonSelectOption value="biking">Biking</IonSelectOption>
              <IonSelectOption value="driving">Driving</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </IonContent>
      <IonButton expand="block" onClick={() => onSubmit(formData)}>
        Submit
      </IonButton>
    </IonModal>
  );
};

TransportSelectionModal.propTypes = {};

export default TransportSelectionModal;
