import React from "react";

function Home() {
	return (
		<div>
			<header className="masthead text-center text-white">
				<div className="masthead-content">
					<div className="container">
						<h1 className="masthead-heading mb-0">Super Eats</h1>
						<h2 className="masthead-subheading mb-0">
							Easy grocery shopping for everyone!
						</h2>
						<a href="#learn-more" className="btn btn-primary btn-xl rounded-pill mt-5">
							Learn More
						</a>
					</div>
				</div>
				<div className="bg-circle-1 bg-circle"></div>
				<div className="bg-circle-2 bg-circle"></div>
				<div className="bg-circle-3 bg-circle"></div>
				<div className="bg-circle-4 bg-circle"></div>
			</header>

			<a id="learn-more"></a>
			<section>
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 order-lg-2">
							<div className="p-5">
								<img
									className="img-fluid"
									src={require("../assets/images/calling.svg")}
									alt=""
								/>
							</div>
						</div>
						<div className="col-lg-6 order-lg-1">
							<div className="p-5">
								<h2 className="display-4">Speech To Text</h2>
								<p>
								Using a number of useful APIs, our project is able to take the user’s input in the form of a phone call 
								and transform it to text so that our algorithms may interpret and extrapolate the user’s request. Using 
								Microsoft Azure’s speech to text service we are able to get accurate transcriptions of the primary stakeholder’s order. 
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="p-5">
								<img
									className="img-fluid"
									src={require("../assets/images/speech.svg")}
									alt=""
								/>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="p-5">
								<h2 className="display-4">Natural Language Processing</h2>
								<p>
								A very useful tool in the realm of computer science, and the heart of our project, natural language processing 
								allows us to understand the user’s needs. It is the link between spoken words and processing so to speak. As the 
								name suggests we are able to process commands given in the english language using Azure’s LUIS (Language Understanding). 
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 order-lg-2">
							<div className="p-5">
								<img
									className="img-fluid"
									src={require("../assets/images/interface.svg")}
									alt=""
								/>
							</div>
						</div>
						<div className="col-lg-6 order-lg-1">
							<div className="p-5">
								<h2 className="display-4">User-Friendly Interface</h2>
								<p>
								Super Eats was created first and foremost with the user in mind, whether that be the customer placing 
								the order, the employee who receives it or the company which it hosts. Patrons wishing to use this service 
								simply need to call the provided number and follow the prompt for quick and easy service. 
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<footer className="py-5 bg-black">
				<div className="container">
					<p className="m-0 text-center text-white small">
						Copyright &copy; Your Website 2020
					</p>
				</div>
			</footer>
		</div>
	);
}

export default Home;
