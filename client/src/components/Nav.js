import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Nav() {
	return (
		<Fragment>
			<nav className="ml-auto navbar navbar-expand-lg navbar-light bg-light">
				<Link to="/" className="navbar-brand">
					SuperEats
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item active">
							<Link to="/dashboard" className="nav-link">
								Dashboard
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/inventory" className="nav-link">
								Inventory
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/orders" className="nav-link">
								Orders
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/archive" className="nav-link">
								Archive
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</Fragment>
	);
}

export default Nav;
