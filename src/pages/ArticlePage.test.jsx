import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ArticlePage from "./ArticlePage";
import { describe, it, expect, vi } from 'vitest';
import { useSelector, useDispatch } from 'react-redux';
import { MemoryRouter} from 'react-router-dom';


//mocking react-redux useSelector, useDispatch this lives outside the test. 
vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));



describe("ArticlePage component", ()=> {
it("component renders", ()=> {

const fakeState  = {
 articles: {
 currentArticle: { body_html: "The results are in!" },
 isLoading: false, 
 },
};

// ArticlePage has a useSelector and a useDispatch. The data only comes through useSelector. useDispatch is still needed because the component calls it when it mounts.
useSelector.mockImplementation((selector) => selector(fakeState)); // this is the same useSelector as in ArticlePage

const mockDispatch = vi.fn();
useDispatch.mockReturnValue(mockDispatch);

// render
render(<MemoryRouter><ArticlePage/></MemoryRouter>);
// assertions
const articleTest = screen.getByText("The results are in!");
expect(articleTest).toBeInTheDocument();
//clean up
cleanup();
})

it("dispatch in component is triggered", async () => {

const fakeState  = {
 articles: {
 currentArticle: { body_html: "The results are in!" },
 isLoading: false, 
 },
};


// ArticlePage has a useSelector and a useDispatch. The data only comes through useSelector. useDispatch is still needed because the component calls it when it mounts.
useSelector.mockImplementation((selector) => selector(fakeState)); // this is the same useSelector as in ArticlePage

const mockDispatch = vi.fn();
useDispatch.mockReturnValue(mockDispatch);

//rendering
render(<MemoryRouter initialEntries={["/articles/1"]}><ArticlePage/></MemoryRouter>);

// assertion
await waitFor(() => expect(mockDispatch).toHaveBeenCalled()) //waitFor when there is no userInteraction.
//clean up
cleanup();
})
})

/* 


Component mock does two things:
useDispatch — pretends dispatch fires (does nothing)
useSelector with fakeState — pretends the store already has the result the thunk would have returned
This skips the async fetch entirely. The thunk itself is tested separately in the slice tests where you mock fetch directly and run the thunk in isolation.


important:
MemoryRouter accepts initialEntries={["/articles/1"]} as a prop. This tells the router "pretend the current URL is /articles/1". ArticlePage then calls useParams() and gets { id: "1" } back. The if (id) guard passes, and dispatch fires. Without it, useParams returns {}, id is undefined, and dispatch is skipped

unlike HomePage, ArticlePage only dispatches if id exists, useParams looks for it in the url so we pass "/articles/1". 

*/