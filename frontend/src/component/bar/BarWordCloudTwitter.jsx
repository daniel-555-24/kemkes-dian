import React from 'react';
import Chart from 'react-apexcharts'

class BarWordCloud extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {}
      }
      render() {
        return (
                <Chart 
                  series={ [{
                    data: this.props.value
                    // data: [44, 55, 41, 70, 80]
                  }]} 

                  options={{
                    chart: {
                      type: 'bar',
                      toolbar: {
                            show: false,
                        },
                    },
                    plotOptions: {
                      bar: {
                        barHeight: '100%',
                        distributed: true,
                        horizontal: true,
                        dataLabels: {
                          position: 'bottom'
                        },
                      }
                    },
                    // colors: [this.props.sentiment==="Positive"?'#D2DC2E':this.props.sentiment==="Negative"?'#E1848A':'#3A7BD5'],
                    colors: ['#007871', '#00B9AE', '#34C7BD', '#7CDDDD', '#CAF2EF'],
                    dataLabels: {
                      enabled: true,
                      textAnchor: 'start',
                      style: {
                        colors: ['#fff']
                      },
                      formatter: function (val, opt) {
                        return opt.w.globals.labels[opt.dataPointIndex] 
                        // + ":  " + val
                      },
                      offsetX: 0,
                      dropShadow: {
                        enabled: true
                      }
                    },
                    stroke: {
                      width: 1,
                      colors: ['#fff']
                    },
                    xaxis: {
                      labels: {
                        show: false
                      },
                      categories:  
                      this.props.text
                      // ['vaksin', 'vaksinasi', 'positif', 'pasien', 'baik'],
                    },
                    yaxis: {
                      labels: {
                        show: false
                      }
                    },
                    legend: {
                      show: false
                    },
                    // title: {
                    //     text: 'Custom DataLabels',
                    //     align: 'center',
                    //     floating: true
                    // },
                    // subtitle: {
                    //     text: 'Category Names as DataLabels inside bars',
                    //     align: 'center',
                    // },
                    tooltip: {
                      theme: 'dark',
                      x: {
                        show: false
                      },
                      y: {
                        title: {
                          formatter: function () {
                            return ''
                          }
                        }
                      },
                      // enabled: false,
                      // enabledOnSeries: undefined,
                      // marker: {
                      //   show: false,
                      // }
                    }
                  }} 
                  type="bar"
                  height={400} 
                  width={250}
                  />
        )
      }
  }

  export default BarWordCloud;