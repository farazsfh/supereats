import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Inventory() {
	const [inventory, setInventory] = useState([{}]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/inventory/")
			.then((res) => {
				setInventory(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="inventoryTable">
			<div class="container">
				{inventory.forEach((inventory) => {
					console.log(inventory);
				})}
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>Product</th>
							<th>Amount Sold</th>
							<th>Stock</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{inventory.map((inventoryItem) => (
							<tr>
								<td>{inventoryItem.product}</td>
								<td>{inventoryItem.amountSold}</td>
								<td>{inventoryItem.stock}</td>
								<Link to={`/orderInfo/${inventoryItem._id}`}>
									<button type="button" class="btn btn-primary">
										Update
									</button>
								</Link>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Inventory;
