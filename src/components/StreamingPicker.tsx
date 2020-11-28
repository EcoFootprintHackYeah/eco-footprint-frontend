import React, { useEffect, useState } from "react";
import { IonImg, IonList, IonListHeader } from "@ionic/react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import PrettySlider from "./PrettySlider";
import { FormDict } from "./RegistrationForm";

const useStyles = makeStyles({
  root: {
    width: 250,
    marginTop: "20px",
  },
  input: {
    width: 42,
    margin: "15px",
  },
  picture: {
    height: "20%",
    marginTop: "30%"
  }
});

interface StreamingPickerProps {
  onStreamingChange: (data: FormDict) => void;
}

const StreamingPicker: React.FC<StreamingPickerProps> = ({
  onStreamingChange,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<
    number | string | Array<number | string>
  >(3);

  useEffect(() => {
    onStreamingChange({ netflixHoursPerWeek: Number(value) });
  }, [value]);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 20) {
      setValue(20);
    }
  };
  return (
    <>
      <IonList>
        <IonListHeader>
          How many hours per week do you watch Netflix?
        </IonListHeader>
      </IonList>
      <Grid container spacing={2} alignItems="center">
        <Grid item></Grid>
        <Grid item xs>
          <PrettySlider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            max={20}
            min={0}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 20,
              type: "number",
              "aria-labelledby": "input-slider",
              style: { textAlign: "center" },
            }}
          />
        </Grid>
      </Grid>
      <IonImg className={classes.picture} src="/film.png" />
    </>
  );
};

export default StreamingPicker;
