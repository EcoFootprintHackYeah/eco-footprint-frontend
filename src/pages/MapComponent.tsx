import React, { useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./MapComponent.css";
import { Geolocation, GeolocationPosition } from "@capacitor/core";
import environment from "../environment";
import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import { isCompositeComponent } from "react-dom/test-utils";

export interface MapComponentProps {
  onTravelEnd: (points: GeolocationPosition[]) => void;
  onTravelStart: () => void;
}

function transformPoint(pt: GeolocationPosition): H.geo.Point {
  return new H.geo.Point(pt.coords.latitude, pt.coords.longitude);
}

function drawLineString(pt: GeolocationPosition[]): H.geo.LineString {
  const geoLine = new H.geo.LineString();
  pt.forEach((p) => geoLine.pushPoint(transformPoint(p)));
  return geoLine;
}

let hmap: H.Map;
let recording: GeolocationPosition[] = [];

const MapComponent: React.FC<MapComponentProps> = ({
  onTravelEnd,
  onTravelStart,
}) => {
  const myRef = useRef<HTMLDivElement>(null);
  //   const [hmap, setMap] = useState<H.Map | undefined>(undefined);
  const [watcherId, setWatcherId] = useState<string>("");

  const watchLocation = () => {
    const watcherId = Geolocation.watchPosition(
      { enableHighAccuracy: false },
      (pos: GeolocationPosition) => {
        recording.push(pos);
        if (recording.length > 1 && hmap) {
          const ls = drawLineString([
            recording[recording.length - 2],
            recording[recording.length - 1],
          ]);
          hmap.addObject(new H.map.Polyline(ls, { style: { lineWidth: 4 } }));
        }
      }
    );
    setWatcherId(watcherId);
    onTravelStart();
  };

  const stopWatching = async () => {
    await Geolocation.clearWatch({ id: watcherId });
    setWatcherId("");
    onTravelEnd([...recording]);
    recording = [];
  };

  useLayoutEffect(() => {
    console.log(myRef); // { current: <h1_object> }
    if (myRef.current) {
      const platform = new H.service.Platform({
        apikey: environment.mapsApiKey!,
      });
      const defaultLayers = platform.createDefaultLayers();
      // add a resize listener to make sure that the map occupies the whole container
      window.addEventListener("resize", () => hmap.getViewPort().resize());

      hmap = new H.Map(myRef.current!, defaultLayers.vector.normal.map, {
        // This map is centered over Europe
        center: { lat: 50, lng: 5 },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1,
      });

      //Step 3: make the map interactive
      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hmap));

      // Create the default UI components
      var ui = H.ui.UI.createDefault(hmap, defaultLayers);

      Geolocation.getCurrentPosition().then((p) => {
        console.log("setting center!", hmap);
        hmap.setCenter(new H.geo.Point(p.coords.latitude, p.coords.longitude));
        hmap.setZoom(13);
        hmap.getViewPort().resize();
        hmap.addObject(
          new H.map.Marker({ lat: p.coords.latitude, lng: p.coords.longitude })
        );
      });
    }
  }, [watcherId]);

  return (
    <IonGrid>
      {watcherId && (
        <IonRow className="ion-align-items-center">
          <div ref={myRef} id="map"></div>
        </IonRow>
      )}
      {watcherId && (
        <>
          <IonRow className="ion-align-items-center">
            <IonCol className="ion-text-center">
              <IonButton onClick={stopWatching}>Stop Traveling</IonButton>
            </IonCol>
          </IonRow>
        </>
      )}
      {!watcherId && (
        <>
          <IonRow className="ion-align-items-center">
            <IonCol className="ion-text-center">
              <IonButton onClick={watchLocation}>Start Traveling</IonButton>
            </IonCol>
          </IonRow>
        </>
      )}
    </IonGrid>
  );
};

MapComponent.propTypes = {};

export default MapComponent;
