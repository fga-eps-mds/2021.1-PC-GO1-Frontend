import React, { useState, useEffect } from "react";
import FormCadastro from "../FormCadastro";
import "./Create.css";
import Api from "../../Api";

const hostApi = `${process.env.REACT_APP_URL_API}archival-relation/`;
const hostApiShelf = `${process.env.REACT_APP_URL_API}shelf/`;
const hostApiBoxAbbreviation = `${process.env.REACT_APP_URL_API}box-abbreviation/`;
const hostApiUnity = `${process.env.REACT_APP_URL_API}unity/`;
const hostApiDocumentSubject = `${process.env.REACT_APP_URL_API}document-subject/`;

export default function CreateAdministrativeProcess() {
	const [processNumber, setProcessNumber] = useState(0);
	const [documentType, setDocumentType] = useState("");
	const [documentNumber, setDocumentNumber] = useState(0);
	const [unityForwardedArchiving, setUnityForwardedArchiving] = useState("");
    const [receiptDate, setReceiptDate] = useState("");
    const [workerRecieved, setWorkerRecieved] = useState("");
    const [numberBoxReceived, setNumberBoxReceived] = useState(0);
    const [originBox, setOriginBox] = useState([]);
    const [Subjects, setSubjects] = useState("");
    const [Dates, setDates] = useState("");
    const [boxAbbreviation, setBoxAbbreviation] = useState("");
	const [shelfNumber, setShelfNumber] = useState(0);
    const [observations, setObservations] = useState("");
    const [documentAttach, setDocumentAttach] = useState("");
	const [optionsEstante, setOptionsEstante] = useState(null);
	const [optionsAbbreviation, setOptionsAbbreviation] = useState(null);
	const [optionsSubject, setOptionsSubject] = useState(null);
	const [optionsUnity, setOptionsUnity] = useState(null);
	const [optionOriginBox, setOptionOriginBox ] = useState([]);
	const [update, setUpdate] = useState(0);

	const [fields, setFields] = useState([
		
	]);

	useEffect(() => {
		function loadOptionsOriginBox() {
			Api.get("http://0.0.0.0:8002/origin-box/")
			.then((response) => {
				const optionsOriginBoxData = response.data.map(d => ({
					"value": d.id,
					"description": `${d.subject}`,
				}));
				setOptionOriginBox(optionsOriginBoxData);
				setUpdate(5);
			})
			.catch(() => {})
			.then(() => {});
		}
		
		function loadOptionsSubject() {
			Api.get(hostApiDocumentSubject)
			.then((response) => {
				const optionsSubjectData = response.data.map(d => ({
					"value": d.id,
					"description": `${d.subject_name}`,
				}));
				setOptionsSubject(optionsSubjectData);
				setUpdate(4);
			})
			.catch(() => {})
			.then(() => {});
		}

		function loadOptionsEstante() {
			Api.get(hostApiShelf)
			.then((response) => {
				const optionsEstanteData = response.data.map(d => ({
					"value": d.id,
					"description": `${d.shelfe_number}`,
				}));
				setOptionsEstante(optionsEstanteData);
				setUpdate(3);
			})
			.catch(() => {})
			.then(() => {});
		}

		function loadOptionsAbbreviation() {
			Api.get(hostApiBoxAbbreviation)
			.then((response) => {
				const optionsAbbreviationData = response.data.map(d => ({
					"value": d.id,
					"description": `${d.abbreviation}`,	
				}));
				setOptionsAbbreviation(optionsAbbreviationData);
				setUpdate(2);
			})
			.catch(() => {})
			.then(() => {});
		}

		function loadOptionsUnity() {
			Api.get(hostApiUnity)
			.then((response) => {
				const optionsUnityData = response.data.map(d => ({
					"value": d.id,
					"description": `${d.unity_name}`,	
				}));
				setOptionsUnity(optionsUnityData);
				setUpdate(1);
			})
			.catch(() => {})
			.then(() => {});
		}

		loadOptionsOriginBox();
		loadOptionsSubject();
		loadOptionsEstante();
		loadOptionsAbbreviation();
		loadOptionsUnity();
	},[]);

	useEffect(() => {
		function loadFields() {
			setFields(
				[
					{
						type: "text",
						placeholder: "Número do processo:*",
						setState: setProcessNumber,
					},
					{
						type: "text",
						placeholder: "Tipo do documento de envio:*",
						setState: setDocumentType,
					},
					{
						type: "text",
						placeholder: "Número do documento de envio:*",
						setState: setDocumentNumber,
					},
					{
						type: "id",
						placeholder: "Unidade que encaminhou para arquivamento:*",
						setState: setUnityForwardedArchiving,
						options: optionsUnity
					},
					{
						type: "text",
						placeholder: "Data de recebimento:*",
						setState: setReceiptDate,
					},
					{
						type: "text",
						placeholder: "Servidor que recebeu as caixas:*",
						setState: setWorkerRecieved,
					},
					{
						type: "text",
						placeholder: "Quantidade de caixas box recebidas para arquivamento:",
						setState: setNumberBoxReceived,
					},
					{
						type: "multi-select",
						placeholder: "Caixa de origem:",
						setState: setOriginBox,
						options: optionOriginBox
					},
					{
						type: "id",
						placeholder: "Assuntos:",
						setState: setSubjects,
						options: optionsSubject
					},
					{
						type: "text",
						placeholder: "Data:",
						setState: setDates,
					},
					{
						type: "id",
						placeholder: "Sigla da caixa:",
						setState: setBoxAbbreviation,
						options: optionsAbbreviation
					},
					{
						type: "id",
						placeholder: "Estante:",
						setState: setShelfNumber,
						options: optionsEstante
					},
					{
						type: "text",
						placeholder: "Observações:",
						setState: setObservations,
					},
					{
						type: "text",
						placeholder: "Anexar documento externo:",
						setState: setDocumentAttach,
					},
				]
			)
		}
		loadFields();
	}, [update]);

	function onSubmit() {
		Api
			.post(hostApi, {
				process_number: processNumber,
				document_type_id: documentType,
				number: documentNumber,
				sender_unity: unityForwardedArchiving,
                received_date: receiptDate,
                filer_user: workerRecieved,
                number_of_boxes_received_for_archiving: numberBoxReceived,
                origin_box_id: originBox,
                subjects: Subjects,
                dates: Dates,
				box_abbreviation: boxAbbreviation,
				shelf_id: shelfNumber,
				notes: observations,
				document_url: documentAttach
			})
			.then(() => {})
			.catch(() => {});
	}

	return (
		<div className="create-form-container">
			<FormCadastro 
				title="Arquivo Geral da Polícia Civil de Goiás"
				subtitle="Cadastrar documento"
				fields={fields}
				onClickBtn={onSubmit}
			/>
		</div>
	);
}