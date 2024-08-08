import React, { useState, useEffect } from 'react';
import { API_URL } from '../variables/config';
import ProductCard from '../components/product_card';
import SkeletonCard from '../components/skeleton';

function Home() {

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(1); // Add totalPages state for pagination

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchResults = async (page) => {
    if (!searchTerm) return; // Do nothing if the search term is empty

    const apiUrl = `${API_URL}${encodeURIComponent(searchTerm)}&resultsFormat=native&page=${page}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('API Data:', data); // Log the API response data
      setIsLoading(false);
      setResults(data.results); // Store the results in the state
      setPagination(data.pagination); // Store pagination data in the state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchResults(currentPage);
    setIsLoading(true);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
    console.log (currentPage);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen pt-10 px-14">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to ShopSpree</h1>
      <p className="text-lg text-gray-600">Your one-stop shop for stress-free shopping spree!</p>

      <div className="flex space-x-5 pt-10">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search product..."
          className="border border-gray-300 rounded-lg px-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => fetchResults(currentPage)}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
        {!isLoading ? (
          results.map((product, index) => (
            <ProductCard
              key={index}
              title={product.name}
              description={product.description}
              imageUrl={product.imageUrl}
              price={product.price}
              msrp={product.msrp}
            />
          ))
        ) : (
          Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)
        )}
      </div>

      {/* Pagination Controls */}
      { 
        pagination.totalPages ? 
        <div className="mt-8 flex justify-between items-center space-x-3">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:bg-gray-200"
          >
            Previous
          </button>
          <span className="text-gray-800">Page {currentPage} of {pagination.totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === pagination.totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
        :
        null
      }
    </div>
  );
}

export default Home;
