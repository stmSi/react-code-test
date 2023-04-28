import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { PostDetails } from "./PostDetails";
import { MemoryRouter, useParams } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

test("renders PostDetails component", () => {
  (useParams as jest.Mock).mockReturnValue({ id: "1" });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <PostDetails />
      </MemoryRouter>
    </Provider>,
  );

  const returnToPostListButton = screen.getByText(/Return to Post List/i);
  expect(returnToPostListButton).toBeInTheDocument();
});
