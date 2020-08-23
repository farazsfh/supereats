import ReactDom from "react-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

function Inventory() {
	const [inventory, setInventory] = useState([{}]);
	const [product, setProduct] = useState("");
	const [stock, setStock] = useState(0);
	const [amountSold, setAmountSold] = useState(0);
	const [price, setPrice] = useState(0);

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

	function handleSubmit(e) {
		console.log(product, stock, amountSold, price);
		axios.post("http://localhost:5000/inventory/", {
			product,
			stock,
			amountSold,
			price,
		});
	}

	return (
		<div className="inventoryTable">
			<div className="container upMargin">
				<h1>Inventory</h1>
				<div class="row justify-content-center">
					<form className="form-inline todo-form" onSubmit={handleSubmit}>
						<TextField
							label="Product"
							type="text"
							name="task"
							value={product}
							onInput={(e) => setProduct(e.target.value)}
						/>
						<label for="quantity">Stock: </label>
						<input
							type="number"
							id="quantity"
							name="quantity"
							min="0"
							max="1000"
							className="form-control mx-3"
							onInput={(e) => setStock(e.target.value)}
							value={stock}
						></input>
						<label for="quantity">Sold: </label>
						<input
							type="number"
							id="quantity"
							name="quantity"
							min="0"
							max="1000"
							className="form-control mx-3"
							onInput={(e) => setAmountSold(e.target.value)}
							value={amountSold}
						></input>
						<label for="quantity">Price:</label>
						<input
							type="number"
							step="0.01"
							className="form-control mx-3"
							onInput={(e) => setPrice(e.target.value)}
							value={price}
						></input>
						<button type="submit" class="btn btn-primary">
							Submit
						</button>
					</form>
				</div>
			</div>

			<div class="container upMargin">
				{inventory.forEach((inventory) => {
					console.log(inventory);
				})}
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>Product</th>
							<th>Price ($)</th>
							<th>Amount Sold</th>
							<th>Stock</th>
							{/* <th>Action</th> */}
						</tr>
					</thead>
					<tbody style={{textTransform: "capitalize"}}>
						{inventory.map((inventoryItem) => (
							<tr>
								<td>{inventoryItem.product}</td>
								<td>{inventoryItem.price}</td>
								<td>{inventoryItem.amountSold}</td>
								<td>{inventoryItem.stock}</td>
								{/* <td>
									<Link to={`/orderInfo/${inventoryItem._id}`}>
										<button type="button" class="btn btn-primary">
											Update
										</button>
									</Link>
								</td> */}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Inventory;
