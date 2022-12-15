import React from "react";
import ReactApexChart from "react-apexcharts";

class BarSummaryVertical extends React.Component {
    constructor(props) {
      super(props);
      console.log(props.issue)
      this.state = {
        options: {
          chart: {
            type: 'bar',
            height: 200,
            stacked: true,
            zoom: {
                enabled: false
              },
              toolbar: {
                show: false,
            },
          },
          plotOptions: {
            bar: {
              // barHeight: '100%',
              borderRadius: 10,
              distributed: false,
              horizontal: true,
              dataLabels: {
                position: 'bottom'
              },
            }
          },
          colors: ['#D2DC2E', '#E0E0E0','#BE0712'],
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: 0,
            colors: ['#fff']
          },
          xaxis: {
            categories:this.props.issue,
            tooltip: {
                enabled: false
              },
          },
        //   title: {
        //     text: 'Summary',
        //     align: 'left',
        //     margin : 20,
        //     style: {
        //       fontSize:  '16px',
        //       fontWeight:  'bold',
        //     },
        //   },
          yaxis: {
            // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
              text: undefined
            },
          },
          legend: {
            show: true,
            markers: {
              fillColors: ['#D2DC2E', '#E0E0E0','#BE0712' ]
            }, 
            position: 'bottom',
          },
          // tooltip: {
          //   enabled: false
          // }, 
          grid: {
            show: false,
          },
          fill: {
            opacity: 1
          },
        },
      
      
      };
    }

  

    render() {
      return (
        

  <div id="chart">
    <ReactApexChart 
            options={this.state.options} 
            series={[{
                  name: 'Positif',
                  data : this.props.positif
                }, {
                  name: 'Netral',
                  data : this.props.netral
                }, {
                  name: 'Negatif',
                  data : this.props.negatif
                }]} 
            type="bar" height={280} width={1100}/>
</div>
      )}}

export default BarSummaryVertical;