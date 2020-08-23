import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Column } from "antd";
import { Link } from "react-router-dom";

function Orders() {
	const [orders, setOrders] = useState([{}]);

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address",
		},
	];

	useEffect(() => {
		axios
			.get("http://localhost:5000/orders/")
			.then((res) => {
				setOrders(
					res.data.filter(function (order) {
						return order.completed == false;
					})
				);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div class="upMargin">
			<div class="container mt-10">
				<h1>Orders</h1>
				{orders.forEach((order) => {
					console.log(order);
				})}
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>Name</th>
							<th>Address</th>
							<th>Items</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody style={{textTransform: "capitalize"}}>
						{orders.map((order) => (
							<tr>
								<td>{order.name}</td>
								<td>{order.address}</td>
								<td>{order.items == undefined ? "" : order.items.length}</td>
								<td>
									<Link to={`/orderInfo/${order._id}`}>
										<button type="button" class="btn btn-primary">
											Process
										</button>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Orders;
