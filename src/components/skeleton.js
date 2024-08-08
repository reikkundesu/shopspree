import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-md animate-pulse">
      <div className="w-72 h-96 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
    </div>
  );
};

export default SkeletonCard;