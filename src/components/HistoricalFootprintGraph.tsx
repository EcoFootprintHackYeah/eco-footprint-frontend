import {IonTitle, useIonViewWillEnter} from "@ionic/react";
import { makeStyles } from "@material-ui/core";
import React, {useState} from "react";
import ReactApexChart from "react-apexcharts";

interface HistoricalFootprint {
  xs: string[]
  ys: number[]
  xlabel: string
}

const options = (data: HistoricalFootprint, recommendedLevel: number) => {
  return {
    chart: {
      height: 350,
      type: 'line',
      foreColor: '#D1D8DC',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#77B6EA'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth'
    },

    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.3
      },
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: data.xs,
      title: {
        text: data.xlabel,
      },
    },
    yaxis: {
      title: {
        text: 'Footprint',
      },
      min: Math.min(...data.ys, recommendedLevel),
      max: Math.max(...data.ys, recommendedLevel)
    },
    tooltip: {
      enabled: false
    },
    annotations: {
      yaxis: [{
        y: recommendedLevel,
        y2: recommendedLevel + 1,
        opacity: 0.9,
        borderColor: 'red',
        fillColor: 'red',
      }]
    }
  }
}

export const sampleMonthsFootprint: HistoricalFootprint = {
  xs: ['Jan', 'Feb', 'Mar', 'Apr'],
  ys: [90, 70, 90, 180],
  xlabel: 'Month'
}

const useStyles = makeStyles({
  title: {
    margin: "auto",
    textAlign: "center",
    padding: "15px",
  },
});

const HistoricalFootprintGraph = ({data, recommendedLevel}: { data: HistoricalFootprint, recommendedLevel: number }) => {
  const classes = useStyles();
  const series = [{
    name: 'Footprint',
    data: data.ys
  }]
  const [height, setHeight] = useState(350)
  useIonViewWillEnter(() => setHeight(350 + Math.random()))
  return (
    <>
    <IonTitle className={classes.title}>Your historical footprint</IonTitle>
    <ReactApexChart options={options(data, recommendedLevel)} type={'line'} series={series} height={height}/>
    </>
  )
}

export default HistoricalFootprintGraph