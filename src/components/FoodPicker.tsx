import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import "../theme/FoodPicker.css";
import { FormDict } from "./RegistrationForm";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
  picture: {
    height: "20%",
    marginTop: "30%"
  }
});


interface FoodickerProps {
  onFoodChange: (data: FormDict) => void;
}

const FoodAmount = (name: string, value: number, setValue: any) => {
  const increment = (value: any, setValue: any) => () => setValue(value + 1);
  const decrement = (value: any, setValue: any) => () => {
    if (value > 0) setValue(value - 1);
  };
  return (
    <IonItem className={"food-item"}>
      <IonButton
        color="danger"
        className={"icon-button"}
        onClick={decrement(value, setValue)}
      >
        -
      </IonButton>
      <IonLabel className={"food-label"}>
        <h2>{name}:</h2>
        <p>{value} portions</p>
      </IonLabel>
      <IonButton
        color="success"
        className={"icon-button"}
        onClick={increment(value, setValue)}
      >
        +
      </IonButton>
    </IonItem>
  );
};

const FoodPicker: React.FC<FoodickerProps> = ({ onFoodChange }) => {
  const [redMeat, setRedMeat] = useState(0);
  const [whiteMeat, setWhiteMeat] = useState(0);
  const [fish, setFish] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    onFoodChange({
      redMeatPerWeek: redMeat,
      whiteMeatPerWeek: whiteMeat,
      fishPerWeek: fish,
    });
  }, [redMeat, whiteMeat, fish]);

  return (
    <>
      <IonList className={"list"}>
        <IonListHeader>How many portions do you eat per week?</IonListHeader>
        {FoodAmount("Red Meat", redMeat, setRedMeat)}
        {FoodAmount("White Meat", whiteMeat, setWhiteMeat)}
        {FoodAmount("Fish", fish, setFish)}
      </IonList>
      <IonImg className={classes.picture} src="/fish.png" />
    </>
  );
};

export default FoodPicker;
