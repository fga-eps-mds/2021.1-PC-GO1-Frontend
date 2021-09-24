import React, { useState } from "react";

import { Grid, TextField } from "@material-ui/core";

import { KeyboardDatePicker } from "@material-ui/pickers";

import "date-fns";

import NumberProcessInput from "./NumberProcessInput";

import DocumentsContainer from "./DocumentsContainer";
import DocumentsCreate from "./DocumentsCreate";
// import PopUpAlert from "./PopUpAlert";

const CreateArchivingRelation = () => {

	const initialDate = new Date();

	const [processNumber, setProcessNumber] = useState("");
	const [processNumberError, setProcessNumberError] = useState(false);
	const [processNumberHelperText, setProcessNumberHelperText] = useState("");

	const [number, setNumber] = useState("");
	const [numberError, setNumberError] = useState(false);
	const [numberHelperText, setNumberHelperText] = useState("");

	const [receivedDate, setReceivedDate] = useState(initialDate);
	const [receivedDateError, setReceivedDateError] = useState(false);
	const [receivedDateHelperText, setReceivedDateHelperText] = useState("");

	const handleNumberChange = (event) => {
		setNumberHelperText("");
		setNumberError(false);

		setNumber(event.target.value);
	}

	const handleProcessNumberChange = (event) => {
		setProcessNumberHelperText("");
		setProcessNumberError(false);

		setProcessNumber(event.target.value);
	};

    const handleReceivedDateChange = (event) => {
		setReceivedDateHelperText("");
		setReceivedDateError(false);

		setReceivedDate(event.target.value);
	};

	const [loading, setLoading] = useState(false);

	const onSubmit = () => {
		setLoading(false);
	};

	return (
		<DocumentsContainer title="Relação de Arquivamento" spacing={1}>
			<Grid item xs={12} sm={6} md={4}>
				<TextField
					fullWidth
						id="number"
						label="Número*"
						value={number}
						onChange={handleNumberChange}
						error={numberError}
						helperText={numberHelperText}
						inputProps={{ maxLength: 15 }}
				/>
			</Grid>

			<Grid item xs={12} sm={6} md={4}>
				<NumberProcessInput
					value={processNumber}
					onChange={handleProcessNumberChange}
					error={processNumberError}
					helperText={processNumberHelperText}
				/>
			</Grid>

			<Grid item xs={12} sm={12} md={4}>
				<KeyboardDatePicker
					okLabel="Confirmar"
					cancelLabel="Cancelar"
					style={{ width: "100%" }}
					id="notice-date-picker-dialog"
					label="Data de Autuação*"
					format="dd/MM/yyyy"
					value={receivedDate}
					onChange={handleReceivedDateChange}
					KeyboardButtonProps={{
						"aria-label": "change notice date",
					}}
					error={receivedDateError}
					helperText={receivedDateHelperText}
				/>
			</Grid>

			<DocumentsCreate loading={loading} onSubmit={onSubmit} />
		</DocumentsContainer>
	);
};

export default CreateArchivingRelation;

// <PopUpAlert
// openAlert={openAlert}
// handleAlertClose={handleAlertClose}
// severityAlert={severityAlert}
// alertHelperText={alertHelperText}
// />

// Número -> 3
// Número de Processo -> 3
// Data de Recebimento -> 3
// Quantidade de caixas box recebidas para arquivamento -> 3

// Tipo de Documento

// Unidade que Encaminhou para Arquivamento

// Servidor que recebeu as caixas

// Sigla - Estante - Prateleira

// Observação

// Anexar Documento Externo (pdf, jpeg, ...) - Capa de Rosto da Caixa para Impressão

// Caixas de Origem
