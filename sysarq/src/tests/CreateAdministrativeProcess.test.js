import { setupServer } from "msw/node";
import { rest } from "msw";

import { render, screen, fireEvent, within } from "@testing-library/react";

import CreateAdministrativeProcess from "../pages/DocumentsRegister/CreateAdministrativeProcess";


const hostApiArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}`;

var documentSubjectRequestNumber = 0;
var unitRequestNumber = 0;
var boxAbbreviationRequestNumber = 0;
var shelfRequestNumber = 0;
var statusRequestNumber = 0;

const server = setupServer(
	rest.get(`${hostApiArchives}document-subject/`, (req, res, ctx) => {
		documentSubjectRequestNumber++;

		if (documentSubjectRequestNumber !== 3) {
			return res(
				ctx.json([
					{
						id: 1,
						subject_name: "subject_name_test",
						temporality: "2002-03-04",
					},
				])
			);
		} else {
			return res(ctx.status(404));
		}
	}),

	rest.get(`${hostApiArchives}unity/`, (req, res, ctx) => {
		unitRequestNumber++;

		if (unitRequestNumber !== 4) {
			return res(
				ctx.json([
					{
						id: 5,
						telephone_number: "6",
						note: "notes_test",
						unity_name: "dest_unit_name_test",
						unity_abbreviation: "unit_abbreviation_test",
						administrative_bond: "administrative_bond_test",
						bond_abbreviation: "bond_abbreviation_test",
						type_of_unity: "type_of_unit_test",
						municipality: "municipality_test",
					},
					{
						id: 20,
						telephone_number: "21",
						note: "notes_test_1",
						unity_name: "sender_unit_name_test_1",
						unity_abbreviation: "unit_abbreviation_test_1",
						administrative_bond: "administrative_bond_test_1",
						bond_abbreviation: "bond_abbreviation_test_1",
						type_of_unity: "type_of_unit_test_1",
						municipality: "municipality_test_1",
					},
				])
			);
		} else {
			return res(ctx.status(404));
		}
	}),

	rest.get(`${hostApiArchives}box-abbreviation/`, (req, res, ctx) => {
		boxAbbreviationRequestNumber++;

		if (boxAbbreviationRequestNumber !== 5) {
			return res(
				ctx.json([
					{
						id: 7,
						number: 8,
						abbreviation: "abbreviation_test",
						name: "complete_name_abbreviation_test",
						year: 2009,
					},
				])
			);
		} else {
			return res(ctx.status(404));
		}
	}),

	rest.get(`${hostApiArchives}shelf/`, (req, res, ctx) => {
		shelfRequestNumber++;

		if (shelfRequestNumber !== 6) {
			return res(
				ctx.json([
					{
						id: 10,
						shelfe_number: 11,
						shelfp_number: 12,
					},
				])
			);
		} else {
			return res(ctx.status(404));
		}
	}),

	rest.get(`${hostApiArchives}status/`, (req, res, ctx) => {
		statusRequestNumber++;

		if (statusRequestNumber !== 7) {
			return res(
				ctx.json([
					{
						id: 12,
						filed: true,
						eliminated: false,
						sent_from: "",
						requested_document: "",
						send_date: null,
					},
					{
						id: 14,
						filed: false,
						eliminated: true,
						sent_from: "",
						requested_document: "",
						send_date: null,
					},
					{
						id: 15,
						filed: false,
						eliminated: false,
						sent_from: "Unit_A",
						requested_document: "Document_B",
						send_date: "2016-08-19",
					},
				])
			);
		} else {
			return res(ctx.status(404));
		}
	}),

	rest.post(`${hostApiArchives}administrative-process/`, (req, res, ctx) => {
		if (
			req.body.notes == "notes_test" &&
			req.body.interested == "interested_test_1" &&
			req.body.process_number == "3234" &&
			req.body.notice_date == "2026-05-12" &&
			req.body.cpf_cnpj == "35363738394" &&
			req.body.reference_month_year == "2031-03-01" &&
			req.body.sender_user == "sender_worker_test" &&
			req.body.archiving_date == "2029-10-27" &&
			req.body.sender_unity == 20 &&
			req.body.abbreviation_id == 7 &&
			req.body.shelf_id == 10 &&
			req.body.subject_id == 1 &&
			req.body.dest_unity_id == 5 &&
			req.body.status_id == 12
		) {
			return res(ctx.status(201));
		} else {
			return res(ctx.status(404));
		}
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Create Administrative Process Screen Test", () => {
	it("text and date fields input test", async () => {
		render(<CreateAdministrativeProcess />);

		fireEvent.change(screen.getByLabelText("Data de Autuação*"), {
			target: { value: "" },
		});
		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
		expect(screen.getByText("Insira a data de autuação")).toBeInTheDocument();

		fireEvent.change(screen.getByLabelText("Data de Autuação*"), {
			target: { value: "12/09/" },
		});
		expect(
			screen.queryByText("Insira a data de autuação")
		).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
		expect(screen.getByText("Insira uma data válida")).toBeInTheDocument();

		fireEvent.change(screen.getByLabelText("Data de Autuação*"), {
			target: { value: "01/02/2003" },
		});
		expect(
			screen.queryByText("Insira uma data válida")
		).not.toBeInTheDocument();
		fireEvent.change(screen.getByLabelText("Data de Arquivamento*"), {
			target: { value: "" },
		});
		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
		expect(
			screen.getByText("Insira a data de arquivamento")
		).toBeInTheDocument();

		fireEvent.change(screen.getByLabelText("Data de Arquivamento*"), {
			target: { value: "34/05/2006" },
		});
		expect(
			screen.queryByText("Insira a data de arquivamento")
		).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
		expect(screen.getByText("Insira uma data válida")).toBeInTheDocument();

		fireEvent.change(screen.getByLabelText("Data de Arquivamento*"), {
			target: { value: "07/08/2009" },
		});
		expect(
			screen.queryByText("Insira uma data válida")
		).not.toBeInTheDocument();
		fireEvent.change(screen.getByLabelText("Referência"), {
			target: { value: "13/2010" },
		});
		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
		expect(
			screen.getByText("Insira uma referência válida")
		).toBeInTheDocument();

		fireEvent.change(screen.getByLabelText("Referência"), {
			target: { value: "11/2012" },
		});
		expect(
			screen.queryByText("Insira uma referência válida")
		).not.toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
		expect(screen.getByText("Insira o número do processo")).toBeInTheDocument();

		fireEvent.change(screen.getByLabelText("Número de Processo*"), {
			target: { value: "131" },
		});
		expect(
			screen.queryByText("Insira o número do processo")
		).not.toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
		expect(screen.getByText("Insira um interessado")).toBeInTheDocument();

		fireEvent.change(screen.getByLabelText("Interessado*"), {
			target: { value: "interested_test" },
		});
		expect(screen.queryByText("Insira um interessado")).not.toBeInTheDocument();

		fireEvent.change(screen.getByLabelText("CPF/CNPJ"), {
			target: { value: "1415." },
		});
		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
		expect(screen.getByText("Insira somente números")).toBeInTheDocument();

		fireEvent.change(screen.getByLabelText("CPF/CNPJ"), {
			target: { value: "1415" },
		});
		expect(
			screen.queryByText("Insira somente números")
		).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
		expect(screen.getByText("Insira um CPF/CNPJ válido")).toBeInTheDocument();

		fireEvent.change(screen.getByLabelText("CPF/CNPJ"), {
			target: { value: "16171819202" },
		});
		expect(
			screen.queryByText("Insira um CPF/CNPJ válido")
		).not.toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

		expect(
			screen.queryByText("Insira a data de autuação")
		).not.toBeInTheDocument();
		expect(
			screen.queryByText("Insira uma data válida")
		).not.toBeInTheDocument();
		expect(
			screen.queryByText("Insira a data de arquivamento")
		).not.toBeInTheDocument();
		expect(
			screen.queryByText("Insira uma referência válida")
		).not.toBeInTheDocument();
		expect(
			screen.queryByText("Insira o número do processo")
		).not.toBeInTheDocument();
		expect(screen.queryByText("Insira um interessado")).not.toBeInTheDocument();
		expect(
			screen.queryByText("Insira somente números")
		).not.toBeInTheDocument();
		expect(
			screen.queryByText("Insira um CPF/CNPJ válido")
		).not.toBeInTheDocument();
	});

	it("select fields input test, error post and post success", async () => {
		render(<CreateAdministrativeProcess />);

		fireEvent.change(screen.getByLabelText("Data de Autuação*"), {
			target: { value: "12/05/2026" },
		});
		fireEvent.change(screen.getByLabelText("Data de Arquivamento*"), {
			target: { value: "27/10/2029" },
		});
		fireEvent.change(screen.getByLabelText("Referência"), {
			target: { value: "03/2031" },
		});
		fireEvent.change(screen.getByLabelText("Número de Processo*"), {
			target: { value: "3234" },
		});
		fireEvent.change(screen.getByLabelText("CPF/CNPJ"), {
			target: { value: "35363738394" },
		});
		fireEvent.change(screen.getByLabelText("Interessado*"), {
			target: { value: "interested_test_1" },
		});
		fireEvent.change(screen.getByLabelText("Servidor que Encaminhou"), {
			target: { value: "sender_worker_test" },
		});

		fireEvent.change(screen.getByLabelText("Observação"), {
			target: { value: "notes_test_404" },
		});

		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
		expect(screen.getByText("Selecione um assunto")).toBeInTheDocument();

		fireEvent.mouseDown(screen.getByLabelText("Assunto do Documento*"));
		const subjectsOptions = within(screen.getByRole("listbox"));
		await subjectsOptions.findByText("subject_name_test");
		fireEvent.click(subjectsOptions.getByText(/subject_name_test/i));
		expect(screen.queryByText("Selecione um assunto")).not.toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));
		expect(screen.getByText("Selecione um status")).toBeInTheDocument();

		fireEvent.mouseDown(screen.getByLabelText("Status*"));
		const statusOptions = within(screen.getByRole("listbox"));
		await statusOptions.findByText("Arquivado");
		fireEvent.click(statusOptions.getByText("Arquivado"));
		expect(screen.queryByText("Selecione um status")).not.toBeInTheDocument();

		fireEvent.mouseDown(screen.getByLabelText("Unidade de Destino"));
		const destUnitOptions = within(screen.getByRole("listbox"));
		await destUnitOptions.findByText("dest_unit_name_test");
		fireEvent.click(destUnitOptions.getByText(/dest_unit_name_test/i));

		fireEvent.mouseDown(screen.getByLabelText("Unidade que Encaminhou"));
		const senderUnitOptions = within(screen.getByRole("listbox"));
		await senderUnitOptions.findByText("sender_unit_name_test_1");
		fireEvent.click(senderUnitOptions.getByText(/sender_unit_name_test_1/i));

		fireEvent.mouseDown(screen.getByLabelText("Sigla da Caixa"));
		const abbreviationOptions = within(screen.getByRole("listbox"));
		await abbreviationOptions.findByText("abbreviation_test");
		fireEvent.click(abbreviationOptions.getByText(/abbreviation_test/i));

		fireEvent.mouseDown(screen.getByLabelText("Estante"));
		const shelfOptions = within(screen.getByRole("listbox"));
		await shelfOptions.findByText("11");
		fireEvent.click(shelfOptions.getByText(/11/i));

		fireEvent.mouseDown(screen.getByLabelText("Prateleira"));
		const rackOptions = within(screen.getByRole("listbox"));
		await rackOptions.findByText("12");
		fireEvent.click(rackOptions.getByText(/12/i));

		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);

		fireEvent.change(screen.getByLabelText("Observação"), {
			target: { value: "notes_test" },
		});

		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

		const successAlert = await screen.findByRole("alert");
		expect(successAlert).toHaveTextContent(/Documento cadastrado!/i);
	});

	it("document-subject get error", async () => {
		render(<CreateAdministrativeProcess />);

		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});

	it("unit get error", async () => {
		render(<CreateAdministrativeProcess />);

		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});

	it("box-abbreviation get error", async () => {
		render(<CreateAdministrativeProcess />);

		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});

	it("shelf get error", async () => {
		render(<CreateAdministrativeProcess />);

		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});

	it("status get error", async () => {
		render(<CreateAdministrativeProcess />);

		fireEvent.click(screen.getByRole("button", { name: /CADASTRAR/ }));

		const errorAlert = await screen.findByRole("alert");
		expect(errorAlert).toHaveTextContent(
			/Verifique sua conexão com a internet e recarregue a página./i
		);
	});
});
