import React from 'react';

function ProductCard({ title, imageUrl, price, msrp }) {

const formatPrice = (value) => parseFloat(value).toFixed(2);

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg shadow-md overflow-visible pb-5">

        {msrp > price && (
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-sm font-bold py-1 px-2 rounded-tr-lg rounded-br-lg transform -rotate-45 -translate-x-2 translate-y-2">
            On Sale
        </div>
        )}

        <img
        src={imageUrl}
        alt={title || 'Product Image'}
        className="w-full h-5/6 object-cover"
        />
        <div className="p-4">

        <h2 className=" text-sm font-bold text-gray-800 mb-2">{title || 'Product Title'}</h2>
        {
            msrp > price ?
            <div className="flex space-x-2 justify-center">
                <p className="text-lg font-semibold text-gray-400 line-through">${formatPrice(msrp) || '0.00'}</p>
                <p className="text-lg font-semibold text-gray-800 ">${formatPrice(price) || '0.00'}</p>
            </div>
            :
            <p className="text-lg font-semibold text-gray-800">${formatPrice(price) || '0.00'}</p>
        }
        </div>
    </div>
  );
}

export default ProductCard;