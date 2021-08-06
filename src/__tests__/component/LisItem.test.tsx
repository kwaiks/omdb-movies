import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, Router } from "react-router-dom"
import {createMemoryHistory} from "history";
import ListItem from "../../components/movie/ListItem"

describe("ListItem test", () => {
    test("should have render", () => {
        const history = createMemoryHistory()
        const data = {
            Title: "Batman Begins",
            Year: "2005",
            imdbID: "tt0372784",
            Type: "movie",
            Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
          }
        render(
        <Router history={history}>
            <ListItem movie={data}/>
        </Router>)
        expect(screen.getByTestId("poster-image")).toBeVisible()
        expect(screen.getByText(data.Title).textContent).toEqual(data.Title);
        expect(screen.getByText(data.Year).textContent).toEqual(data.Year);
        expect(screen.getByText(data.Type).textContent).toEqual(data.Type);
    })
})