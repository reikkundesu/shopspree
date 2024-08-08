import React, { useState, useEffect } from 'react';
import { SEARCH_API_URL } from '../variables/config';
import ProductCard from '../components/product_card';
import SkeletonCard from '../components/skeleton';
import logo from '../images/logo.png'
import logoWhite from '../images/logo-white.png'
import cartIcon from '../images/cart_icon.png'
import instagramIcon from '../images/instagram_icon.png'
import fbIcon from '../images/facebook_icon.png'

function Home() {

  const [searchTerm, setSearchTerm] = useState('jeans') //set to default search "jeans" since there is no landing page;
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(1); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchResults = async (page) => {
    if (!searchTerm) return; 

    const apiUrl = `${SEARCH_API_URL}${encodeURIComponent(searchTerm)}&resultsFormat=native&page=${page}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setIsLoading(false);
      console.log(data);
      setResults(data.results); // Store the results in the state
      setPagination(data.pagination); // Store pagination data in the state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchResults(currentPage);
    window.scrollTo(0, 0);
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
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen px-20">

        <img
          src={logo}
          alt="Logo"
          className="h-32 left-0 absolute"
        />

        <img
          src={cartIcon}
          alt="cart"
          className="h-9 mt-14 right-10 absolute"
        />

      <div>
        <h1 className="text-4xl font-bold text-gray-700 mt-5">Welcome to ShopSpree</h1>
        <p className="text-lg text-gray-600 m-5">Your one-stop shop for stress-free shopping sprees!</p>
      </div>  

      <div className="flex w-screen border-t-4 border-indigo-700 px-10 py-7 pt-8 bg-indigo-900 items-center justify-between">

  {/* Left Section: Heading */}
  <h1 className="text-2xl font-bold text-gray-100">
    SHOWING {pagination?.end} OF {pagination?.totalResults} RESULTS
  </h1>

  {/* Middle Section: Navigation Buttons */}
  <div className="flex space-x-4">
    <button className="bg-indigo-700 font-bold border-b-4 border-white text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
      HOME
    </button>
    <button className="bg-indigo-700 font-bold text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
      NEW ARRIVALS
    </button>
    <button className="bg-indigo-700 font-bold text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
      CATEGORIES
    </button>
  </div>

  {/* Right Section: Search Bar and Button */}
  <div className="flex items-center space-x-4">
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Search product..."
      className="border border-gray-300 w-80 rounded-lg px-4 py-2 text-left placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={() => {
        setCurrentPage(1); // Reset to the first page
        fetchResults(1);
      }}
      className="bg-indigo-700 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Search
    </button>
  </div>
</div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8">
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
          Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
        )}
      </div>

      {/* Next and Previous Buttons */}
      { 
        pagination.totalPages ? 
        <div className="mt-8 flex justify-between items-center space-x-3">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:bg-gray-200"
          >
            Previous
          </button>
          <span className="text-gray-700">Page {currentPage} of {pagination.totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === pagination.totalPages}
            className="px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
        :
        null
      }
      <div className="mt-8 py-5 border-t-4 border-indigo-700 bg-indigo-900 w-screen items-center">
        <div className="flex justify-center space-x-12 items-center">
          <img
            src={fbIcon}
            alt="Logo"
            className="h-16"
          />
          <img
            src={logoWhite}
            alt="Logo"
            className=" h-24"
          />
          <img
            src={instagramIcon}
            alt="Logo"
            className="h-16"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
