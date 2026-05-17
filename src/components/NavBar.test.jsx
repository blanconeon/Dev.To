import NavBar from "./NavBar";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

describe("NavBar", () => {

it("The link renders with the correct text", () => {

    // to summarise — mocking useDispatch in the NavBar test is not about testing dispatch behaviour, it's just to stop that connection attempt from crashing the test.
const mockDispatch = vi.fn();
useDispatch.mockReturnValue(mockDispatch);


// render
render(<MemoryRouter><NavBar/></MemoryRouter>);
//assert
expect(screen.getByText("Home")).toBeInTheDocument();
expect(screen.getByText("React")).toBeInTheDocument();
expect(screen.getByText("Top 7")).toBeInTheDocument();
expect(screen.getByText("Top 30")).toBeInTheDocument();
//cleanup
cleanup();
/* The order matters because useDispatch() is called the moment the component mounts (line 7 of SearchBar). So the mock must be in place before render fires, otherwise the component tries to connect to a real Redux store before the mock can intercept it.

The mockDispatch itself is never used in assertions — it's just there to give useDispatch something to return so it doesn't crash. */

})
 it('the link points to the correct URL', () => {
/* You're testing that the <a> tags in the DOM have the correct href paths — not full URLs. The browser constructs the full URL from those paths at runtime.*/



// same as above we mock the dispath that belongs to searchBar
const mockDispatch = vi.fn();
useDispatch.mockReturnValue(mockDispatch);

// render
render(<MemoryRouter><NavBar/></MemoryRouter>);

const link = screen.getAllByRole("link");
console.log(link[0].getAttribute("href")); //CONSOLE LOG REMOVE
//assertions
  expect(link[0]).toHaveAttribute("href", "/");
  expect(link[1]).toHaveAttribute("href", "/articles?tag=react");
  expect(link[2]).toHaveAttribute("href", "/articles?tag=javascript");
  expect(link[3]).toHaveAttribute("href", "/articles?top=7");
  expect(link[4]).toHaveAttribute("href", "/articles?top=30");
  //cleanup
  cleanup();
 });
})


