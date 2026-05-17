import { describe, it, expect } from "vitest";
import { CommentList } from "./CommentsList";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";



describe ("CommentsList Component", () => {
it("Component renders comments passed in props", () => {
//fake comment
const fakeComment = {type_of: 'comment', id_code: 3, body_html: '<p> this is my comment<p>'};
// render
render(<CommentList comment={fakeComment}/>)
//assert
expect(screen.getByText("this is my comment")).toBeInTheDocument();
//cleanup
cleanup();
})
})