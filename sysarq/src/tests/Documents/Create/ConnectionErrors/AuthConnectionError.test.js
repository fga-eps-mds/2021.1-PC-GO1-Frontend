import { render, screen } from "@testing-library/react";

import CreateAdministrativeProcess from "../../../../pages/Documents/Create/CreateAdministrativeProcess";
import CreateArchivingRelation from "../../../../pages/Documents/Create/CreateArchivingRelation";
import CreateFrequencyRelation from "../../../../pages/Documents/Create/CreateFrequencyRelation";
import CreateFrequencySheet from "../../../../pages/Documents/Create/CreateFrequencySheet";


describe("Auth Connection Error Test", () => {
    it("refresh token connection error", async () => {
	    render(<CreateAdministrativeProcess />);

	 	const errorAlert = await screen.findByRole("alert");
	 	expect(errorAlert).toHaveTextContent(
	 		/Verifique sua conexão com a internet e recarregue a página./i
	    );
	});

    it("refresh token connection error", async () => {
	    render(<CreateArchivingRelation />);

	 	const errorAlert = await screen.findByRole("alert");
	 	expect(errorAlert).toHaveTextContent(
	 		/Verifique sua conexão com a internet e recarregue a página./i
	    );
	});

    it("refresh token connection error", async () => {
	    render(<CreateFrequencyRelation />);

	 	const errorAlert = await screen.findByRole("alert");
	 	expect(errorAlert).toHaveTextContent(
	 		/Verifique sua conexão com a internet e recarregue a página./i
	    );
	});

    it("refresh token connection error", async () => {
	    render(<CreateFrequencySheet />);

	 	const errorAlert = await screen.findByRole("alert");
	 	expect(errorAlert).toHaveTextContent(
	 		/Verifique sua conexão com a internet e recarregue a página./i
	    );
	});
});
