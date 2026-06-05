import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import ProfilePage from "./ProfilePage";
import { describe, it, expect, vi } from 'vitest';
import { useSelector, useDispatch } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

//mocking react-redux useSelector, useDispatch this lives outside the test. 
vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

describe("ProfilePage test", ()=> {
it("component renders", () => {

const fakeState = {
    profile: {
    selectedProfile: {twitter_username: "obetomuniz", type_of: "user", username: "obetomuniz", joined_at: "31/12/1999"} ,
    isLoading: false,
    error:false
}, articles: {
    articlesList: [],
    isLoading: false,
    error: false
    }}

//mock selector mocks both the profile and the articles selector used in the component, thats why fake state holds both profile and articles
useSelector.mockImplementation((selector) => selector(fakeState));
// mockDispatch
const mockDispatch = vi.fn();
useDispatch.mockReturnValue(mockDispatch);

//render

render(<MemoryRouter><ProfilePage/></MemoryRouter>)
// assertions
const profileTest = screen.getByText("Joined on 31/12/1999");
expect(profileTest).toBeInTheDocument();

cleanup();
})



it("dispatch in component is triggered", async ()=> {

const fakeState = {
    profile: {
    selectedProfile: {twitter_username: "obetomuniz", type_of: "user", username: "obetomuniz", joined_at: "31/12/1999"} ,
    isLoading: false,
    error:false
}, articles: {
    articlesList: [],
    isLoading: false,
    error: false
    }}
    
useSelector.mockImplementation((selector) => selector(fakeState));    

const mockDispatch = vi.fn();
useDispatch.mockReturnValue(mockDispatch);

/*useParams only returns a value when rendered inside a router with a matching route path. MemoryRouter + Routes + Route + initialEntries simulates the URL so useParams can extract the param — without it username is undefined and the useEffect never dispatches.*/

//rendering
render(<MemoryRouter initialEntries={["/profile/jess"]}>
  <Routes>
    <Route path="/profile/:username" element={<ProfilePage/>} />
  </Routes>
</MemoryRouter>
);

// assertion
await waitFor(() => expect(mockDispatch).toHaveBeenCalled()) //waitFor when there is no userInteraction.
//clean up
cleanup();

/* "The value in initialEntries (e.g. '/profile/obetomuniz') is matched against the Route path='/profile/:username' — React Router extracts 'obetomuniz' as the username param. The actual data rendered comes from fakeState, not from this value — it just needs to be a valid string that satisfies the route pattern.

 in practice initialEntries={["/profile/obetomuniz"]} makes :username equal "obetomuniz". That's the value useParams returns, which then gets passed to dispatch. The fakeState is separate — it controls what the selectors return, not what the URL say
*/

})

it("renders loading state", () => {
  const fakeState = {
    profile: { 
        selectedProfile: null, 
        isLoading: true, 
        error: false },
    articles: { 
        articlesList: [], 
        isLoading: false, 
        error: false }
  };
  useSelector.mockImplementation((selector) => selector(fakeState));
  useDispatch.mockReturnValue(vi.fn());
  render(<MemoryRouter><ProfilePage /></MemoryRouter>);
  expect(screen.getByText("Is loading..")).toBeInTheDocument();
  cleanup();
});

it("renders no results state", () => {
  const fakeState = {
    profile: { 
        selectedProfile: null, 
        isLoading: false, 
        error: false },
    articles: { 
        articlesList: [], 
        isLoading: false, 
        error: false }
  };
  useSelector.mockImplementation((selector) => selector(fakeState));
  useDispatch.mockReturnValue(vi.fn());
  render(<MemoryRouter><ProfilePage /></MemoryRouter>);
  expect(screen.getByText("No results")).toBeInTheDocument();
  cleanup();
});

 it("profile renders: something went wrong ", ()=> {
const fakeState = {
    profile: { 
        selectedProfile: null, 
        isLoading: false, 
        error: true }, // renders "something went wrong"
    articles: { 
        articlesList: [], 
        isLoading: false, 
        error: "error message" } // not this error
  };
  useSelector.mockImplementation((selector) => selector(fakeState));
  useDispatch.mockReturnValue(vi.fn());
  render(<MemoryRouter><ProfilePage /></MemoryRouter>);
  expect(screen.getByText("Something went wrong..")).toBeInTheDocument();
  cleanup();
 })

 it("articles renders error message ", ()=> {
const fakeState = {
    profile: { 
        selectedProfile: {twitter_username: "obetomuniz", type_of: "user", username: "obetomuniz", joined_at: "31/12/1999"}, 
        isLoading: false, 
        error: false }, 
    articles: { 
        articlesList: [], 
        isLoading: false, 
        error: "error message" } // not this error
  };
  useSelector.mockImplementation((selector) => selector(fakeState));
  useDispatch.mockReturnValue(vi.fn());
  render(<MemoryRouter><ProfilePage /></MemoryRouter>);
  expect(screen.getByText("error message")).toBeInTheDocument();
  cleanup();
 })

it("component renders profile's articles", () => {

const fakeState = {
    profile: {
    selectedProfile: {twitter_username: "obetomuniz", type_of: "user", username: "obetomuniz", joined_at: "31/12/1999"} ,
    isLoading: false,
    error:false
}, articles: {
    articlesList: [{ id: 1, title: "Test title", description: "Test description" }],
    isLoading: false,
    error: false
    }}

//mock selector mocks both the profile and the articles selector used in the component, thats why fake state holds both profile and articles
useSelector.mockImplementation((selector) => selector(fakeState));
// mockDispatch
const mockDispatch = vi.fn();
useDispatch.mockReturnValue(mockDispatch);

//render

render(<MemoryRouter><ProfilePage/></MemoryRouter>)
// assertions
const profileTest = screen.getByText("Test title");
expect(profileTest).toBeInTheDocument();

cleanup();
})

it("Next/Prev buttons — they render and Prev is disabled on page 1, Next is disabled when less than 30 articles", ()=> {

const fakeState = {
  profile: {
    selectedProfile: { twitter_username: "obetomuniz", type_of: "user", username: "obetomuniz", joined_at: "31/12/1999" },
    isLoading: false,
    error: false
  },
  articles: {
    articlesList: [
      { id: 1, title: 'a' },
      { id: 2, title: 'b' },
      { id: 3, title: 'c' },
      { id: 4, title: 'd' },
      { id: 5, title: 'e' }
    ],
    isLoading: false,
    error: null
  },
};

//useSelector and useDispatch are React hooks called inside HomePage on every render.
useSelector.mockImplementation((selector) => selector(fakeState)); 

const mockDispatch = vi.fn();
useDispatch.mockReturnValue(mockDispatch);

// render
render(<MemoryRouter><ProfilePage/></MemoryRouter>);
//get the elements
const buttons = screen.getAllByRole("button");

//assert

expect(buttons[0]).toBeInTheDocument();//Prev button
expect(buttons[1]).toBeInTheDocument();//Next button

expect(buttons[0]).toBeDisabled()//Prev button is disabled
expect(buttons[1]).toBeDisabled()//Next button is disabled
})
})

/* 
When testing a component that maps over a list, one item in the fake array is sufficient — the goal is to verify the mapping logic works, not to replicate production data volume. If the component renders one item correctly, it will render many
*/