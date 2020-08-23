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
			<div style={{ textTransform: "capitalize" }} className="upMargin">
				<h1 className="header-with-desc">Order: {order.name}</h1>
				<p>{order.address}</p>
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>Product</th>
							<th>Quantity</th>
							<th>Weight</th>
							<th>Form</th>
						</tr>
					</thead>
					<tbody>
						{order.items == undefined
							? ""
							: order.items.map((orderItem) => (
									<tr>
										<td>{orderItem.product}</td>
										<td>{orderItem.quantity}</td>
										<td>{orderItem.weight == "" ? "--" : orderItem.weight}</td>
										<td>{orderItem.form == "" ? "--" : orderItem.form}</td>
									</tr>
							  ))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default OrderInfo;
