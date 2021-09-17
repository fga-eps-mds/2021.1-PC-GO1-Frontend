import React from "react";
import PropTypes from "prop-types";

import {
	makeStyles, Card, CardContent, CardActionArea, Typography
} from "@material-ui/core";

import AssignmentIcon from '@material-ui/icons/Assignment';
import DescriptionIcon from "@material-ui/icons/Description";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AllInboxIcon from '@material-ui/icons/AllInbox';

import "./styles.css"

// TO-DO: Fundir os tipos de MenuCard


const useStyles = makeStyles(() => ({
	icon: {
		height: 125,
		width: "100%",
	}
}));

const Icon = ({ iconName }) => {
	const classes = useStyles();

	let icon = "";

	if (iconName === "icone-processo") {
		icon = <AssignmentIcon className={classes.icon} />;
	} else if (iconName === "icone-frequencia") {
		icon = <DescriptionIcon className={classes.icon} />;
	} else if (iconName === "icone-folha") {
		icon = <AccountBoxIcon className={classes.icon} />;
	} else if (iconName === "icone-arquivar") {
		icon = <AllInboxIcon className={classes.icon} />;
	}

	return icon;
};

const MenuCard = ({ icon, title, createUrl }) => (
	<Card id="card">
		<CardActionArea id="card-action" href={createUrl}>
			<CardContent>
				<Icon iconName={icon} />
				<Typography id="text">{title}</Typography>
			</CardContent>
		</CardActionArea>
	</Card>
);

MenuCard.propTypes = {
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	createUrl: PropTypes.string.isRequired,
};

export default MenuCard;