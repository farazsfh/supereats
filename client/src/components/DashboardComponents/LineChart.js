import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

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
                        label: 'my first dataset',
                        fill: false,
                        linetension: 0.1,
                        backgroundcolor: 'rgba(75,192,192,0.4)',
                        bordercolor: 'rgba(75,192,192,1)',
                        bordercapstyle: 'butt',
                        borderdash: [],
                        borderdashoffset: 0.0,
                        borderjoinstyle: 'miter',
                        pointbordercolor: 'rgba(75,192,192,1)',
                        pointbackgroundcolor: '#fff',
                        pointborderwidth: 1,
                        pointhoverradius: 5,
                        pointhoverbackgroundcolor: 'rgba(75,192,192,1)',
                        pointhoverbordercolor: 'rgba(220,220,220,1)',
                        pointhoverborderwidth: 2,
                        pointradius: 1,
                        pointhitradius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                    },
                ],
            },
        });
    }

    render() {
        return (
            <div className="chart">
                <Line height={300} data={this.state.chartData} options={{ maintainAspectRatio: false }} />
            </div>
        );
    }
}

export default LineChart;
