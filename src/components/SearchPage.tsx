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

const SearchPage: React.FC<SearchPageProps> = ({
  updateAverageSearchDuration,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
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
        const response = await axios.get(
          `https://openlibrary.org/search.json`,
          {
            params: {
              q: query,
              page,
              limit: resultsPerPage,
            },
          }
        );

        const endTime = performance.now();
        const duration = endTime - startTime;
        updateAverageSearchDuration(duration);

        setBooks(response.data.docs);
        setTotalResults(response.data.numFound);
        setCurrentPage(page);
      } catch (err) {
        setError("An error occurred while fetching books. Please try again.");
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

  // for testing purpise while api crashed
  const dumbBook: Book[] = [
    {
      key: "1",
      title: "title 1",
      author_name: ["author 1"],
      first_publish_year: 1999,
      edition_count: 1,
    },
    {
      key: "2",
      title: "title 2",
      author_name: ["author 2"],
      first_publish_year: 2999,
      edition_count: 2,
    },
    {
      key: "3",
      title: "title 3",
      author_name: ["author 3"],
      first_publish_year: 3999,
      edition_count: 3,
    },
  ];

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
