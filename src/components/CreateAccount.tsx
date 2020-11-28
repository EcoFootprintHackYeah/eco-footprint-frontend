import React from "react";
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar,} from "@ionic/react";
import {Plugins} from "@capacitor/core";
import instance from "../services/apiCalls";
import {AxiosResponse} from "axios";
import {UserModel} from "../services/userModel";
import {useDispatch} from "react-redux";
import Registration from "../pages/Registration";
import {FormDict} from "./RegistrationForm";

const {Storage} = Plugins;

const CreateAccount: React.FC<{}> = () => {
  const dispatch = useDispatch();

  async function authenticate(userData: FormDict) {
    const response = await instance.post<any, AxiosResponse<UserModel>>(
      "/user", userData
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
        <Registration onSubmit={(data) => authenticate(data)}/>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccount;
