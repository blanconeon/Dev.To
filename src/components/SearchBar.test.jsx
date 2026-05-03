import SearchBar from "./SearchBar"
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from 'vitest';
import { useDispatch } from 'react-redux';
import userEvent from "@testing-library/user-event";
import { cleanup } from "@testing-library/react"

//mocking react-redux useDispatch this lives outside the test. 
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));



//test
describe("SearchBar component", () => {
it("does component render the form", ()=> {


//SearchBar has a useDispatch. useDispatch is still needed because the component calls it when it mounts.
const mockDispatch = vi.fn();
useDispatch.mockReturnValue(mockDispatch);

    //render component
render(<SearchBar/>)

//assertions

const testInputBox = screen.getByRole("textbox");
expect(testInputBox).toBeInTheDocument();

const testRadio = screen.getAllByRole("radio");
expect(testRadio).toHaveLength(2); //getAllByRole instead because there are two radio buttons, this returns an array and we check for its length.

const testButton = screen.getByRole("button");
expect(testButton).toBeInTheDocument();

cleanup();
})

it(" Component calls tag thunk with user interaction.", async ()=> {

const mockDispatch = vi.fn();
useDispatch.mockReturnValue(mockDispatch);
/*mockReturnValue(mockDispatch) means when the component calls useDispatch(), it gets back that fake function instead of the real one. So when handleSubmit calls dispatch(loadArticlesByTag(...)), it's actually calling mockDispatch — and you can then assert what it was called with.*/

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
expect(mockDispatch).toHaveBeenCalled();
//clean up
cleanup();
})

it("component calls username thunk with user interaction", async () => {
const mockDispatch = vi.fn();
useDispatch.mockReturnValue(mockDispatch);

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
expect(mockDispatch).toHaveBeenCalled();
//clean up
cleanup();

})

})







/* Exactly. mockDispatch is a dummy function that records calls. When handleSubmit runs and calls dispatch(loadArticlesByTag("react")), mockDispatch catches that call — but it doesn't actually execute the thunk. You're just confirming something was handed to dispatch. */