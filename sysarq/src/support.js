import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import { axiosArchives, axiosProfile } from "./Api";

export const initialDate = new Date();

export const initialPeriod = new Date(
	initialDate.getFullYear(),
	initialDate.getMonth(),
	"01"
);

const formatDateNumber = (number) => `0${number}`.slice(-2);

export const formatDate = (date) =>
	`${date.getFullYear()}-${formatDateNumber(
		date.getMonth() + 1
	)}-${formatDateNumber(date.getDate())}`;

export const isInt = (number) => /^\d+$/.test(number);

export const isDateNotValid = (
	date,
	setHelperText,
	dateType = "period",
	fieldType = ""
) => {
	if (fieldType === "required" && date === null) {
		setHelperText(
			dateType !== "period" ? "Insira uma data" : "Insira um período"
		);
		return true;
	}
	if (date !== null && !isInt(date.getFullYear())) {
		setHelperText(
			dateType !== "period"
				? "Insira uma data válida"
				: "Insira um período válido"
		);
		return true;
	}
	return false;
};

export function logout() {
	localStorage.removeItem("tk");
	localStorage.removeItem("tkr");
	localStorage.removeItem("isLogged");
	window.location = "/login";
}

export function axiosProfileError(error, connectionError) {
	if (error.response && error.response.status === 401) {
		logout();
	} else {
		connectionError();
	}
}

export function getUnits(setUnits, connectionError) {
	axiosProfile
		.post(`api/token/refresh/`, {
			refresh: localStorage.getItem("tkr"),
		})
		.then((res) => {
			localStorage.setItem("tk", res.data.access);
			localStorage.setItem("tkr", res.data.refresh);

			axiosArchives
				.get("unity/", {
					headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
				})
				.then((response) => {
					setUnits(response.data);
				})
				.catch(() => connectionError());
		})
		.catch((error) => {
			axiosProfileError(error, connectionError);
		});
}

export function getPublicWorkers(setPublicWorkers, connectionError) {
	axiosArchives
		.get("public-worker/", {
			headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
		})
		.then((response) => setPublicWorkers(response.data))
		.catch(() => connectionError());
}

export function autocompl(
	publicWorkers,
	publicWorkerInput,
	handlePublicWorkerChange,
	setPublicWorkerInput,
	publicWorkerOptions,
	publicWorkerHelperText
) {
	return (
		<Autocomplete
			id="workerName"
			data-testid="autocomplete"
			value={publicWorkers.name}
			onChange={(event, newValue) => {
				handlePublicWorkerChange(newValue);
			}}
			inputValue={publicWorkerInput}
			onInputChange={(event, newInputValue) => {
				setPublicWorkerInput(newInputValue);
			}}
			options={publicWorkerOptions.sort(
				(a, b) => -b.firstLetter.localeCompare(a.firstLetter)
			)}
			groupBy={(option) => option.firstLetter}
			getOptionLabel={(option) => `${option.name}, ${option.cpf}`}
			getOptionSelected={(option, value) => option.name === value.name}
			autoHighlight
			renderInput={(params) => (
				<TextField
					// eslint-disable-next-line
					{...params}
					value={params.value}
					label="Servidor, CPF*"
					error={publicWorkerHelperText !== ""}
					helperText={publicWorkerHelperText}
				/>
			)}
		/>
	);
}
