import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import Image from "../../components/Image";

describe("Image Test", () => {

    afterEach(cleanup);

    test("should render", () => {
        render(<Image src="https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"/>)
        expect(screen.getByTestId("poster-image")).toBeVisible();
    });


    test("should have show modal and not closing", () => {
        render(<Image src="https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"/>);
        const image = screen.getByTestId("poster-image")
        fireEvent.click(image);
        const modal = screen.getByTestId("poster-image-modal")
        expect(modal).toBeVisible();
        fireEvent.click(modal);
        expect(screen.getByTestId("poster-image-modal")).toBeVisible();
    })

    test("should have show modal and closing", () => {
        render(<Image src="https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"/>);
        const image = screen.getByTestId("poster-image")
        fireEvent.click(image);
        const modal = screen.getByTestId("poster-image-modal-wrapper")
        const content = screen.getByTestId("poster-image-modal");
        expect(modal).toBeVisible();
        expect(content).toBeVisible();
        fireEvent.click(modal);
        expect(screen.queryAllByTestId("poster-image-modal").length).toEqual(0);
    })

    test("should have show modal", () => {
        render(<Image src="https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"/>);
        const image = screen.getByTestId("poster-image")
        fireEvent.click(image);
        expect(screen.getByTestId("poster-image-modal")).toBeVisible()
    })
})