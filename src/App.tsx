import React, {useEffect} from "react";
import {Redirect, Route} from "react-router-dom";
import {IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs,} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import {compass, car, barChart } from "ionicons/icons";
import RecordTrips from "./pages/RecordTrips";
import JourneysList from "./pages/JourneysList";
import Statistics from "./pages/Statistics";
import {Plugins} from "@capacitor/core";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import CreateAccount from "./components/CreateAccount";
import {connect, useDispatch} from "react-redux";
import {State} from "./reducers/stateTypes";
import {Selectors} from "./selectors";
import Registration from "./pages/Registration";
import AdvicesSchedulerWrapper from "./components/AdvicesSchedulerWrapper";

const {Storage} = Plugins;

interface AppProps {
  authenticated: boolean;
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    Storage.get({key: "account"}).then((d) => {
      if (d && d.value) {
        dispatch({
          type: "SET_AUTHENTICATED",
          payload: JSON.parse(d.value),
          authenticated: true,
        });
      } else {
        dispatch({
          type: "SET_AUTHENTICATED",
          authenticated: false,
        });
      }
    });
  }, []);

  console.log(props);

  return (
    <IonApp>
      <IonReactRouter>
        {!props.authenticated && <CreateAccount/>}
        {props.authenticated && (
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home" component={RecordTrips} exact={true}/>
              <Route path="/trips" component={JourneysList} exact={true}/>
              <Route path="/statistics" component={Statistics}/>
              <Route path="/registration" component={Registration} exact={true}/>
              <Route
                path="/"
                render={() => <Redirect to="/home"/>}
                exact={true}
              />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={compass}/>
                <IonLabel>Record</IonLabel>
              </IonTabButton>
              <IonTabButton tab="trips" href="/trips">
                <IonIcon icon={car}/>
                <IonLabel>Your Journeys</IonLabel>
              </IonTabButton>
              <IonTabButton tab="statistics" href="/statistics">
                <IonIcon icon={barChart}/>
                <IonLabel>Statistics</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default connect((state: State) => ({
  authenticated: Selectors.isAuthenticated(state),
}))(App);
