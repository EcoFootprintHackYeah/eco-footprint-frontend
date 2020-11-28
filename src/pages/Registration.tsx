import React from "react"
import RegistrationForm, {
  FormDict,
  RegistrationFormPart,
  RegistrationFormPartProps
} from "../components/RegistrationForm";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonInput
} from "@ionic/react";
import {leaf} from "ionicons/icons";

const WelcomeRegistrationPart = () =>
  <IonCard>
    <img src="https://jacksonjournal.news/wp-content/uploads/2020/10/unnamed-file.jpg"/>
    <IonCardHeader>
      <IonCardSubtitle>Account creation</IonCardSubtitle>
      <IonCardTitle>Welcome</IonCardTitle>
    </IonCardHeader>

    <IonCardContent>
      We need a bit more information about you in order to better estimate
      your CO2 <IonIcon icon={leaf}/> footprint.
    </IonCardContent>
  </IonCard>

const FormPart1: RegistrationFormPart = ({onDataUpdate}: RegistrationFormPartProps) =>
  <>
    <IonButton onClick={() => onDataUpdate({country: 'Poland'})}>Click to select Poland</IonButton>
  </>

const FormPart1InitialData = {country: 'Russia'}
const FormPart2: RegistrationFormPart = ({currentPartData, onDataUpdate}: RegistrationFormPartProps) =>
  <>
    <IonInput type={'number'} value={currentPartData['redMeatPerWeek']}
              onIonChange={e => onDataUpdate({redMeatPerWeek: parseInt(e.detail.value!)})}/>
    <IonInput type={'number'} value={currentPartData['whiteMeatPerWeek']}
              onIonChange={e => onDataUpdate({whiteMeatPerWeek: parseInt(e.detail.value!)})}/>
  </>

const FormPart2InitialData = {redMeatPerWeek: 0, whiteMeatPerWeek: 0, fishPerWeek: 2}

const OtherPartsInitialData = {netflixHoursPerWeek: 5, musicHoursPerDay: 3, kwhPerMonth: 200}

const Registration = ({onSubmit}: { onSubmit: (data: FormDict) => void }) =>
  <RegistrationForm onSubmit={onSubmit}
                    parts={[WelcomeRegistrationPart, FormPart1, FormPart2]}
                    initialData={[FormPart1InitialData, FormPart2InitialData, OtherPartsInitialData]}/>

export default Registration