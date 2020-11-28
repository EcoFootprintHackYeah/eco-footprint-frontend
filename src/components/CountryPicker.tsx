import React, { useState } from "react";
import {
  IonImg, IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import "../theme/CountryPicker.css";

import { ElectricityType } from "carbon-footprint";
import { FormDict } from "./RegistrationForm";
import { makeStyles } from "@material-ui/core";
import {filter} from "ionicons/icons";

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
  const [filterValue, setFilterValue] = useState("")

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
      <IonItem><IonInput value={filterValue} onIonChange={e => setFilterValue(e.detail.value!)} placeholder={"Filter"}/></IonItem>
      <IonList className="country-ion-list">
        {Object.keys(ElectricityType)
          .filter(excludeElectricityType)
          .filter(country => filterValue === "" || country.toLowerCase().includes(filterValue.toLowerCase()))
          .sort()
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
