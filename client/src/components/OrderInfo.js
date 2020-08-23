import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Column } from "antd";

function OrderInfo(props) {
	const [order, setOrder] = useState({});
	const [items, setItems] = useState([{}]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/orders/byId/".concat(props.match.params.id))
			.then((res) => {
				setOrder(res.data);
				setItems(res.data.items);
				console.log(res.data.items);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="container">
			<div style={{ textTransform: "capitalize" }} className="orderTable">
				<h1>{order.name}'s Order</h1>
				<h2>{order.address}</h2>
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>Product</th>
							<th>Quantity</th>
						</tr>
					</thead>
					<tbody>
						{order.items == undefined
							? ""
							: order.items.map((orderItem) => (
									<tr>
										<td>{orderItem.product}</td>
										<td>{orderItem.quantity}</td>
									</tr>
							  ))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default OrderInfo;
