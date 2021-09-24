import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

const NumberProcessInput = ({ value, onChange, error, helperText }) => (
	<TextField
		fullWidth
		id="processNumber"
		label="Número do Processo*"
		value={value}
		onChange={onChange}
		error={error}
		helperText={helperText}
		inputProps={{ maxLength: 20 }}
	/>
);

NumberProcessInput.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.bool.isRequired,
	helperText: PropTypes.string.isRequired,
};

export default NumberProcessInput;
