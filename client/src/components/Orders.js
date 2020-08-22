import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
	const [orders, setOrders] = useState([{name: "Default", address: "1232 Test Drive"}]);
	
	useEffect(() => {
		axios.get("http://localhost:5000/orders/")
		.then((res) => {
			setOrders(res.data);
		})
		.catch((error) => {
			console.log(error);
		});
	  }, []);

	return (
		<div>
			{orders.map(function(order, index){
                    return <h1>{order.address}</h1>;
            })}
		</div>
	);
}

export default Orders;
