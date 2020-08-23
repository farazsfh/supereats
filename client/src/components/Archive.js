import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Column } from "antd";
import { Link } from "react-router-dom";

function Archive() {
	const [archive, setArchive] = useState([{}]);

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
				setArchive(
					res.data.filter(function (order) {
						return order.completed == true;
					})
				);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="upMargin">
			<div class="container">
				<h1>Archive</h1>
				{archive.forEach((order) => {
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
					<tbody>
						{archive.map((order) => (
							<tr>
								<td>{order.name}</td>
								<td>{order.address}</td>
								<td>{order.items == undefined ? "" : order.items.length}</td>
								<td>
									<Link to={`/orderInfo/${order._id}`}>
										<button type="button" class="btn btn-primary">
											View
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

export default Archive;
