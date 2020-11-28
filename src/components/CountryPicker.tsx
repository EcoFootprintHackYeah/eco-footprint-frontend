import React, { useState } from "react";
import {
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import "../theme/CountryPicker.css";

import { ElectricityType } from "carbon-footprint";
import { FormDict } from "./RegistrationForm";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    color: "#056B24",
  },
});

interface CountryPickerProps {
  onCountryChange: (data: FormDict) => void;
}

const CountryPicker: React.FC<CountryPickerProps> = ({ onCountryChange }) => {
  const classes = useStyles();
  const [country, setCountry] = useState("");

  const capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    if (["uk", "usa"].indexOf(s) >= 0) return s.toUpperCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const excludeElectricityType = (key: string) =>
    ["world", "europe"].indexOf(key) < 0;

  return (
    <>
      <IonListHeader>What country are you from?</IonListHeader>
      <IonList className="country-ion-list">
        {Object.keys(ElectricityType)
          .filter(excludeElectricityType)
          .map((key) => (
            <IonItem
              button
              className={country && country == key ? classes.root : ""}
              onClick={() => {
                onCountryChange({ country: key });
                setCountry(key);
              }}
              key={key}
            >
              <IonLabel>{capitalize(key)}</IonLabel>
            </IonItem>
          ))}
      </IonList>
      <IonImg className="picture-crop" src="/globe.png" />
    </>
  );
};

export default CountryPicker;
