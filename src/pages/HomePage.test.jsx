import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./HomePage";
import { describe, it, expect, vi } from 'vitest';

describe("homepage component", () => {
it("does page render title and description", async ()=> {
render(<HomePage/>);


const articles = getByText(/some text/i);
expect(articles).toBeInTheDocument();
})

})
