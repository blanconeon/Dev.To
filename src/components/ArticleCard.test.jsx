import ArticleCard from "./ArticleCard";
import { cleanup, render, screen } from "@testing-library/react";
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
//cleanup
cleanup()
})

it ("Confirming that the Link exists", () => {
//fakeArticle
    const fakeArticle = { id: 1, title: "Test title", description: "Test description" }

    //render
  render(<MemoryRouter><ArticleCard article={fakeArticle}/></MemoryRouter>)
  //assertion
  expect(screen.getByRole("link")).toBeInTheDocument
 //cleanup
cleanup()
})
})
//FINISH UP TESTING THE URL IN THE HREF CONTANED IN THE LINK POINT STO THE RIGHT DIRECTION
//expect(link).toHaveAttribute("href", "/articles/1")
/* const link = screen.getByRole("link");
expect(link).toBeInTheDocument();
expect(link).toHaveAttribute("href", "/articles/1");
*/