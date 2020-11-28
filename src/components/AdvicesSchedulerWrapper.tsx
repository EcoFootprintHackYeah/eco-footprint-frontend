import React from "react";
import {Plugins} from "@capacitor/core";
import {useSelector} from "react-redux";
import {State} from "../reducers/stateTypes";
import instance from "../services/apiCalls";
import {datesAreOnSameDay} from "../services/dates";

interface Advice {
  title: string,
  body: string,
}

export const fetchAdvice = (user: number, apiKey: string) => {
  return instance.get(
    "/advices/today",
    {
      auth: {
        username: user.toString(),
        password: apiKey,
      },
    }
  );
}

export const scheduleAdvice = (advice: Advice) => {
  Plugins.LocalNotifications.schedule({
    notifications: [{
      id: Math.floor(Math.random() * 1000),
      title: advice.title,
      body: advice.body,
      schedule: { at: new Date(Date.now() + 30 * 1000 ) },
    }]
  })
}

const {Storage} = Plugins;

const wasAdviceGivenToday = (value: string): boolean => {
  const lastDate = new Date(parseInt(value, 10))
  return datesAreOnSameDay(lastDate, new Date(Date.now()));
}

const AdvicesSchedulerWrapper = () => {
  const payload = useSelector((state: State) => state.auth.payload)
  Storage.get({key: 'lastNotification'}).then(result => {
    if(result.value === null || !wasAdviceGivenToday(result.value)) {

      Plugins.LocalNotifications.requestPermission().then(r => {
        if(r.granted) {
          fetchAdvice(payload.id, payload.apiKey).then(response => scheduleAdvice(response.data))
        }
      })
      Storage.set({
        key: 'lastNotification',
        value: Date.now().toString()
      })
    }
})
  return (
    <></>
  )
}

export default AdvicesSchedulerWrapper