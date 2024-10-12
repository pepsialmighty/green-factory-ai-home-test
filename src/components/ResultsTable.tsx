import React from "react";
import { Book } from "../types";

interface ResultsTableProps {
  books: Book[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ books }) => {
  return (
    <table className="resultsTable">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>First Published</th>
          <th>Edition Count</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.key}>
            <td>{book.title}</td>
            <td>{book.author_name ? book.author_name[0] : "Unknown"}</td>
            <td>{book.first_publish_year || "Unknown"}</td>
            <td>{book.edition_count || "Unknown"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
