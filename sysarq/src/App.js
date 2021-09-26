import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./pages/components/Header";
import Home from "./pages/Home";
import Footer from "./pages/components/Footer";

import FieldsRegister from "./pages/FieldsRegister/FieldsRegister";
import DocumentSubject from "./pages/FieldsRegister/DocumentSubject";
import BoxAbbreviation from "./pages/FieldsRegister/BoxAbbreviation";
import DocumentType from "./pages/FieldsRegister/DocumentType";
import Unity from "./pages/FieldsRegister/Unity";
import Shelf from "./pages/FieldsRegister/Shelf";
import Status from "./pages/FieldsRegister/Status";
import CreateDocumentSubject from "./pages/FieldsRegister/CreateDocumentSubject";
import CreateStatus from "./pages/FieldsRegister/CreateStatus";
import CreateBoxAbbreviation from "./pages/FieldsRegister/CreateBoxAbbreviation";
import CreateDocumentType from "./pages/FieldsRegister/CreateDocumentType";
import CreateUnity from "./pages/FieldsRegister/CreateUnity";
import CreateShelf from "./pages/FieldsRegister/CreateShelf";
import AdministrativeProcess from "./pages/DocumentsRegister/AdministrativeProcess";
import PublicWorker from "./pages/FieldsRegister/PublicWorker";
import CreatePublicWorker from "./pages/FieldsRegister/CreatePublicWorker";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import DocumentsRegister from "./pages/DocumentsRegister/DocumentsRegister";
import CreateAdministrativeProcess from "./pages/DocumentsRegister/CreateAdministrativeProcess";
import CreateFrequencyRelation from "./pages/DocumentsRegister/CreateFrequencyRelation";
import FrequencyRelation from "./pages/DocumentsRegister/FrequencyRelation";
import FrequencyDocument from "./pages/DocumentsRegister/FrequencyDocument";
import CreateFrequencyDocument from "./pages/DocumentsRegister/CreateFrequencyDocument";
import CreateArchivingRelation from "./pages/DocumentsRegister/CreateArchivingRelation";
import ArchivingRelation from "./pages/DocumentsRegister/ArchivingRelation";



function App() {
	  
	return (
		<Router>
			<Header />
			<Switch>

				<Route exact path="/">
					<Home />
				</Route>
				
				<Route path="/documents-register">
					<Route exact path="/documents-register">
						<DocumentsRegister/>
					</Route>
					<Route path="/documents-register/administrative-process">
						<AdministrativeProcess/>
					</Route>
					<Route path="/documents-register/frequency-relation">
						<FrequencyRelation/>
					</Route>
					<Route path="/documents-register/frequency-document">
						<FrequencyDocument/>
					</Route>
					<Route path="/documents-register/archiving-relation">
						<ArchivingRelation/>
					</Route>
				</Route>
				<Route path="/create-archiving-relation">
					<CreateArchivingRelation/>
				</Route>
				<Route path="/create-frequency-document">
					<CreateFrequencyDocument/>
				</Route>
				<Route path="/create-frequency-relation">
					<CreateFrequencyRelation/>
				</Route>
				<Route path="/create-administrative-process">
					<CreateAdministrativeProcess/>
				</Route>


				<Route path="/fields-register">
					<Route exact path="/fields-register">
						<FieldsRegister />
					</Route>
					<Route path="/fields-register/document-subject">
						<Route exact path="/fields-register/document-subject">
							<DocumentSubject />
						</Route>
						<Route path="/fields-register/document-subject/create">
							<CreateDocumentSubject />
						</Route>
					</Route>
					<Route path="/fields-register/box-abbreviation">
						<Route exact path="/fields-register/box-abbreviation">
							<BoxAbbreviation />
						</Route>
						<Route path="/fields-register/box-abbreviation/create">
							<CreateBoxAbbreviation />
						</Route>
					</Route>
					<Route path="/fields-register/unity">
						<Route exact path="/fields-register/unity">
							<Unity />
						</Route>
						<Route path="/fields-register/unity/create">
							<CreateUnity />
						</Route>
					</Route>
					<Route path="/fields-register/document-type">
						<Route exact path="/fields-register/document-type">
							<DocumentType />
						</Route>
						<Route path="/fields-register/document-type/create">
							<CreateDocumentType />
						</Route>
					</Route>
					<Route path="/fields-register/shelf">
						<Route exact path="/fields-register/shelf">
							<Shelf />
						</Route>
						<Route path="/fields-register/shelf/create">
							<CreateShelf />
						</Route>
					</Route>
					<Route path="/fields-register/status">
						<Route exact path="/fields-register/status">
							<Status />
						</Route>
						<Route path="/fields-register/status/create">
							<CreateStatus />
						</Route>
					</Route>
					<Route path="/fields-register/public-worker">
						<Route exact path="/fields-register/public-worker">
							<PublicWorker />
						</Route>
						<Route path="/fields-register/public-worker/create">
							<CreatePublicWorker/>
						</Route>
					</Route>
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
			<Footer/>
		</Router>
	);
}

export default App;
