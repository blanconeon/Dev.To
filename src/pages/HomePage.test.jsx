import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import HomePage from "./HomePage";
import { describe, it, expect, vi } from 'vitest';
import { useSelector, useDispatch } from 'react-redux';


//mocking react-redux useSelector, useDispatch this lives outside the test. 
vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));


describe("homepage component", () => {
it("does page render title and description", ()=> {

const fakeState = {
  articles: {
    articlesList: [{ id: 1, title: "Test title", description: "Test description" }],
    isLoading: false,
  },
};
// homepage has a useSelector and a useDispatch. The data only comes through useSelector. useDispatch is still needed because the component calls it when it mounts.
useSelector.mockImplementation((selector) => selector(fakeState)); // this is the same useSelector as in HomePage

const mockDispatch = vi.fn();
useDispatch.mockReturnValue(mockDispatch);



// render component

render(<HomePage/>);

//assertions
const testTitle = screen.getByText("Test title");
expect(testTitle).toBeInTheDocument();

const testDescription = screen.getByText("Test description")
expect(testDescription).toBeInTheDocument();


})

})







/*
vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

const fakeState = {
  articles: {
    articlesList: [{ id: 1, title: "Test title", description: "Test description" }],
    isLoading: false,
  },
};

useSelector.mockImplementation((selector) => selector(fakeState));





vi.mock("react-redux", ...) replaces the real useSelector
useSelector: vi.fn() makes it a fake mock function
fakeState is your pretend Redux store data
useSelector.mockImplementation((selector) => selector(fakeState)) means:
when HomePage calls useSelector, run the selector on your fake state
then render(<HomePage />) makes the component read that fake data and render from it
*/


