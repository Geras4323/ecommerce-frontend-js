import React from 'react';

function OrderDetailItem({ product }) {
  return (
    <div className="w-full flex flex-row mb-6 items-center justify-between">
      <div className="w-3/4 flex flex-row items-center gap-4">
        <figure>
          <img src={product.image} alt="bike" className="w-16 h-16 rounded-2xl object-cover" />
        </figure>
        <p className="text-very-light-pink">{product.name}</p>
      </div>
      <p className="w-1/4 text-md text-center font-bold">{`$ ${product.price.toFixed(2)}`}</p>
    </div>
  );
}

export default OrderDetailItem;