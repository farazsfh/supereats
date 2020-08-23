import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

function OrdersDate() {
	const [data, setData] = useState([{}]);

	useEffect(() => {
        axios
			.get("http://localhost:5000/orders/")
			.then((res) => {
                var currData = {};
                var sliced;
                for (var i = 0; i < res.data.length; i++) {
                    sliced =  res.data[i].date.slice(0, 10);
                    if (currData[sliced] == undefined) {
                        currData[sliced] = 1;
                    } else {
                        currData[sliced] += 1;
                    }
                }
                var transformedData = [];
                for (var key in currData) {
                    transformedData.push({date: key, orders: currData[key]});
                }
                console.log(transformedData);
                setData(transformedData);
            })
            .catch((error) => {
                console.log(error);
            });
	}, []);

	return (
		<div>
            <h4 style={{marginLeft: "60px"}}>Orders vs. Date</h4>
            <BarChart
                width={500}
                height={390}
                data={data}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#8884d8" />
            </BarChart>
		</div>
	);
}

export default OrdersDate;