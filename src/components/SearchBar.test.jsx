import SearchBar from "./SearchBar"
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useDispatch } from 'react-redux';
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";

//mocking react-redux useDispatch this lives outside the test. 
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));
 
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn()
}))
  



//test
describe("SearchBar component", () => {
 // clean up 
afterEach(cleanup);
it("does component render the form", ()=> {


//SearchBar has a useNavigate hok invoked on mount. useNavigate still needs to be mocked because the component calls it when it mounts.
const mockUseNavigate = vi.fn();
useNavigate.mockReturnValue(mockUseNavigate);

    //render component
render(<SearchBar/>) // SearchBar has no Router hooks, so no MemoryRouter needed

//assertions

const testInputBox = screen.getByRole("textbox");
expect(testInputBox).toBeInTheDocument();

const testRadio = screen.getAllByRole("radio");
expect(testRadio).toHaveLength(2); //getAllByRole instead because there are two radio buttons, this returns an array and we check for its length.

const testButton = screen.getByRole("button");
expect(testButton).toBeInTheDocument();


})

it(" .", async ()=> {

const mockUseNavigate = vi.fn();
useNavigate.mockReturnValue(mockUseNavigate);
/*mockReturnValue(useNavigate) means when the component calls useNvigate(), it gets back that fake function instead of the real one when handleSubmit calls it.*/

render(<SearchBar/>);

//Below mimics user typing a tag, selecting tag radio and pressing search. 
//get the elements
const inputBox = screen.getByRole("textbox");
const radioBoxes = screen.getAllByRole("radio");// get all radios
const searchButton = screen.getByRole("button");
// moc user
await userEvent.type(inputBox, "react");
await userEvent.click(radioBoxes[0]);// click the first radio
await userEvent.click(searchButton);

// assertion
expect(mockUseNavigate).toHaveBeenCalledWith('/articles?tag=react');

})

it("component calls username useNavigate() with user interaction", async () => {
const mockUseNavigate = vi.fn();
useNavigate.mockReturnValue(mockUseNavigate);

render(<SearchBar/>)

//get the elements
const inputBox = screen.getByRole("textbox");
const radioBoxes = screen.getAllByRole("radio");// get all radios
const searchButton = screen.getByRole("button");

// moc user
await userEvent.type(inputBox, "jeffrey");
await userEvent.click(radioBoxes[1]);
await userEvent.click(searchButton);

// assertion
expect(mockUseNavigate).toHaveBeenCalledWith("/articles?username=jeffrey");


})

})







/* Yes Exactly. mockDispatch is a dummy function that records calls. When handleSubmit runs and calls dispatch(loadArticlesByTag("react")), mockDispatch catches that call — but it doesn't actually execute the thunk. You're just confirming something was handed to dispatch. */