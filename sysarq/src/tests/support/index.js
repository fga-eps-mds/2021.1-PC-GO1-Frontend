import { screen, fireEvent, within } from "@testing-library/react";

export const input = (field, value) => {
	fireEvent.change(screen.getByLabelText(field), { target: { value } });
};

export const submitClick = () => {
	fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
};

export const boxSelector = async () => {
	fireEvent.mouseDown(screen.getByLabelText("Sigla da Caixa"));
	const boxAbbreviationOptions = within(screen.getByRole("listbox"));
	await boxAbbreviationOptions.findByText("abbreviation_test");
	fireEvent.click(boxAbbreviationOptions.getByText(/abbreviation_test/i));

	fireEvent.mouseDown(screen.getByLabelText("Ano da Caixa"));
	const boxYearOptions = within(screen.getByRole("listbox"));
	await boxYearOptions.findByText("2045");
	fireEvent.click(boxYearOptions.getByText(/2045/i));

	fireEvent.mouseDown(screen.getByLabelText("Número da Caixa"));
	const boxOptions = within(screen.getByRole("listbox"));
	await boxOptions.findByText("44");
	fireEvent.click(boxOptions.getByText(/44/i));
};

export const shelfSelector = async () => {
	fireEvent.mouseDown(screen.getByLabelText("Estante"));
	const shelfOptions = within(screen.getByRole("listbox"));
	await shelfOptions.findByText("47");
	fireEvent.click(shelfOptions.getByText(/47/i));
};

export const rackSelector = async () => {
	fireEvent.mouseDown(screen.getByLabelText("Prateleira"));
	const rackOptions = within(screen.getByRole("listbox"));
	await rackOptions.findByText("49");
	fireEvent.click(rackOptions.getByText(/49/i));
};

export const documentTypeSelector = async () => {
	fireEvent.mouseDown(screen.getByLabelText("Tipo de Documento*"));
	const documentTypeOptions = within(screen.getByRole("listbox"));
	await documentTypeOptions.findByText("documentType_name_test");
	fireEvent.click(documentTypeOptions.getByText(/documentType_name_test/i));
};

export const senderUnitSelector = async () => {
	fireEvent.mouseDown(screen.getByLabelText("Unidade que Encaminhou*"));
	const senderUnitOptions = within(screen.getByRole("listbox"));
	await senderUnitOptions.findByText("sender_unit_name_test");
	fireEvent.click(senderUnitOptions.getByText(/sender_unit_name_test/i));
};
