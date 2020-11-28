import React, {useState} from 'react'
import {IonButton, IonContent} from "@ionic/react";

export type FormDict = { [key: string]: string | number }

export interface RegistrationFormPartProps {
  currentPartData: FormDict
  onDataUpdate: (updateData: FormDict) => void
}

export type RegistrationFormPart = (props: RegistrationFormPartProps) => React.ReactNode

interface RegistrationFormProps {
  onSubmit: (data: FormDict) => void
  parts: RegistrationFormPart[]
  initialData: FormDict[]
}

const RegistrationForm: React.FunctionComponent<RegistrationFormProps> = ({onSubmit, parts, initialData}: RegistrationFormProps) => {
  const [formData, setFormData] = useState<FormDict>({})
  const [currentPart, setCurrentPart] = useState(0)
  const [currentPartData, setCurrentPartData] = useState<FormDict>(initialData.reduce((previousValue: FormDict, currentValue: FormDict) =>
    Object.assign({}, previousValue, currentValue)))

  const handleNext = () => {
    const updatedData = {...formData, ...currentPartData}
    if (currentPart + 1 >= parts.length) {
      onSubmit(updatedData)
    } else {
      setFormData(updatedData)
      setCurrentPart(currentPart + 1)
    }
  }

  return (
    <IonContent>
      {parts[currentPart]({
        currentPartData,
        onDataUpdate: updateDate => setCurrentPartData({...currentPartData, ...updateDate})
      })}
      <IonButton onClick={() => handleNext()}>
        {currentPart === parts.length - 1 ? 'Submit' : 'Next'}
      </IonButton>
    </IonContent>
  )
}

export default RegistrationForm