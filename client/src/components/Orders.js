import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Column } from "antd";

function Orders() {
	const [orders, setOrders] = useState([{}]);
	
	const columns = [
		{
		  title: 'Name',
		  dataIndex: 'name',
		  key: 'name',
		},
		{
		  title: 'Address',
		  dataIndex: 'address',
		  key: 'address',
		}
	  ];

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
			<Table dataSource={orders}>
				<Table.Column title="Name" dataIndex="name" key="name" />
				<Table.Column title="Address" dataIndex="address" key="address" />
				<Table.Column
					title="Action"
					key="action"
					render={() => (
						<Button onClick={() => {process()}}>Process</Button>
					)}
				/>
			</Table>
		</div>
	);
}

export default Orders;
