import ReactDom from "react-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

function Inventory() {
	const [inventory, setInventory] = useState([{}]);
	const [todo, setTodo] = useState({
		id: "",
		task: "",
		completed: false,
	});

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

	function handleTaskInputChange(e) {}
	function handleSubmit(e) {}

	return (
		<div className="inventoryTable">
			<div className="container upMargin">
				<h1>Inventory</h1>
				<div class="row justify-content-center">
					<form className="todo-form" onSubmit={handleSubmit}>
						<TextField
							label="Item"
							type="text"
							name="task"
							value={todo.task}
							onChange={handleTaskInputChange}
						/>
						<label for="quantity">Stock:</label>
						<input
							type="number"
							id="quantity"
							name="quantity"
							min="1"
							max="5"
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
