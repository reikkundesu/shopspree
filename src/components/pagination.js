import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pageNumbers = [];
  const maxPagesToShow = 3;
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (totalPages > 1) {
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
      >
        Previous
      </button>
      
      {startPage > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="px-4 py-2 mx-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="px-4 py-2 mx-1 text-gray-500">...</span>
          )}
        </>
      )}
      
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 mx-1 rounded-lg ${page === currentPage ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          {page}
        </button>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-4 py-2 mx-1 text-gray-500">...</span>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            className="px-4 py-2 mx-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;