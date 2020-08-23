import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {quickScore} from "quick-score";

function OrderInfo(props) {
	const [order, setOrder] = useState([{}]);
	const [successfulOrders, setSuccessfulOrders] = useState([]);
	const [unsuccessfulOrders, setUnsuccessfulOrders] = useState([]);
	const [inventory, setInventory] = useState([{}]);
	const [price, setPrice] = useState(0);
	const history = useHistory();

	useEffect(() => {
		axios
			.get("http://localhost:5000/orders/byId/".concat(props.match.params.id))
			.then((orderres) => {
				setOrder(orderres.data);

				axios
				.get("http://localhost:5000/inventory/")
				.then((invres) => {
					setInventory(invres.data);
					var currSuccessfulOrders = [];
					var currUnsuccessfulOrders = [];
					var currPrice = 0;
					var found = false;
					for (var i = 0; i < orderres.data.items.length; i++) {
						found = false;
						for (var j = 0; j < invres.data.length; j++) {
							if (quickScore(invres.data[j].product, orderres.data.items[i].product) > 0.8) {
								currPrice = currPrice + (invres.data[j].price * orderres.data.items[i].quantity);
								currSuccessfulOrders.push(orderres.data.items[i])
								found = true;
								break;
							}
						}
						if (found == false) {
							currUnsuccessfulOrders.push(orderres.data.items[i]);
						}
					}
					setPrice(currPrice);
					setSuccessfulOrders(currSuccessfulOrders);
					setUnsuccessfulOrders(currUnsuccessfulOrders);
				})
				.catch((error) => {
					console.log(error);
				});
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

				<button
					className="btn btn-primary"
					onClick={() => {
						axios.put(`http://localhost:5000/orders/byId/${order._id}`, {
							...order,
							completed: !order.completed,
						});
						history.goBack();
					}}
				>
					{order.completed == true ? "Unarchive" : "Archive"}
				</button>
			</div>
			<h1>${price.toFixed(2)}</h1>
		</div>
	);
}

export default OrderInfo;
