import React from "react";
import "./Pagination.css";

type PaginationProps = {
  usersPerPage: number;
  totalUsers: number;
  paginate: (number: number) => void;
  currentPage: number;
};

const Pagination = ({
  usersPerPage,
  totalUsers,
  paginate,
  currentPage,
}: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => {
        return (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={number === currentPage ? "active" : ""}
          >
            {number}
          </button>
        );
      })}
    </div>
  );
};
export default Pagination;
