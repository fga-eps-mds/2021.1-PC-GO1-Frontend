import MenuCard from "../components/MenuCard/Documents";
import DocumentsContainer from "./Create/DocumentsContainer";

// TO-DO: Fundir os tipos de MenuCard
// TO-DO: Atualizar os urls

const DocumentsRegister = () => (
	<DocumentsContainer title="Documentos" spacing={2}>
		<MenuCard
			icon="icone-processo"
			title="Processo Administrativo"
			url="/create-administrative-process"
		/>
		<MenuCard
			icon="icone-frequencia"
			title="Relação de Frequências"
			url="/create-frequency-relation"
		/>
		<MenuCard
			icon="icone-folha"
			title="Folha de Frequências"
			url="/create-frequency-document"
		/>
		<MenuCard
			icon="icone-arquivar"
			title="Relação de Arquivamento"
			url="/create-archiving-relation"
		/>
	</DocumentsContainer>
);

export default DocumentsRegister;
