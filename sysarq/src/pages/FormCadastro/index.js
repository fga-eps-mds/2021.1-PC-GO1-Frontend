import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import "./styles.css";

function FormCadastro({ title, subtitle, fields, onClickBtn }) {
	// const [age, setAge] = React.useState('');

	// const handleChange = (event) => {
	//     setAge(event.target.value);
	//   };

	const useStyles = makeStyles({
		input: {
			width: "100%",
			height: 36,
			marginBottom: "1rem",
			maxWidth: 908,
		},
	});
	// const label = { inputProps: { 'Montserrat': 'Checkbox demo' } };
	const classes = useStyles();

	return (
		<Paper className="form-cadastro-container" elevation={10}>
			<h1>{title}</h1>
			<h2>{subtitle}</h2>
			<div className="inputs-container">
				{fields.map((item) => {
					let input;

					switch (item.type) {
						case "id":
							input = (
								<FormControl
									variant="standard"
									className={classes.input}
									sx={{ m: 1, minWidth: 120 }}
								>
									<InputLabel>
										{item.placeholder} - {item.state}
									</InputLabel>
									<Select
										labelId="demo-simple-select-standard-label"
										id="demo-simple-select-standard-label"
										value={item.state}
										onChange={({ target }) => item.setState(target.value)}
										label="Age"
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{item.options &&
											item.options.map((option) => (
												<MenuItem value={option.value} key={option.value}>
													<em>{option.description}</em>
												</MenuItem>
											))}
									</Select>
								</FormControl>
							);
							break;

						case "checkbox":
							input = (
								<FormControl component="fieldset">
									<FormGroup column>
										<FormControlLabel
											control={
												<Checkbox
													id="check"
													style={{
														color: "#5289B5",
													}}
												/>
											}
											value={item.state}
											onChange={({ target }) => item.setState(target.checked)}
											label={item.placeholder}
											labelPlacement="end"
										/>
									</FormGroup>
								</FormControl>
							);
							break;

						case "number":
							input = (
								<TextField
									className={classes.input}
									label={item.placeholder}
									type="number"
									onChange={({ target }) => item.setState(target.value)}
								/>
							);
							break;

						case "date":
							input = (
								<TextField
									label={item.placeholder}
									type="date"
									defaultValue="2021-01-01"
									className={classes.input}
									onChange={({ target }) => item.setState(target.value)}
								/>
							);
							break;

						case "phone":
							input = (
								<TextField
									label={item.placeholder}
									onChange={({ target }) => item.setState(target.value)}
									className={classes.input}
									inputProps={{ maxLength: "8" }}
								/>
							);
							break;

						case "ShortText":
							input = (
								<TextField
									label={item.placeholder}
									onChange={({ target }) => item.setState(target.value)}
									className={classes.input}
									inputProps={{ maxLength: "20" }}
								/>
							);
							break;

						case "MiddleText":
							input = (
								<TextField
									label={item.placeholder}
									onChange={({ target }) => item.setState(target.value)}
									className={classes.input}
									inputProps={{ maxLength: "30" }}
								/>
							);
							break;

						case "cpf":
							input = (
								<TextField
									label={item.placeholder}
									onChange={({ target }) => item.setState(target.value)}
									className={classes.input}
									inputProps={{ maxLength: "11" }}
								/>
							);
							break;

						default:
							input = (
								<TextField
									label={item.placeholder}
									onChange={({ target }) => item.setState(target.value)}
									className={classes.input}
									inputProps={{ maxLength: "100" }}
								/>
							);
							break;
					}

					return input;
				})}
			</div>
			<button data-testid="click" type="button" onClick={onClickBtn}>
				CADASTRAR
			</button>
		</Paper>
	);
}

FormCadastro.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	fields: PropTypes.arrayOf(Object).isRequired,
	onClickBtn: PropTypes.func.isRequired,
};

export default FormCadastro;
