import React from "react"
import RegistrationForm, {RegistrationFormPart, RegistrationFormPartProps} from "../components/RegistrationForm";
import {IonButton, IonInput} from "@ionic/react";

const FormPart1: RegistrationFormPart = ({onDataUpdate}: RegistrationFormPartProps) =>
  <>
    <IonButton onClick={() => onDataUpdate({country: 'Poland'})}>Click to select Poland</IonButton>
  </>

const FormPart1InitialData = {country: 'Russia'}

const FormPart2: RegistrationFormPart = ({currentPartData, onDataUpdate}: RegistrationFormPartProps) =>
  <>
    <IonInput type={'number'} value={currentPartData['redMeat']}
              onIonChange={e => onDataUpdate({redMeat: parseInt(e.detail.value!)})}/>
    <IonInput type={'number'} value={currentPartData['whiteMeat']}
              onIonChange={e => onDataUpdate({whiteMeat: parseInt(e.detail.value!)})}/>
  </>

const FormPart2InitialData = {redMeat: 0, whiteMeat: 0}

const Registration = () =>
  <RegistrationForm onSubmit={(data) => alert(JSON.stringify(data))} parts={[FormPart1, FormPart2]}
                    initialData={[FormPart1InitialData, FormPart2InitialData]}/>

export default Registration