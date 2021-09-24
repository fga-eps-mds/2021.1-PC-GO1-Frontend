import React from "react";
import PropTypes from "prop-types";

import { Grid, TextField } from "@material-ui/core";

const NotesInput = ({ value, onChange }) => (
	<Grid item xs={12} sm={12} md={12}>
		<TextField
			fullWidth
			id="notes"
			label="Observação"
			value={value}
			onChange={onChange}
			inputProps={{ maxLength: 300 }}
			multiline
		/>
	</Grid>
);

NotesInput.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default NotesInput;
