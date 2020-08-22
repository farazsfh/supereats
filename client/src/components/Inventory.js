import React, { useEffect } from "react";
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function Inventory() {
	useEffect(() => {
		axios.get("http://localhost:5000/inventory/")
		.then((res) => {
			console.log(res);
		})
		.catch((error) => {
			console.log(error);
		});
	  }, []);
	
	return (
		<div>
			<Table />;
		</div>
	);
}

export default Inventory;
