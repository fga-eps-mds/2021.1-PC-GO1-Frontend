import {
    makeStyles, Container, Grid, Card, Typography
} from "@material-ui/core";

import MenuCard from "../components/MenuCard/DocumentRegister";

// TO-DO: Fundir os tipos de MenuCard


const useStyles = makeStyles((theme) => ({
    container: {
        margin: "auto",
        textAlign: "center"
	},

    card: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),

        borderRadius: "15px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)"
	},

    title: {
        color: "#5289b5",
        fontSize: "36px",
        fontWeight: "700",
        fontFamily: ['"Montserrat"', 'sans-serif']
    },

	subtitle: {
        paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(6),

        color: "#5289b5",
        fontSize: "24px",
        fontWeight: "700",
        fontFamily: ['"Montserrat"', 'sans-serif']
	},
}));

export default function DocumentsRegister() {
    const classes = useStyles();

	return (
		<Container className={classes.container} maxWidth="lg">
			<Grid container>
				<Grid item xs={12}>
					<Card className={classes.card}>
						<Typography className={classes.title}>
							Arquivo Geral da Polícial Civil de Goiás
					    </Typography>
						<Typography className={classes.subtitle}>
							Tipos de documentos para cadastro
					    </Typography>

						<Grid container spacing={2}>
							<Grid item xs={12} sm={6} md={3}>
								<MenuCard
									icon="icone-processo"
									title="Processo Administrativo"
									createUrl="/create-administrative-process"
								/>
							</Grid>

							<Grid item xs={12} sm={6} md={3}>
								<MenuCard
									icon="icone-frequencia"
									title="Relação de Frequências"
									createUrl="/create-frequency-relation"
								/>
							</Grid>

							<Grid item xs={12} sm={6} md={3}>
								<MenuCard
									icon="icone-folha"
									title="Folha de Frequências"
									createUrl="/create-frequency-document"
							
								/>
							</Grid>

							<Grid item xs={12} sm={6} md={3}>
								<MenuCard
									icon="icone-arquivar"
									title="Relação de Arquivamento"
									createUrl="/create-archiving-relation"
								/>
							</Grid>
						</Grid>
					</Card>
				</Grid>
			</Grid>
		</Container>		
	);
}
