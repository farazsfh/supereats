import React, { Fragment } from "react";

function Nav() {
	return (
		<Fragment>
			<nav className="ml-auto navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" href="#">
					SuperEats
				</a>
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
							<a className="nav-link" href="#">
								Dashboard
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Inventory
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Orders
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Archive
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</Fragment>
	);
}

export default Nav;
