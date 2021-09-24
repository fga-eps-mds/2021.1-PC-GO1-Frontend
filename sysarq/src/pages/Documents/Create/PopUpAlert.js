import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert, AlertTitle } from "@material-ui/lab";

const PopUpAlert = ({
	openAlert,
	handleAlertClose,
	severityAlert,
	alertHelperText,
}) => (
	<Snackbar
		style={{ textAlign: "left" }}
		anchorOrigin={{ vertical: "top", horizontal: "right" }}
		open={openAlert}
		autoHideDuration={10000}
		onClose={handleAlertClose}
	>
		<Alert variant="filled" onClose={handleAlertClose} severity={severityAlert}>
			<AlertTitle>{severityAlert === "error" ? "Erro" : "Sucesso"}</AlertTitle>
			{alertHelperText}
		</Alert>
	</Snackbar>
);

PopUpAlert.propTypes = {
	openAlert: PropTypes.bool.isRequired,
	handleAlertClose: PropTypes.func.isRequired,
	severityAlert: PropTypes.string.isRequired,
	alertHelperText: PropTypes.string.isRequired,
};

export default PopUpAlert;
