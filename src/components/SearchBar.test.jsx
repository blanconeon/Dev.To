import SearchBar from "./SearchBar"
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from 'vitest';
import { useDispatch } from 'react-redux';

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
})

})