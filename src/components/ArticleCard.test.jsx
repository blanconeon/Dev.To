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

  const link = screen.getByRole("link")
  //assertion
  expect(link).toBeInTheDocument();
  //assertion
  expect(link).toHaveAttribute("href", "/articles/1");
 //cleanup
cleanup()
})
})
/* what first test does: 
1render(<MemoryRouter><ArticleCard article={fakeArticle}/></MemoryRouter>) — renders the component with fake data
2React Router's <Link> renders as an <a> tag in the DOM
3screen.getByRole("link") — finds that <a> tag by its ARIA role
4expect(link).toBeInTheDocument() — confirms it exists in the DOM
5expect(link).toHaveAttribute("href", "/articles/1") — confirms the <a> tag has the correct URL built from fakeArticle.id

what second test does: 
1fakeArticle — creates fake data with id: 1
2render(...) — renders ArticleCard inside MemoryRouter with the fake article
3React converts <Link to="/articles/1"> into <a href="/articles/1"> in the DOM
4screen.getByRole("link") — searches the DOM for an element whose ARIA role is "link", which is the <a> tag
5expect(link).toBeInTheDocument() — confirms the <a> exists
6expect(link).toHaveAttribute("href", "/articles/1") — confirms the href equals /articles/1, built from fakeArticle.id

On the string thing — ARIA roles are a web standard defined as strings, not HTML tags. They exist separately from HTML because the same role can apply to different tags (a <div role="button"> has the same role as <button>). Testing Library adopted them because querying by role tests behaviour, not implementation.
*/ 
