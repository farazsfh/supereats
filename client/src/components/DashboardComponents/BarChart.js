import React, { Component, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

class BarChart extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.getChartData();
    }

    getChartData() {
        this.setState({
            chartData: {
                labels: ['Alex', 'Faraz', 'Rhythm', 'Alif'],
                datasets: [
                    {
                        label: 'Power Level',
                        data: [9000, 3000, 4000, 11000],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                        ],
                        borderWidth: 1,
                        borderColor: '#777',
                        hoverBorderWidth: 3,
                        hoverBorderColor: '#000',
                    },
                ],
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
            },
        });
    }

    render() {
        return (
            <div
                className="chart"
                style={{
                    width: '100%',
                }}

                // style={{
                //     position: 'relative',
                //     width: '1200px',
                //     height: '500px',
                //     margin: 'none',
                //     display: 'inline-block',
                //     float: 'right',
                // }}
            >
                <Bar
                    margin={24}
                    width="600"
                    height="400"
                    data={this.state.chartData}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
        );
    }
}

export default BarChart;
