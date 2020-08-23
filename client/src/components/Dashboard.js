import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import BarChart from "./DashboardComponents/BarChart";
import OrdersDate from "./DashboardComponents/OrdersDate";
import OrdersCard from "./DashboardComponents/OrdersCard";
import { Text } from "evergreen-ui";
import styled from "styled-components";
import LowStockList from "./DashboardComponents/LowStockList";

import BubbleMap from "./BubbleMap";

const axios = require("axios");

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

function createData(name, adress, quantity, item) {
	return { name, adress, quantity, item };
}

const rows = [
	createData("Alex", "Coffee town", 6.0, "coffees"),
	createData("Rhytm", "Quack quack city", 9.0, "quackers"),
	createData("Alif", "Wonderland", 16.0, "Alices and one Snowman"),
	createData("Faraz", "44 jane street toronto ontario", 5, "dozen eggs"),
];

export const Grid = styled.div``;
export const Row = styled.div`
	display: flex;
`;
export const Col = styled.div`
	flex: ${(props) => props.size};
`;
const Dashboard = () => {
	const classes = useStyles();
	const [orders, setOrders] = useState([
		{ name: "Default", address: "1232 Test Drive", items: [] },
	]);
	const [commandDates, setCommandDates] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/orders/")
			.then((res) => {
				console.log(res.data);
				setOrders(res.data);
				return res.data;
			})
			.catch((error) => {
				console.log(error);
			})
			.then((result) => {
				console.log(result);
			});
	}, []);
	// return (
	//     <TableContainer component={Paper}>
	//         <Table className={classes.table} aria-label="simple table">
	//             <TableHead>
	//                 <TableRow>
	//                     <TableCell align="right">Name&nbsp;</TableCell>
	//                     <TableCell align="right">Adress&nbsp;(g)</TableCell>
	//                     <TableCell align="right">Units&nbsp;(g)</TableCell>
	//                     <TableCell align="right">Item&nbsp;(g)</TableCell>
	//                 </TableRow>
	//             </TableHead>
	//             <TableBody>
	//                 {rows.map((row) => (
	//                     <TableRow key={row.name}>
	//                         <TableCell component="th" scope="row">
	//                             {row.name}
	//                         </TableCell>
	//                         <TableCell align="right">{row.adress}</TableCell>
	//                         <TableCell align="right">{row.quantity}</TableCell>
	//                         <TableCell align="right">{row.item}</TableCell>
	//                     </TableRow>
	//                 ))}
	//             </TableBody>
	//         </Table>
	//     </TableContainer>
	// );
	return (
		<div className="container">
			<Grid>
				<Row>
					<Col size={1}>
						<br></br>
						<br></br>
						{/* <Text fontWeight={800} fontSize={100} display={'inline-block'} float={'left'}>
                            Dashboard
                        </Text> */}
						<h1>Dashboard</h1>
						<BubbleMap />
					</Col>
				</Row>
				<Row>
					<br></br>
					<br></br>
				</Row>
				<Row>
					<Col size={1}>
						{" "}
						<OrdersCard></OrdersCard>
					</Col>
					<Col size={2}>
						<OrdersDate></OrdersDate>
					</Col>
				</Row>
				<Row>
					<Col>
						<LowStockList></LowStockList>
					</Col>
				</Row>
			</Grid>
		</div>
	);
};

export default Dashboard;
