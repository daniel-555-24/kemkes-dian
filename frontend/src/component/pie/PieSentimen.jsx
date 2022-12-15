import React from 'react';
import { Paper } from '@material-ui/core';
import Chart from 'react-apexcharts';




export default function PieSentimen(props) {

    // const [series, setSeries] = React.useState([]);
    const [options, setOptions] = React.useState({
        chart: {
          width: 500,
          type: 'pie',
          stacked: true,
          zoom: {
            enabled: false
          },
        //   toolbar: {
        //     show: true,
        // },
        },
        dataLabels: {
          // enabled: true,
          formatter: function (val, opts) {
            return opts.w.config.series[opts.seriesIndex]
        },
          style: {
            fontSize:'20px',
            fontFamily:'Roboto',
            colors: ['white','white','white']
          },
          // offsetX: 30
        },
        legend: {
          show: false,
          markers: {
            fillColors: ['#00B9AE', '#FDFED6','#FDFED6' ]
          }, 
          position: 'bottom',
        },
        tooltip: {
          show:false,
          fillSeriesColor: false,
          marker: {
            show: false,
          },
        },
        // stroke: {
        //   colors: ['#666']
        // },
        fill: {
          colors: ['#00B9AE', '#D2E634','#FDFED6']
        },
        labels: ['Positif', 'Netral', 'Negatif'],
      });

    return(
      <>
        {/* {console.log(props)} */}
        <Chart 
            component={Paper} 
            options={options} 
            series={[props.positif, props.netral, props.negatif]} 
            // series={[25, 50, 25]} 
            type="pie" 
            width={530} 
            height={300}
            />
      </>
    )
}