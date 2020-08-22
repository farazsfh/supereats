import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Column } from "antd";

function ProcessOrder(props) {

    const [order, setOrder] = useState({});
    const [items, setItems] = useState([{}]);

    useEffect(() => {
		axios.get("http://localhost:5000/orders/byId/".concat(props.match.params.id))
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
		<div>
            <h1>{order.name}'s Order</h1>
            <h2>{order.address}</h2>
            <Table dataSource={items}>
				<Table.Column title="Quantity" dataIndex="quantity" key="quantity" />
				<Table.Column title="Product" dataIndex="product" key="product" />
			</Table>
		</div>
	);
}

export default ProcessOrder;