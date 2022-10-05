import React from 'react';

function MyOrderItem({ product }) {
  return (
    <div className="w-full flex flex-row mb-6 items-center justify-between">
      <div className="flex flex-row items-center gap-4">
        <figure>
          <img src={product.images[0]} alt="bike" className="w-16 h-16 rounded-2xl object-cover" />
        </figure>
        <p className="text-very-light-pink">{product.title}</p>
      </div>
      <p className="text-md font-bold mr-4">{product.price}</p>
    </div>
  );
}

export { MyOrderItem };