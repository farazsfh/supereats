import React from "react";
import "./App.css";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Nav from "./components/Nav";
import Home from "./components/Home";

function App() {
	return (
		<div className="App">
			<Nav />
			<Home />
		</div>
	);
}

export default App;
