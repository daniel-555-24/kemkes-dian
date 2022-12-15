import React from 'react';
import { Paper } from '@material-ui/core';
import Chart from 'react-apexcharts';



export default function PieGender(props) {

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
        title: {
          text: 'Gender',
          margin : 20,
          align: 'left',
          style: {
            fontSize:  '16px',
            fontWeight:  'bold',
            color:'black',
            fontFamily:'Roboto'
          },
        },
        legend: {
          show: false,
          markers: {
            fillColors: ['#3190FF', '#EB47B3','#B1AFCD' ]
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
          colors: ['#3190FF', '#EB47B3','#B1AFCD' ]
        },
        labels: ['Laki', 'Perempuan', 'Undefined'],
      });

    return(
        <Chart 
            component={Paper} 
            options={options} 
            series={[props.laki, props.perempuan, props.unknown]} 
            // series={[25, 50, 25]} 
            type="pie" 
            width={530} 
            height={300}
            />
    )
}