import React, { useState, useEffect } from "react";

import {
	makeStyles,
	createTheme,
	withStyles,
	ThemeProvider,
	Container,
	Grid,
	Card,
	Typography,
	TextField,
	FormControl,
	Select,
	InputLabel,
	MenuItem,
	FormHelperText,
	Box,
	Button,
	CircularProgress,
	Snackbar,
} from "@material-ui/core";

import MuiLink from "@material-ui/core/Link";

import { Alert, AlertTitle } from "@material-ui/lab";

import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { axiosArchives } from "../../Api";

import "date-fns";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),

		margin: "auto",
		textAlign: "center",
	},

	card: {
		paddingTop: theme.spacing(6),
		paddingBottom: theme.spacing(6),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),

		borderRadius: "15px",
		backgroundColor: "#ffffff",
		boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
	},

	title: {
		paddingBottom: theme.spacing(5),

		color: "#1f3541",
		fontSize: "36px",
		fontWeight: "700",
		fontFamily: ['"Montserrat"', "sans-serif"],
	},

	box: {
		paddingTop: theme.spacing(5),

		display: "flex",
		height: "100%",
		width: "100%",
	},

	spreadBox: {
		justifyContent: "space-around",
		alignItems: "center",
	},

	link: {
		fontWeight: "bold",
		color: "#5389b5",
	},
}));

const theme = createTheme({
	palette: {
		primary: {
			main: "#1f3541",
		},
	},
});

const Link = withStyles({
	root: {
		"&:hover": {
			color: "#fe0000",
		},
	},
})(MuiLink);

