import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Position } from 'evergreen-ui';

class LineChart extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.getChartData();
    }

    getChartData() {
        this.setState({
            chartData: {
                labels: ['january', 'february', 'march', 'april', 'may', 'june', 'july'],
                datasets: [
                    {
                        label: 'Hello',
                        data: [
                            {
                                t: new Date('2015-3-15 13:3'),
                                y: 12,
                            },
                            {
                                t: new Date('2015-3-25 13:2'),
                                y: 21,
                            },
                            {
                                t: new Date('2015-4-25 14:12'),
                                y: 32,
                            },
                        ],
                    },
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
            options: {
                title: {
                    display: true,
                    text: 'Largest Cities In Massachusetts',
                    fontSize: 25,
                },
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: '#000',
                    },
                },
                layout: {
                    padding: {
                        left: 50,
                        right: 0,
                        bottom: 0,
                        top: 0,
                    },
                },
                tooltips: {
                    enabled: true,
                },
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                        },
                    ],
                },
            },
        });
    }

    render() {
        return (
            <div className="chart">
                <Line
                    position={'absolute'}
                    bottom={0}
                    height={400}
                    data={this.state.chartData}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
        );
    }
}

export default LineChart;
