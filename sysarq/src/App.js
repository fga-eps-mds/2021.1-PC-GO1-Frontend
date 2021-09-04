import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar, Container, Nav } from "react-bootstrap";

import Home from "./pages/Home";
import FieldsRegister from "./pages/FieldsRegister/FieldsRegister";
import DocumentSubject from "./pages/FieldsRegister/DocumentSubject";
import BoxAbbreviation from "./pages/FieldsRegister/BoxAbbreviation";
import PublicWorker from "./pages/FieldsRegister/PublicWorker";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";


function App() {
	return (
		<Router>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Nav className="me-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/fields-register">Cadastro de Campos</Nav.Link>
					</Nav>
				</Container>
			</Navbar>

			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/fields-register">
					<Route exact path="/fields-register">
						<FieldsRegister />
					</Route>
					<Route path="/fields-register/document-subject">
						<DocumentSubject />
					</Route>
					<Route path="/fields-register/box-abbreviation">
						<BoxAbbreviation />
					</Route>
					<Route path="/fields-register/public-worker">
						<PublicWorker />
					</Route>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
