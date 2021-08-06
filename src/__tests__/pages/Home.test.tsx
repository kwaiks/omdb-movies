import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import HomeView from "../../views/Home";
import configureMockStore from "redux-mock-store"
import { Provider } from "react-redux";
import { Suspense } from "react";
import { act } from "react-dom/test-utils";

const mockStore = configureMockStore();

describe("Home test", () => {
    let store:any; 

    afterEach(cleanup)

    beforeEach(()=>{
        const intersectionObserverMock = () => ({
            observe: () => null,
            disconnect: () => null
       })
       window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
       store = mockStore({
            movies: {
                list: [
                    {
                        "Title":"Batman Begins",
                        "Year":"2005",
                        "imdbID":"tt0372784",
                        "Type":"movie",
                        "Poster":"https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
                    }
                ]
            },
            search: {
                query: "a",
                searchQueries: []
            }
        })
    })

    test("should render", () => {
        render(
            <Suspense fallback={<div></div>}>
                <Provider store={store}>
                    <HomeView/>
                </Provider>
            </Suspense>,
            {wrapper: MemoryRouter}
        )
        expect(screen.getByTestId("home-view")).toBeInTheDocument();
    })

    test("should show movie list", async () => {
        render(
            <Suspense fallback={<div></div>}>
                <Provider store={store}>
                    <HomeView/>
                </Provider>
            </Suspense>,
            {wrapper: MemoryRouter}
        )
        expect(screen.getByTestId("home-view")).toBeInTheDocument()
        await waitFor(() => expect(screen.getAllByTestId("list-content-test")[0]).toBeInTheDocument())
    })

})