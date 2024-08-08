import React from 'react';
import cartIcon from '../images/cart_icon.png'
import heartIcon from '../images/heart-icon.png'

function ProductCard({ title, imageUrl, price, msrp }) {

const formatPrice = (value) => parseFloat(value).toFixed(2);

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg shadow-md overflow-visible pb-12">

        {msrp > price && (
        <div className="absolute top-0 left-0 bg-indigo-600 text-white text-sm font-bold py-1 px-2 rounded-tr-lg rounded-br-lg transform -rotate-45 -translate-x-2 translate-y-2">
            On Sale
        </div>
        )}

        <img
        src={imageUrl}
        alt={title || 'Product Image'}
        className="w-full h-5/6 object-cover"
        />

        <div className="py-2 grid grid-cols-2 bg-gray-200">
        <button className="flex justify-center border-r-2 border-gray-300">
          <img
              src={heartIcon}
              alt="add to wishilist"
              className="h-6"
          />
        </button>
        <button className="flex justify-center">
          <img
            src={cartIcon}
            alt="add to cart"
            className="h-6"
          />
        </button>
        </div>

        <div className="pt-2 px-2">
          <h2 className=" text-sm font-bold text-gray-700 mb-2">{title || 'Product Title'}</h2>
          {
              msrp > price ?
              <div className="flex space-x-2 justify-center">
                  <p className="text-lg font-semibold text-gray-400 line-through">${formatPrice(msrp) || '0.00'}</p>
                  <p className="text-lg font-semibold text-gray-700 ">${formatPrice(price) || '0.00'}</p>
              </div>
              :
              <p className="text-lg font-semibold text-gray-700">${formatPrice(price) || '0.00'}</p>
          }
        </div>
    </div>
  );
}

export default ProductCard;