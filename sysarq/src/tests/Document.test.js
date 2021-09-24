import React from "react";
import { render, screen } from "@testing-library/react";

import DocumentsRegister from "../pages/Documents";

describe("Main component", () => {
	it("Show names in navigation bar", () => {
		render(<DocumentsRegister />);
	});
});
