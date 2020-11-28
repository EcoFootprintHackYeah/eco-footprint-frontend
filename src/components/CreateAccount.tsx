import React, { useEffect } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { leaf } from "ionicons/icons";

const CreateAccount: React.FC<{}> = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Setup profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <img src="https://jacksonjournal.news/wp-content/uploads/2020/10/unnamed-file.jpg" />
          <IonCardHeader>
            <IonCardSubtitle>Account creation</IonCardSubtitle>
            <IonCardTitle>Welcome</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            We need a bit more information about you in order to better estimate
            your CO2 <IonIcon icon={leaf} /> footprint.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccount;
