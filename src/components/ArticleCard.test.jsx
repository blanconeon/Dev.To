import ArticleCard from "./ArticleCard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from "react-router-dom";



describe("ArticleCard component", () => {
it ("Component renders", () => {
//fakeArticle
    const fakeArticle = { id: 1, title: "Test title", description: "Test description" }

    //render
render(<MemoryRouter><ArticleCard article={fakeArticle}/></MemoryRouter>)
//assertion
expect(screen.getByText("Test title")).toBeInTheDocument();

})
})