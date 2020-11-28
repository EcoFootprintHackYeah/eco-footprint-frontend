import React, { useState } from "react";
import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import "../theme/CountryPicker.css";

import { ElectricityType } from "carbon-footprint";

const CountryPicker: React.FC<{}> = () => {
  const [country, setCountry] = useState("world");
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
      <IonList>
        {Object.keys(ElectricityType)
          .filter(excludeElectricityType)
          .map((key) => (
            <IonItem button onClick={() => setCountry(key)} key={key}>
              <IonLabel>{capitalize(key)}</IonLabel>
            </IonItem>
          ))}
      </IonList>
    </>
  );
};

export default CountryPicker;
