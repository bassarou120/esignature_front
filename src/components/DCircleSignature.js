import React from "react";
import ReactDOM from 'react-dom';
import ReactApexChart from "react-apexcharts";


const Decompte = (props) => {

    let data = {
        series:[{
            data : [props.serie],
            fontSize: '10px'
        }] ,
        options: {
            chart: {
                height: 110,
                type: "radialBar"
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: props.size
                    }
                }
            },
            dataLabels: {
                enabled: true,

            },
            noData: {
                text: '0',
                align: 'center',
                style: {
                    color: undefined,
                    fontSize: '10px',
                    fontFamily: undefined
                }
            },
            labels: props.label,
            tooltip: {
                enabled: true,
                shared: true,
                followCursor: false,
                intersect: false,
                inverseOrder: false,
                custom:  function({series, seriesIndex, dataPointIndex, w}) {
                    return '<div class="arrow_box">' +
                        '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
                        '</div>'
                },
                onDatasetHover: {
                    highlightDataSeries: false,
                },
                x: {
                    show: true,
                    format: 'dd MMM',
                    formatter: 'text',
                },
                y: {
                    formatter: 'text',
                    title: {
                        formatter: (seriesName) => seriesName,
                    },
                },
                marker: {
                    show: true,
                },
                items: {
                    display: 'flex',
                },
                fixed: {
                    enabled: true,
                    position: 'topRight',
                    offsetX: 0,
                    offsetY: 0,
                },
            }
        }
    };

    return (
        <div className="App">
            <div id="chart">
                <ReactApexChart
                    options={data.options}
                    series={data.series[0].data}
                    type="radialBar"
                    height={100}
                />
            </div>
        </div>
    );
}

export default Decompte;


