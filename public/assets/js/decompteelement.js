const radialBarChartEl = document.querySelector('#radialBarChart');
const radialBarChartConfig = {
    chart: {
        height: 380,
        type: 'radialBar'
    },
    colors: ['#fee802', '#3fd0bd', '#2b9bf4'],
    plotOptions: {
        radialBar: {
            size: 185,
            hollow: {
                size: '40%'
            },
            track: {
                margin: 10
            },
            dataLabels: {
                name: {
                    fontSize: '2rem',
                    fontFamily: 'Open Sans'
                },
                value: {
                    fontSize: '1rem',
                    fontFamily: 'Open Sans'
                },
                total: {
                    show: true,
                    fontSize: '1.3rem',
                    label: 'Comments',
                    formatter: function(w) {
                        return '80%';
                    }
                }
            }
        }
    },
    grid: {
        padding: {
            top: -25,
            bottom: -20
        }
    },
    legend: {
        show: true,
        position: 'bottom'
    },
    stroke: {
        lineCap: 'round'
    },
    series: [80, 50, 35],
    labels: ['Comments', 'Replies', 'Shares']
};
if (typeof radialBarChartEl !== undefined && radialBarChartEl !== null) {
    const radialChart = new ApexCharts(radialBarChartEl, radialBarChartConfig);
    radialChart.render();
}
