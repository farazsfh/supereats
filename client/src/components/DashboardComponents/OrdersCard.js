import React, { Component } from 'react';
import CountUp from 'react-countup';
import { Card, Box } from '@material-ui/core';
import { Pane, Text } from 'evergreen-ui';
const axios = require('axios');

class OrdersCard extends Component {
    orders = 0;
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        axios
            .get('http://localhost:5000/orders/')
            .then((res) => {
                console.log(res.data.length);
                this.orders = res.data.length;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div style={{paddingRight: "15px"}}>
                <br />
                <Pane
                    elevation={1}
                    float="left"
                    width={450}
                    height={350}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    <h2>Total Orders</h2>
                    <br></br>
                    <CountUp
                        start={-875}
                        end={this.orders}
                        duration={2.75}
                        separator=" "
                        decimals={0}
                        decimal=","
                        suffix=" orders!"
                        onEnd={() => console.log('Ended! 👏')}
                        onStart={() => console.log('Started! 💨')}
                        delay={0}
                    >
                        {({ countUpRef, start }) => (
                            <div style={{fontSize: "30px"}}>
                                <span ref={countUpRef} />
                            </div>
                        )}
                    </CountUp>
                </Pane>
            </div>
        );
    }
}

export default OrdersCard;
