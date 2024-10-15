import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import ResultsTable from "./ResultsTable";
import Pagination from "./Pagination";
import { Book } from "../types";
import { useDebounce } from "../hooks/useDebounce";

interface SearchPageProps {
  updateAverageSearchDuration: (duration: number) => void;
}

const SEARCH_URL = "https://openlibrary.org/search.json";

const SearchPage: React.FC<SearchPageProps> = ({
  updateAverageSearchDuration,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const resultsPerPage = 10;

  const searchBooks = useCallback(
    async (query: string, page: number = 1) => {
      if (!query) {
        setBooks([]);
        setTotalResults(0);
        return;
      }

      setLoading(true);
      setError(null);
      const startTime = performance.now();

      try {
        const response = await axios.get(SEARCH_URL, {
          params: {
            q: query,
            page,
            limit: resultsPerPage,
          },
        });

        const endTime = performance.now();
        const duration = endTime - startTime;
        updateAverageSearchDuration(duration);

        setBooks(response.data.docs);
        setTotalResults(response.data.numFound);
        setCurrentPage(page);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            setError(
              `Error ${err.response.status}: ${err.response.data.message}`
            );
          } else if (err.request) {
            setError(
              "No response received from the server. Please try again later."
            );
          } else {
            setError("An unexpected error occurred. Please try again later.");
          }
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    },
    [updateAverageSearchDuration]
  );

  useEffect(() => {
    searchBooks(debouncedSearchQuery, currentPage);
  }, [debouncedSearchQuery, currentPage]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="searchContainer">
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="tableContainer">
          <ResultsTable books={books} />
          <Pagination
            currentPage={currentPage}
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
