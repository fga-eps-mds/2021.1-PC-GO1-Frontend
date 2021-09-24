import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./pages/components/Header";
import Footer from "./pages/components/Footer";

import "./App.css";

import Documents from "./pages/Documents";
import CreateAdministrativeProcess from "./pages/Documents/Create/CreateAdministrativeProcess";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<Router>
			<Header />
			<Switch>
				<Route path="/documents">
					<Route exact path="/documents">
						<Documents />
					</Route>
				</Route>
				<Route path="/create-administrative-process">
					<CreateAdministrativeProcess />
				</Route>
<<<<<<< HEAD
=======
					
					
				<Route path="/create-box-abbreviation">
					<CreateBoxAbbreviation />
				</Route>
				<Route path="/create-document-subject">
					<CreateDocumentSubject />
				</Route>
				<Route path="/create-document-type">
					<CreateDocumentType />
				</Route>
				<Route path="/create-public-worker">
					<CreatePublicWorker />
				</Route>
				<Route path="/create-shelf">
					<CreateShelf />
				</Route>
				<Route path="/create-status">
					<CreateStatus />
				</Route>
				<Route path="/create-unity">
					<CreateUnity />
				</Route>
				
>>>>>>> d24ba7e... Foi criado esboço do front do cadastro de documentos, falta atualizar os atributos com as mudanças do back-end alem de estilizar os cards e as pages de cadatros de acordo com o prototipo de alta fidelidade
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
