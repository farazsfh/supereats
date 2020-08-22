import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BarChart from './DashboardComponents/BarChart';
import LineChart from './DashboardComponents/LineChart';
import OrdersCard from './DashboardComponents/OrdersCard';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, adress, quantity, item) {
    return { name, adress, quantity, item };
}

const rows = [
    createData('Alex', 'Coffee town', 6.0, 'coffees'),
    createData('Rhytm', 'Quack quack city', 9.0, 'quackers'),
    createData('Alif', 'Wonderland', 16.0, 'Alices and one Snowman'),
    createData('Faraz', '44 jane street toronto ontario', 5, 'dozen eggs'),
];

const Dashboard = () => {
    const classes = useStyles();

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
        <div>
            <BarChart />
            <LineChart />
            <OrdersCard />
        </div>
    );
};

export default Dashboard;
