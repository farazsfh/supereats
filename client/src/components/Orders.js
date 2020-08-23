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
<<<<<<< HEAD
		<div>
			{orders.forEach((order) => {
				console.log(order);
			})}
			<table class="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Address</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr>
							<td>{order.name}</td>
							<td>{order.address}</td>
							<Link to={`/processOrder/${order._id}`}>
								<button type="button" class="btn btn-primary">
									Process
								</button>
							</Link>
						</tr>
					))}
				</tbody>
			</table>
=======
		<div style={{textTransform: "capitalize"}}>
			<Table dataSource={orders}>
				<Table.Column title="Name" dataIndex="name" key="name" />
				<Table.Column title="Address" dataIndex="address" key="address" />
				<Table.Column
					title="Action"
					key="action"
					render={() => (
						<Button style={{color: "white", background: "#29c25b", borderColor: "#3fe687"}} onClick={() => {process()}}>Process</Button>
					)}
				/>
			</Table>
>>>>>>> 00dbbb0bd4456ada5cd8f73b03084634a02e7977
		</div>
	);
}

export default Orders;
