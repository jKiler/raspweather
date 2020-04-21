import React, {useEffect} from "react";
import ReactApexChart from 'react-apexcharts'
import {useSensorChart} from "./sensor-chart.hooks";
import Sensor from "../../models/sensor.model";

export interface SensorChartProps {
  selectedSensor: Sensor | null,
  onInitialized?: () => void;
  style?: React.CSSProperties;
}

const SensorChart = (props: SensorChartProps): JSX.Element => {
  const {selectedSensor, onInitialized, style} = props
  const {categories, data} = useSensorChart(selectedSensor)

  useEffect(() => {
    if (onInitialized && selectedSensor) {
      onInitialized()
    }
  }, [onInitialized, selectedSensor])

  return (
    <div style={style}>
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
          tooltip: {
            enabled: false,
          },
          categories
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
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

export default SensorChart;