import React from "react";
import ReactApexChart from 'react-apexcharts'
import {useSensorChart} from "./sensor-chart.hooks";
import Sensor from "../../models/sensor.model";

export interface SensorChartProps {
  selectedSensor: Sensor | null,
}

export const SensorChart = (props: SensorChartProps): JSX.Element => {
  const {categories, data} = useSensorChart(props.selectedSensor)

  return (
    <div>
      <ReactApexChart options={{
        chart: {
          height: 350,
          type: 'area',
          foreColor: 'white',
          fontFamily: 'Raleway, serif',
          toolbar: {
            show: false,
          },
          animations: {
            dynamicAnimation: {
              enabled: true,
              speed: 900
            }
          }
        },
        grid: {
          show: false,
          borderColor: 'dimgrey',
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          // crosshairs: false,
          tooltip: {
            enabled: false,
          },
          categories
        },
        tooltip: {
          // enabled: false,
          x: {
            format: 'dd/MM/yy HH:mm'
            // show: false,
          },
          marker: {
            show: false,
          },
        },
      }} series={[{
        name: props.selectedSensor?.param.paramCode,
        data
      }]} type="area" height={320} width={1000}/>
    </div>
  )
}