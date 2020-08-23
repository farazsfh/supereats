import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Inventory from "./components/Inventory";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Archive from "./components/Archive";
import OrderInfo from "./components/OrderInfo";
import ViewOrder from "./components/ViewOrder";

// import styled from 'styled-components';

// export const Grid = styled.div``;
// export const Row = styled.div`
//     display: flex;
// `;
// export const Col = styled.div`
//     flex: ${(props) => props.size};
// `;

function App() {
	return (
		<Router>
			<Nav />
			<Route exact path="/" component={Home} />
			<Route exact path="/dashboard" component={Dashboard} />
			<Route exact path="/inventory" component={Inventory} />
			<Route exact path="/orders" component={Orders} />
			<Route exact path="/archive" component={Archive} />
			<Route path="/orderInfo/:id" component={OrderInfo} />
		</Router>
	);
}

export default App;
