import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchPage from "../components/SearchPage";

jest.mock("axios");
import axios from "axios";
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SearchPage Component", () => {
  const mockUpdateAverageSearchDuration = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders search form and handles search", async () => {
    const mockResponse = {
      data: {
        docs: [
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
        ],
        numFound: 2,
      },
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    render(
      <SearchPage
        updateAverageSearchDuration={mockUpdateAverageSearchDuration}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search for books...");
    fireEvent.change(searchInput, { target: { value: "test query" } });

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://openlibrary.org/search.json",
        {
          params: { q: "test query", page: 1, limit: 10 },
        }
      );
    });

    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();
    expect(mockUpdateAverageSearchDuration).toHaveBeenCalled();
  });

  test("handles API error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

    render(
      <SearchPage
        updateAverageSearchDuration={mockUpdateAverageSearchDuration}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search for books...");
    fireEvent.change(searchInput, { target: { value: "error query" } });

    await waitFor(() => {
      expect(
        screen.getByText(
          "An error occurred while fetching books. Please try again."
        )
      ).toBeInTheDocument();
    });
  });
});
