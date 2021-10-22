import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core";

import { axiosArchives, axiosProfile } from "../../../Api";
import { logout } from "../../../support";

const BoxInput = ({ set, connectionError, box }) => {
	const [boxAbbreviations, setBoxAbbreviations] = useState([]);
	const [boxYears, setBoxYears] = useState([]);

	const [boxAbbreviation, setBoxAbbreviation] = useState("");
	const [boxYear, setBoxYear] = useState("");

	const [
		boxesFilteredByAbbreviationAndYear,
		setBoxesFilteredByAbbreviationAndYear,
	] = useState([]);

	const handleBoxAbbreviationChange = (event) => {
		set("");
		setBoxYear("");
		setBoxAbbreviation(event.target.value);
	};

	const handleBoxYearChange = (event) => {
		set("");
		setBoxYear(event.target.value);
	};

	const handleChange = (event) => set(event.target.value);

	useEffect(() => {
		axiosProfile
			.post(`api/token/refresh/`, {
				refresh: localStorage.getItem("tkr"),
			})
			.then((res) => {
				localStorage.setItem("tk", res.data.access);
				localStorage.setItem("tkr", res.data.refresh);

				axiosArchives
					.get("box-abbreviation/", {
						headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
					})
					.then((response) => {
						const uniqueAbbreviations = [];

						response.data.map((registeredBox) =>
							uniqueAbbreviations.indexOf(registeredBox.abbreviation) === -1
								? uniqueAbbreviations.push(registeredBox.abbreviation)
								: null
						);

						setBoxAbbreviations(uniqueAbbreviations);
					})
					.catch(() => connectionError());
			})
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					logout();
				} else connectionError();
			});
	}, []);

	useEffect(() => {
		if (boxAbbreviation !== "") {
			axiosProfile
				.post(`api/token/refresh/`, {
					refresh: localStorage.getItem("tkr"),
				})
				.then((res) => {
					localStorage.setItem("tk", res.data.access);
					localStorage.setItem("tkr", res.data.refresh);

					axiosArchives
						.get(`year-by-abbreviation/${boxAbbreviation}`, {
							headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
						})
						.then((response) => {
							const uniqueYears = [];

							response.data.map((registeredBox) =>
								uniqueYears.indexOf(registeredBox.year) === -1
									? uniqueYears.push(registeredBox.year)
									: null
							);

							setBoxYears(uniqueYears);
						})
						.catch(() => connectionError());
				})
				.catch((error) => {
					if (error.response && error.response.status === 401) {
						logout();
					} else connectionError();
				});
		}
	}, [boxAbbreviation]);

	useEffect(() => {
		if (boxYear !== "") {
			axiosProfile
				.post(`api/token/refresh/`, {
					refresh: localStorage.getItem("tkr"),
				})
				.then((res) => {
					localStorage.setItem("tk", res.data.access);
					localStorage.setItem("tkr", res.data.refresh);

					axiosArchives
						.get(`number-by-year-abbrevation/${boxAbbreviation}/${boxYear}`, {
							headers: { Authorization: `JWT ${localStorage.getItem("tk")}` },
						})
						.then((response) => {
							setBoxesFilteredByAbbreviationAndYear(response.data);
						})
						.catch(() => connectionError());
				})
				.catch((error) => {
					if (error.response && error.response.status === 401) {
						logout();
					} else connectionError();
				});
		}
	}, [boxYear]);

	return (
		<>
			<Grid item xs={12} sm={12} md={4}>
				<FormControl fullWidth>
					<InputLabel id="select-boxAbbreviation-label">
						Sigla da Caixa
					</InputLabel>
					<Select
						style={{ textAlign: "left" }}
						labelId="select-boxAbbreviation-label"
						id="select-boxAbbreviation"
						value={boxAbbreviation}
						onChange={handleBoxAbbreviationChange}
						renderValue={(value) => `${value}`}
					>
						<MenuItem value="">
							<em>Nenhuma</em>
						</MenuItem>

						{boxAbbreviations.map((abbreviationOption) => (
							<MenuItem key={abbreviationOption} value={abbreviationOption}>
								{abbreviationOption}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<FormControl fullWidth>
					<InputLabel id="select-boxYear-label">Ano da Caixa</InputLabel>
					<Select
						style={{ textAlign: "left" }}
						labelId="select-boxYear-label"
						id="select-boxYear"
						value={boxYear}
						onChange={handleBoxYearChange}
						renderValue={(value) => `${value}`}
					>
						<MenuItem value="">
							<em>Nenhum</em>
						</MenuItem>

						{boxYears.map((yearOption) => (
							<MenuItem key={yearOption} value={yearOption}>
								{yearOption}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<FormControl fullWidth>
					<InputLabel id="select-box-label">Número da Caixa</InputLabel>
					<Select
						style={{ textAlign: "left" }}
						labelId="select-box-label"
						id="select-box"
						value={box}
						onChange={handleChange}
						renderValue={(value) => `${value.number}`}
					>
						<MenuItem value="">
							<em>Nenhum</em>
						</MenuItem>

						{boxesFilteredByAbbreviationAndYear.map((boxOption) => (
							<MenuItem key={boxOption.id} value={boxOption}>
								{boxOption.number}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
		</>
	);
};

BoxInput.propTypes = {
	set: PropTypes.func.isRequired,
	connectionError: PropTypes.func.isRequired,
	box: PropTypes.string.isRequired,
};

export default BoxInput;
