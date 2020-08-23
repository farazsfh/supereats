import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Column } from "antd";

function Archive() {
	const [archive, setArchive] = useState([{}]);
	
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
			setArchive(res.data.filter(function(order) {return order.completed == true;}));
		})
		.catch((error) => {
			console.log(error);
		});
	  }, []);

	return (
		<div>
			<Table dataSource={archive}>
				<Table.Column title="Name" dataIndex="name" key="name" />
				<Table.Column title="Address" dataIndex="address" key="address" />
				<Table.Column
					title="Action"
					key="action"
					render={() => (
						<Button>Process</Button>
					)}
				/>
			</Table>
		</div>
	);
}

export default Archive;