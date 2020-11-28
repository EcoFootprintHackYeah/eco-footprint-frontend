import React from "react";
import {
  IonButton,
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
import { Plugins } from "@capacitor/core";
import instance from "../services/apiCalls";
import { AxiosResponse } from "axios";
import { UserModel } from "../services/userModel";
import { useDispatch } from "react-redux";

const { Storage } = Plugins;

const CreateAccount: React.FC<{}> = () => {
  const dispatch = useDispatch();

  async function authenticate() {
    const response = await instance.post<any, AxiosResponse<UserModel>>(
      "/user"
    );
    if (response.status === 201) {
      await Storage.set({
        key: "account",
        value: JSON.stringify(response.data),
      });
      dispatch({
        type: "SET_AUTHENTICATED",
        authenticated: true,
        payload: response.data,
      });
    }
  }

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
      <IonButton onClick={authenticate}>Authenticate</IonButton>
    </IonPage>
  );
};

export default CreateAccount;