export default function CreateAdministrativeProcess() {
	const classes = useStyles();

	const initialDate = new Date();

	const [noticeDate, setNoticeDate] = useState(initialDate);
	const [noticeDateError, setNoticeDateError] = useState(false);
	const [noticeDateHelperText, setNoticeDateHelperText] = useState("");

	const [archivingDate, setArchivingDate] = useState(initialDate);
	const [archivingDateError, setArchivingDateError] = useState(false);
	const [archivingDateHelperText, setArchivingDateHelperText] = useState("");

	const [reference, setReference] = useState(initialDate);
	const [referenceError, setReferenceError] = useState(false);
	const [referenceHelperText, setReferenceHelperText] = useState("");

	const [processNumber, setProcessNumber] = useState("");
	const [processNumberError, setProcessNumberError] = useState(false);
	const [processNumberHelperText, setProcessNumberHelperText] = useState("");

	const [personRegistration, setPersonRegistration] = useState("");
	const [personRegistrationError, setPersonRegistrationError] = useState(false);
	const [personRegistrationHelperText, setPersonRegistrationHelperText] =
		useState("");

	const [interested, setInterested] = useState("");
	const [interestedError, setInterestedError] = useState(false);
	const [interestedHelperText, setInterestedHelperText] = useState("");

	const [subjects, setSubjects] = useState([]);
	const [subject, setSubject] = useState("");
	const [subjectError, setSubjectError] = useState(false);
	const [subjectHelperText, setSubjectHelperText] = useState("");

	const [units, setUnits] = useState([]);
	const [destUnit, setDestUnit] = useState("");
	const [senderUnit, setSenderUnit] = useState("");

	const [senderWorker, setSenderWorker] = useState("");

	const [abbreviations, setAbbreviations] = useState([]);
	const [abbreviation, setAbbreviation] = useState("");

	const [shelves, setShelves] = useState([]);
	const [shelf, setShelf] = useState("");

	const [racks, setRacks] = useState([]);
	const [rack, setRack] = useState("");

	const [registeredStatus, setRegisteredStatus] = useState([]);
	const [status, setStatus] = useState("");
	const [statusError, setStatusError] = useState(false);
	const [statusHelperText, setStatusHelperText] = useState("");

	const [notes, setNotes] = useState("");

	const [openAlert, setOpenAlert] = useState(false);
	const [severityAlert, setSeverityAlert] = useState("");
	const [alertHelperText, setAlertHelperText] = useState("");

	const [loading, setLoading] = useState(false);

	const handleNoticeDateChange = (date) => {
		setNoticeDateHelperText("");
		setNoticeDateError(false);

		setNoticeDate(date);
	};

	const handleArchivingDateChange = (date) => {
		setArchivingDateHelperText("");
		setArchivingDateError(false);

		setArchivingDate(date);
	};

	const handleReferenceChange = (date) => {
		setReferenceHelperText("");
		setReferenceError(false);

		setReference(date);
	};

	const handleProcessNumberChange = (event) => {
		setProcessNumberHelperText("");
		setProcessNumberError(false);

		setProcessNumber(event.target.value);
	};

	const handlePersonRegistrationChange = (event) => {
		setPersonRegistrationHelperText("");
		setPersonRegistrationError(false);

		setPersonRegistration(event.target.value);
	};

	const handleInterestedChange = (event) => {
		setInterestedHelperText("");
		setInterestedError(false);

		setInterested(event.target.value);
	};

	const handleSubjectChange = (event) => {
		setSubjectHelperText("");
		setSubjectError(false);

		setSubject(event.target.value);
	};

	const handleDestUnitChange = (event) => {
		setDestUnit(event.target.value);
	};

	const handleSenderUnitChange = (event) => {
		setSenderUnit(event.target.value);
	};

	const handleSenderWorkerChange = (event) => {
		setSenderWorker(event.target.value);
	};

	const handleAbbreviationChange = (event) => {
		setAbbreviation(event.target.value);
	};

	const handleShelfChange = (event) => {
		setShelf(event.target.value);
	};

	const handleRackChange = (event) => {
		setRack(event.target.value);
	};

	const handleStatusChange = (event) => {
		setStatusHelperText("");
		setStatusError(false);

		setStatus(event.target.value);
	};

	const handleNotesChange = (event) => {
		setNotes(event.target.value);
	};

	const handleAlertClose = () => {
		setOpenAlert(false);
	};

	const isInt = (number) => /^\d+$/.test(number);

	// const isCpfValid = () =>
	// let aux = 0;

	// [10, 9, 8, 7, 6, 5, 4, 3, 2].map((index) => {
	// 	aux += parseInt(personRegistration[10 - index], 10) * index
	// 	return aux
	// })

	// let aux1 = (aux * 10) % 11
	// aux = (aux1 === 10) ? 0 : aux1

	// if (aux !== parseInt(personRegistration[9], 10)){
	//  	return false
	// }

	// [11, 10, 9, 8, 7, 6, 5, 4, 3, 2].map((index) => {
	//  	aux += parseInt(personRegistration[11 - index], 20) * index
	// 	return aux
	// });

	// aux1 = (aux * 10) % 11
	// aux = (aux1 === 10) ? 0 : aux1

	// if (aux !== parseInt(personRegistration[10], 10)){
	//  	return false
	// }

	// TO-DO: Conferir esse algoritmo de validação de CPF

	// 	true;

	// const isCnpjValid = () =>
	// TO-DO: Adicionar um algoritmo de validação de CNPJ

	// 	true;

	const connectionError = () => {
		setSeverityAlert("error");

		setOpenAlert(true);
		setAlertHelperText(
			"Verifique sua conexão com a internet e recarregue a página."
		);
	};

	const onSuccess = () => {
		setSeverityAlert("success");

		setOpenAlert(true);
		setAlertHelperText("Documento cadastrado!");

		setNoticeDate(initialDate);
		setArchivingDate(initialDate);
		setReference(initialDate);
		setProcessNumber("");
		setPersonRegistration("");
		setInterested("");
		setSubject("");
		setDestUnit("");
		setSenderUnit("");
		setSenderWorker("");
		setAbbreviation("");
		setShelf("");
		setRack("");
		setStatus("");
		setNotes("");
	};

	const onSubmit = () => {
		setLoading(true);

		if (noticeDate === null || !isInt(noticeDate.getFullYear())) {
			setNoticeDateError(true);

			if (noticeDate === null)
				setNoticeDateHelperText("Insira a data de autuação");
			else setNoticeDateHelperText("Insira uma data válida");

			setLoading(false);

			return "Erro noticeDate";
		}

		if (archivingDate === null || !isInt(archivingDate.getFullYear())) {
			setArchivingDateError(true);

			if (archivingDate === null)
				setArchivingDateHelperText("Insira a data de arquivamento");
			else setArchivingDateHelperText("Insira uma data válida");

			setLoading(false);

			return "Erro archivingDate";
		}

		if (reference !== null && !isInt(reference.getFullYear())) {
			setReferenceError(true);
			setReferenceHelperText("Insira uma referência válida");

			setLoading(false);

			return "Erro reference";
		}

		if (processNumber === "") {
			setProcessNumberError(true);
			setProcessNumberHelperText("Insira o número do processo");

			setLoading(false);

			return "Erro processNumber";
		}

		if (personRegistration !== "") {
			if (
				!isInt(personRegistration) ||
				(personRegistration.length !== 11 && personRegistration.length !== 15)
				// ||
				// (personRegistration.length === 11 && !isCpfValid()) ||
				// (personRegistration.length === 15 && !isCnpjValid())
			) {
				setPersonRegistrationError(true);

				if (!isInt(personRegistration))
					setPersonRegistrationHelperText("Insira somente números");
				else if (
					personRegistration.length !== 11 &&
					personRegistration.length !== 15
				)
					setPersonRegistrationHelperText("Insira um CPF/CNPJ válido");
				// else if (personRegistration.length === 11)
				//	setPersonRegistrationHelperText("Insira um CPF válido");
				// else if (personRegistration.length === 15)
				// 	setPersonRegistrationHelperText("Insira um CNPJ válido");

				setLoading(false);

				return "Erro personRegistration";
			}
		}

		if (interested === "") {
			setInterestedError(true);
			setInterestedHelperText("Insira um interessado");

			setLoading(false);

			return "Erro interested";
		}

		if (subject === "") {
			setSubjectError(true);
			setSubjectHelperText("Selecione um assunto");

			setLoading(false);

			return "Erro subject";
		}

		if (status === "") {
			setStatusError(true);
			setStatusHelperText("Selecione um status");

			setLoading(false);

			return "Erro status";
		}

		axiosArchives
			.post("administrative-process/", {
				notes,
				interested,
				process_number: processNumber,
				notice_date: noticeDate.toISOString().substring(0, 10),
				cpf_cnpj: personRegistration,
				reference_month_year: reference.toISOString().substring(0, 10),
				sender_user: senderWorker,
				archiving_date: archivingDate.toISOString().substring(0, 10),
				sender_unity: senderUnit.id,
				abbreviation_id: abbreviation.id,
				shelf_id: shelf.id,
				// rack_id: "", //
				subject_id: subject.id,
				dest_unity_id: destUnit.id,
				status_id: status.id,
				filer_user: "", //
			})
			.then(() => {
				setLoading(false);
				onSuccess();
			})
			.catch(() => {
				setLoading(false);
				connectionError();
			});

		return null;
	};

	useEffect(() => {
		axiosArchives
			.get("document-subject/")
			.then((response) => {
				setSubjects(response.data);
			})
			.catch(() => {
				connectionError();
			});

		axiosArchives
			.get("unity/")
			.then((response) => {
				setUnits(response.data);
			})
			.catch(() => {
				connectionError();
			});

		axiosArchives
			.get("box-abbreviation/")
			.then((response) => {
				setAbbreviations(response.data);
			})
			.catch(() => {
				connectionError();
			});

		axiosArchives
			.get("shelf/")
			.then((response) => {
				setRacks(response.data);
				setShelves(response.data);
			})
			.catch(() => {
				connectionError();
			});

		axiosArchives
			.get("status/")
			.then((response) => {
				const statusReceivedOptions = [];

				response.data.map((statusReceived) => {
					if (statusReceived.eliminated === true) {
						statusReceivedOptions.push({
							id: statusReceived.id,
							status: "Eliminado",
						});
					} else if (statusReceived.filed === true) {
						statusReceivedOptions.push({
							id: statusReceived.id,
							status: "Arquivado",
						});
					} else {
						statusReceivedOptions.push({
							id: statusReceived.id,
							status: `Desarquivado: ${statusReceived.requested_document}; ${statusReceived.sent_from}; ${statusReceived.send_date}.`,
						});
					}

					return statusReceivedOptions;
				});

				setRegisteredStatus(statusReceivedOptions);
			})
			.catch(() => {
				connectionError();
			});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
				<Container className={classes.container} maxWidth="lg">
					<Grid container>
						<Grid item xs={12}>
							<Card className={classes.card}>
								<Typography className={classes.title}>
									Processo Administrativo
								</Typography>

								<Grid container spacing={1}>
									<Grid item xs={12} sm={6} md={4}>
										<KeyboardDatePicker
											okLabel="Confirmar"
											cancelLabel="Cancelar"
											style={{ width: "100%" }}
											id="notice-date-picker-dialog"
											label="Data de Autuação*"
											format="dd/MM/yyyy"
											value={noticeDate}
											onChange={handleNoticeDateChange}
											KeyboardButtonProps={{
												"aria-label": "change notice date",
											}}
											error={noticeDateError}
											helperText={noticeDateHelperText}
										/>
									</Grid>

									<Grid item xs={12} sm={6} md={4}>
										<KeyboardDatePicker
											okLabel="Confirmar"
											cancelLabel="Cancelar"
											style={{ width: "100%" }}
											id="archiving-date-picker-dialog"
											label="Data de Arquivamento*"
											format="dd/MM/yyyy"
											value={archivingDate}
											onChange={handleArchivingDateChange}
											KeyboardButtonProps={{
												"aria-label": "change archiving date",
											}}
											error={archivingDateError}
											helperText={archivingDateHelperText}
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={4}>
										<KeyboardDatePicker
											okLabel="Confirmar"
											cancelLabel="Cancelar"
											style={{ width: "100%" }}
											id="reference-date-picker-dialog"
											openTo="year"
											views={["year", "month"]}
											label="Referência"
											format="MM/yyyy"
											value={reference}
											onChange={handleReferenceChange}
											error={referenceError}
											helperText={referenceHelperText}
										/>
									</Grid>

									<Grid item xs={12} sm={6} md={6}>
										<TextField
											fullWidth
											id="processNumber"
											label="Número de Processo*"
											value={processNumber}
											onChange={handleProcessNumberChange}
											error={processNumberError}
											helperText={processNumberHelperText}
											inputProps={{ maxLength: 20 }}
										/>
									</Grid>

									<Grid item xs={12} sm={6} md={6}>
										<TextField
											fullWidth
											id="cpf-cpnj"
											label="CPF/CNPJ"
											placeholder="Somente números"
											value={personRegistration}
											onChange={handlePersonRegistrationChange}
											error={personRegistrationError}
											helperText={personRegistrationHelperText}
											inputProps={{ maxLength: 15 }}
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={12}>
										<TextField
											fullWidth
											id="interested"
											label="Interessado*"
											value={interested}
											onChange={handleInterestedChange}
											error={interestedError}
											helperText={interestedHelperText}
											multiline
											inputProps={{ maxLength: 150 }}
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={12}>
										<FormControl fullWidth error={subjectError}>
											<InputLabel id="select-subject-label">
												Assunto do Documento*
											</InputLabel>
											<Select
												style={{ textAlign: "left" }}
												labelId="select-subject-label"
												id="select-subject"
												data-testid="select-subject-testid"
												value={subject}
												onChange={handleSubjectChange}
												renderValue={(value) => `${value.subject_name}`}
											>
												<MenuItem key={0} value="">
													<em>Nenhum</em>
												</MenuItem>

												{subjects.map((subjectOption) => (
													<MenuItem
														key={subjectOption.id}
														value={subjectOption}
													>
														{subjectOption.subject_name}
													</MenuItem>
												))}
											</Select>
											{subjectError ? (
												<FormHelperText>{subjectHelperText}</FormHelperText>
											) : (
												""
											)}
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={12} md={12}>
										<FormControl fullWidth>
											<InputLabel id="select-destunit-label">
												Unidade de Destino
											</InputLabel>
											<Select
												style={{ textAlign: "left" }}
												labelId="select-destunit-label"
												id="select-destunit"
												value={destUnit}
												onChange={handleDestUnitChange}
												renderValue={(value) => `${value.unity_name}`}
											>
												<MenuItem key={0} value="">
													<em>Nenhuma</em>
												</MenuItem>

												{units.map((destUnitOption) => (
													<MenuItem
														id={destUnitOption.id}
														value={destUnitOption}
													>
														{destUnitOption.unity_name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={12} md={12}>
										<FormControl fullWidth>
											<InputLabel id="select-senderunit-label">
												Unidade que Encaminhou
											</InputLabel>
											<Select
												style={{ textAlign: "left" }}
												labelId="select-senderunit-label"
												id="select-senderunit"
												value={senderUnit}
												onChange={handleSenderUnitChange}
												renderValue={(value) => `${value.unity_name}`}
											>
												<MenuItem key={0} value="">
													<em>Nenhuma</em>
												</MenuItem>

												{units.map((senderUnitOption) => (
													<MenuItem
														key={senderUnitOption.id}
														value={senderUnitOption}
													>
														{senderUnitOption.unity_name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={12} md={12}>
										<TextField
											fullWidth
											id="sender-worker"
											label="Servidor que Encaminhou"
											value={senderWorker}
											onChange={handleSenderWorkerChange}
											multiline
											inputProps={{ maxLength: 150 }}
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={4}>
										<FormControl fullWidth>
											<InputLabel id="select-abbreviation-label">
												Sigla da Caixa
											</InputLabel>
											<Select
												style={{ textAlign: "left" }}
												labelId="select-abbreviation-label"
												id="select-abbreviation"
												value={abbreviation}
												onChange={handleAbbreviationChange}
												renderValue={(value) => `${value.abbreviation}`}
											>
												<MenuItem value="">
													<em>Nenhuma</em>
												</MenuItem>

												{abbreviations.map((abbreviationOption) => (
													<MenuItem
														key={abbreviationOption.id}
														value={abbreviationOption}
													>
														{abbreviationOption.abbreviation}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={6} md={4}>
										<FormControl fullWidth>
											<InputLabel id="select-shelf-label">Estante</InputLabel>
											<Select
												style={{ textAlign: "left" }}
												labelId="select-shelf-label"
												id="select-shelf"
												value={shelf}
												onChange={handleShelfChange}
												renderValue={(value) => `${value.shelfe_number}`}
											>
												<MenuItem value="">
													<em>Nenhuma</em>
												</MenuItem>

												{shelves.map((shelfOption) => (
													<MenuItem key={shelfOption.id} value={shelfOption}>
														{shelfOption.shelfe_number}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={6} md={4}>
										<FormControl fullWidth>
											<InputLabel id="select-rack-label">Prateleira</InputLabel>
											<Select
												style={{ textAlign: "left" }}
												labelId="select-rack-label"
												id="select-rack"
												value={rack}
												onChange={handleRackChange}
												renderValue={(value) => `${value.shelfp_number}`}
											>
												<MenuItem value="">
													<em>Nenhuma</em>
												</MenuItem>

												{racks.map((rackOption) => (
													<MenuItem key={rackOption.id} value={rackOption}>
														{rackOption.shelfp_number}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={12} md={12}>
										<FormControl fullWidth error={statusError}>
											<InputLabel id="select-status-label">Status*</InputLabel>
											<Select
												style={{ textAlign: "left" }}
												labelId="select-status-label"
												id="select-status"
												value={status}
												onChange={handleStatusChange}
												renderValue={(value) => `${value.status}`}
											>
												<MenuItem value="">
													<em>Nenhum</em>
												</MenuItem>

												{registeredStatus.map((statusOption) => (
													<MenuItem key={statusOption.id} value={statusOption}>
														{statusOption.status}
													</MenuItem>
												))}
											</Select>
											{statusError ? (
												<FormHelperText>{statusHelperText}</FormHelperText>
											) : (
												""
											)}
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={12} md={12}>
										<TextField
											fullWidth
											id="notes"
											label="Observação"
											value={notes}
											onChange={handleNotesChange}
											multiline
											inputProps={{ maxLength: 300 }}
										/>
									</Grid>

									<Box className={`${classes.spreadBox} ${classes.box}`}>
										<Typography>
											<Link className={classes.link} href="/documents-register">
												Cancelar
											</Link>
										</Typography>

										{loading ? (
											<CircularProgress />
										) : (
											<Button
												style={{ fontWeight: "bold" }}
												variant="contained"
												color="primary"
												onClick={onSubmit}
											>
												CADASTRAR
											</Button>
										)}
									</Box>

									<Snackbar
										style={{ textAlign: "left" }}
										anchorOrigin={{ vertical: "top", horizontal: "right" }}
										open={openAlert}
										autoHideDuration={10000}
										onClose={handleAlertClose}
									>
										<Alert
											variant="filled"
											onClose={handleAlertClose}
											severity={severityAlert}
										>
											<AlertTitle>
												{severityAlert === "error" ? "Erro" : "Sucesso"}
											</AlertTitle>
											{alertHelperText}
										</Alert>
									</Snackbar>
								</Grid>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</MuiPickersUtilsProvider>
		</ThemeProvider>
	);
}
