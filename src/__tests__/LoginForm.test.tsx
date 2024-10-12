import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../components/LoginForm";
import { authenticateUser } from "../utils/auth";

jest.mock("../utils/auth", () => ({
  authenticateUser: jest.fn(),
}));

describe("LoginForm Component", () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form", () => {
    render(<LoginForm onLogin={mockOnLogin} />);
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("handles successful login", () => {
    (authenticateUser as jest.Mock).mockReturnValueOnce({
      username: "testuser",
      password: "password",
    });
    render(<LoginForm onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(authenticateUser).toHaveBeenCalledWith("testuser", "password");
    expect(mockOnLogin).toHaveBeenCalledWith("testuser");
  });

  test("handles failed login", () => {
    (authenticateUser as jest.Mock).mockReturnValueOnce(null);
    render(<LoginForm onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      screen.getByText("Invalid username or password")
    ).toBeInTheDocument();
    expect(mockOnLogin).not.toHaveBeenCalled();
  });
});
