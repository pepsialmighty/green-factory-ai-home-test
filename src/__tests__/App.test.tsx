import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// Mock child components
jest.mock("../components/Header", () => () => (
  <div data-testid="mock-header">Header</div>
));
jest.mock(
  "../components/LoginForm",
  () =>
    ({ onLogin }: { onLogin: (username: string) => void }) =>
      (
        <div data-testid="mock-login-form">
          <button onClick={() => onLogin("testuser")}>Login</button>
        </div>
      )
);
jest.mock("../components/SearchPage", () => () => (
  <div data-testid="mock-search-page">Search Page</div>
));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form when not authenticated", () => {
    render(<App />);
    expect(screen.getByTestId("mock-login-form")).toBeInTheDocument();
  });

  test("renders search page when authenticated", () => {
    localStorageMock.getItem.mockReturnValueOnce("testuser");
    render(<App />);
    expect(screen.getByTestId("mock-search-page")).toBeInTheDocument();
  });

  test("handles login correctly", async () => {
    render(<App />);
    await userEvent.click(screen.getByText("Login"));
    expect(screen.getByTestId("mock-search-page")).toBeInTheDocument();
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "username",
      "testuser"
    );
  });
});
