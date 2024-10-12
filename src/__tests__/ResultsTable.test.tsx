import React from "react";
import { render, screen } from "@testing-library/react";
import ResultsTable from "../components/ResultsTable";

describe("ResultsTable Component", () => {
  const mockBooks = [
    {
      key: "1",
      title: "Book 1",
      author_name: ["Author 1"],
      first_publish_year: 2000,
      edition_count: 2,
    },
    {
      key: "2",
      title: "Book 2",
      author_name: ["Author 2"],
      first_publish_year: 2010,
      edition_count: 1,
    },
    { key: "3", title: "Book 3", first_publish_year: 2020, edition_count: 3 },
  ];

  test("renders table with correct data", () => {
    render(<ResultsTable books={mockBooks} />);

    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Author 1")).toBeInTheDocument();
    expect(screen.getByText("2000")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    expect(screen.getByText("Book 2")).toBeInTheDocument();
    expect(screen.getByText("Author 2")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();

    expect(screen.getByText("Book 3")).toBeInTheDocument();
    expect(screen.getByText("Unknown")).toBeInTheDocument(); // For missing author
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("renders empty table when no books are provided", () => {
    render(<ResultsTable books={[]} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.queryByRole("row")).not.toBeInTheDocument();
  });
});
