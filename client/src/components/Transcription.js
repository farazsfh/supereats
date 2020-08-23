import React, { useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Switch } from "antd";

function Transcription({ order }) {
	const [keywords, setKeywords] = useState([]);

	useEffect(() => {
		console.log("Something changed...");
	}, [keywords]);

	const customerInfo = [];
	customerInfo.push(order.name);
	customerInfo.push(order.address);

	const productInfo = [];
	const quantityInfo = [];
	if (order.items !== undefined) {
		order.items.forEach((item) => {
			productInfo.push(item.product);
			quantityInfo.push(item.quantity.toString());
		});
	}

	console.log(order);

	function onCustomerChange(checked) {
		if (checked) {
			setKeywords([...keywords, ...customerInfo]);
		} else {
			setKeywords(keywords.filter((el) => !customerInfo.includes(el)));
		}
	}

	function onProductChange(checked) {
		if (checked) {
			setKeywords([...keywords, ...productInfo]);
		} else {
			setKeywords(keywords.filter((el) => !productInfo.includes(el)));
		}
	}

	function onQuantityChange(checked) {
		if (checked) {
			setKeywords([...keywords, ...quantityInfo]);
		} else {
			setKeywords(keywords.filter((el) => !quantityInfo.includes(el)));
		}
	}

	return (
		<div class="card my-3">
			<div class="card-body">
				<Highlighter
					highlightClassName="myHighlight"
					searchWords={keywords}
					autoEscape={true}
					textToHighlight={order.transcription}
				/>
				<br />
				<form action="" className="form-inline">
					<div class="input-group mb-2 mr-sm-2">
						<p style={{fontFamily: "sans-serif"}}>Customer: </p>
						<br />
						<Switch
							className="mt-2 mr-2"
							defaultChecked={false}
							onChange={onCustomerChange}
						/>
					</div>
					<div class="input-group mb-2 mr-sm-2">
						<p style={{fontFamily: "sans-serif"}}>Product: </p>
						<br />
						<Switch
							className="mt-2 mr-2"
							defaultChecked={false}
							onChange={onProductChange}
						/>
					</div>
					<div class="input-group mb-2 mr-sm-2">
						<p style={{fontFamily: "sans-serif"}}>Quantity: </p>
						<br />
						<Switch
							className="mt-2 mr-2"
							defaultChecked={false}
							onChange={onQuantityChange}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Transcription;
