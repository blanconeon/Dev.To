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
})