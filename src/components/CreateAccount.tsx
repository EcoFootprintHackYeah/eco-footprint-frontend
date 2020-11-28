import React from "react";
import {IonAvatar, IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar,} from "@ionic/react";
import {Plugins} from "@capacitor/core";
import instance from "../services/apiCalls";
import {AxiosResponse} from "axios";
import {UserModel} from "../services/userModel";
import {useDispatch} from "react-redux";
import Registration from "../pages/Registration";
import {FormDict} from "./RegistrationForm";
import { makeStyles } from "@material-ui/core";

const {Storage} = Plugins;
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

const CreateAccount: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

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
      <IonToolbar color="primary">
          <IonAvatar className={classes.image}>
            <IonImg src="/logo.png" />
          </IonAvatar>
          <IonTitle className={classes.title}>EloEco</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Registration onSubmit={(data) => authenticate(data)}/>
    </IonPage>
  );
};

export default CreateAccount;
