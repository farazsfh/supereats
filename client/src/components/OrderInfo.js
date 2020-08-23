import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { quickScore } from "quick-score";
import classNames from "classnames";
import Transcription from "./Transcription";
import DefaultMap from "./AzureMarker.js";

function OrderInfo(props) {
	const [order, setOrder] = useState([{}]);
	const [succItems, setsuccItems] = useState([]);
	const [unsuccItems, setUnsuccItems] = useState([]);
	const [changes, setChanges] = useState([{}]);
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
						var currsuccItems = [];
						var currUnsuccItems = [];
						var currChanges = [];
						var currPrice = 0;
						var found = false;
						for (var i = 0; i < orderres.data.items.length; i++) {
							found = false;
							for (var j = 0; j < invres.data.length; j++) {
								if (
									quickScore(
										invres.data[j].product,
										orderres.data.items[i].product
									) > 0.8
								) {
									if (orderres.data.items[i].quantity <= invres.data[j].stock) {
										currPrice =
											currPrice +
											invres.data[j].price * orderres.data.items[i].quantity;
										currsuccItems.push(orderres.data.items[i]);
										found = true;
										currChanges.push({
											id: invres.data[j]._id,
											stock:
												invres.data[j].stock - orderres.data.items[i].quantity,
											amountSold:
												invres.data[j].amountSold +
												orderres.data.items[i].quantity,
										});
										break;
									}
								}
							}
							if (found == false) {
								currUnsuccItems.push(orderres.data.items[i]);
							}
						}
						setPrice(currPrice);
						setsuccItems(currsuccItems);
						setUnsuccItems(currUnsuccItems);
						setChanges(currChanges);
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
			<div className="upMargin">
				<h1
					className="header-with-desc"
					style={{ textTransform: "capitalize" }}
				>
					Order: {order.name}
				</h1>
				<p style={{ textTransform: "capitalize" }}>{order.address}</p>
				<Transcription order={order} />
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>Product</th>
							<th>Quantity</th>
							<th>Weight</th>
							<th>Form</th>
						</tr>
					</thead>
					<tbody style={{ textTransform: "capitalize" }}>
						{/* {order.items == undefined
							? ""
							: order.items.map((orderItem) => {
									return (
										<tr>
											<td>
												<span className="text-success">
													{orderItem.product}
												</span>
											</td>
											<td>{orderItem.quantity}</td>
											<td>
												{orderItem.weight == "" ? "--" : orderItem.weight}
											</td>
											<td>{orderItem.form == "" ? "--" : orderItem.form}</td>
										</tr>
									);
							  })} */}

						{order.items == undefined
							? ""
							: order.items.map((item) => {
									const success = succItems.some(
										(succItem) => succItem.product == item.product
									)
										? true
										: false;
									return (
										<tr>
											<td>
												<span
													className={
														success
															? "text-success"
															: "text-danger font-weight-bold"
													}
												>
													{item.product}
												</span>
											</td>
											<td>
												<span
													className={
														success
															? "text-success"
															: "text-danger font-weight-bold"
													}
												>
													{item.quantity}
												</span>
											</td>
											<td>
												<span
													className={
														success
															? "text-success"
															: "text-danger font-weight-bold"
													}
												>
													{item.weight == "" ? "--" : item.weight}
												</span>
											</td>
											<td>
												<span
													className={
														success
															? "text-success"
															: "text-danger font-weight-bold"
													}
												>
													{item.form == "" ? "--" : item.form}
												</span>
											</td>
										</tr>
									);
							  })}
					</tbody>
				</table>

				<button
					className="btn btn-primary"
					onClick={() => {
						axios.put(`http://localhost:5000/orders/byId/${order._id}`, {
							...order,
							completed: !order.completed,
						});

						for (var i = 0; i < changes.length; i++) {
							axios
								.put(`http://localhost:5000/inventory/byId/${changes[i].id}`, {
									stock: changes[i].stock,
									amountSold: changes[i].amountSold,
								})
								.then((res) => {
									console.log(res);
								})
								.catch((error) => {
									console.log(error);
								});
						}

						history.goBack();
					}}
				>
					{order.completed == true ? "Unarchive" : "Archive"}
				</button>
			</div>
			<h2 className="mt-3">Total: ${price.toFixed(2)}</h2>
			<DefaultMap />
			<br />
			<br />
		</div>
	);
}

export default OrderInfo;
