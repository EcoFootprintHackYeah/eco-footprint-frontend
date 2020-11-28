import React from "react";
import RegistrationForm, {
  FormDict,
  RegistrationFormPart,
  RegistrationFormPartProps,
} from "../components/RegistrationForm";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { leaf } from "ionicons/icons";
import CountryPicker from "../components/CountryPicker";
import ElectiricityPicker from "../components/ElectricityPicker";
import StreamingPicker from "../components/StreamingPicker";
import MusicPicker from "../components/MusicPicker";
import FoodPicker from "../components/FoodPicker";

const WelcomeRegistrationPart = () => (
  <IonCard>
    <img src="/footprint.png" />
    <IonCardHeader>
      <IonCardSubtitle>Account creation</IonCardSubtitle>
      <IonCardTitle>Welcome</IonCardTitle>
    </IonCardHeader>

    <IonCardContent>
      We need a bit more information about you in order to better estimate your
      CO2 <IonIcon icon={leaf} /> footprint.
    </IonCardContent>
  </IonCard>
);

const FormCountry: RegistrationFormPart = ({
  onDataUpdate,
}: RegistrationFormPartProps) => (
  <CountryPicker onCountryChange={onDataUpdate} />
);

const FormElectricity: RegistrationFormPart = ({
  onDataUpdate,
}: RegistrationFormPartProps) => (
  <ElectiricityPicker onElectricityChange={onDataUpdate} />
);

const FormStreaming: RegistrationFormPart = ({
  onDataUpdate,
}: RegistrationFormPartProps) => (
  <StreamingPicker onStreamingChange={onDataUpdate} />
);

const FormMusic: RegistrationFormPart = ({
  onDataUpdate,
}: RegistrationFormPartProps) => <MusicPicker onMusicChange={onDataUpdate} />;

const FormFood: RegistrationFormPart = ({
  onDataUpdate,
}: RegistrationFormPartProps) => <FoodPicker onFoodChange={onDataUpdate} />;

const InitialData = {
  country: "world",
  netflixHoursPerWeek: 5,
  musicHoursPerDay: 3,
  kwhPerMonth: 200,
  redMeatPerWeek: 0,
  whiteMeatPerWeek: 0,
  fishPerWeek: 0,
};

const Registration = ({ onSubmit }: { onSubmit: (data: FormDict) => void }) => (
  <RegistrationForm
    onSubmit={onSubmit}
    parts={[
      WelcomeRegistrationPart,
      FormCountry,
      FormElectricity,
      FormStreaming,
      FormMusic,
      FormFood,
    ]}
    initialData={[InitialData]}
  />
);

export default Registration;
