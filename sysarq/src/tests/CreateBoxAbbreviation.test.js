import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CreateBoxAbbreviation from "../pages/FieldsRegister/CreateBoxAbbreviation";
import { rest } from "msw";
import { setupServer } from "msw/node";
import inputChange from "./serverTest";

const axiosArchives = `${process.env.REACT_APP_URL_API_ARCHIVES}box-abbreviation/`;

const server = setupServer(
	rest.post(axiosArchives, (req, res, ctx) => {
		if (req.body.number === "201") {
			return res(ctx.status(201));
		} else {
			return res(ctx.status(404));
		}
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
jest.useFakeTimers();

describe("Page test", () => {
	it("axios success", async () => {
		render(<CreateBoxAbbreviation />);

		inputChange("Número da caixa", "201");
		inputChange("Sigla da caixa", "ASD");
		inputChange("Nome completo", "Polícia Civil do Goias");
		inputChange("Ano", "2021");

		fireEvent.click(screen.getByTestId("click"));

		await screen.findByText("Campo cadastrado!");
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});

	it("axios fail", async () => {
		render(<CreateBoxAbbreviation />);

		inputChange("Número da caixa", "401");
		inputChange("Sigla da caixa", "ASD");
		inputChange("Nome completo", "Polícia Civil do Goias");
		inputChange("Ano", "2021");
		fireEvent.click(screen.getByTestId("click"));

		await screen.findByText("Erro de conexão!");
		act(() => {
			jest.advanceTimersByTime(3000);
		});
	});

	it("year error", async () => {
		render(<CreateBoxAbbreviation />);

		inputChange("Número da caixa", "345");
		inputChange("Sigla da caixa", "BOB");
		inputChange("Nome completo", "Bobilson");
		inputChange("Ano", "3");
		fireEvent.click(screen.getByTestId("click"));

		await screen.findByText("Ano inválido");
	});
});
