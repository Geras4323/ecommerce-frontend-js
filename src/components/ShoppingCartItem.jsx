import React from 'react';

import { AppContext } from '../contexts/AppContext';

function ShoppingCartItem({product, indexValue}) {
  const { removeFromCart } = React.useContext(AppContext);

  const handleRemove = item => {
    removeFromCart(item)
  }

  return (
    <div className="w-full flex flex-row my-3 items-center justify-between">
      <div className="w-3/4 flex flex-row items-center gap-4">
        <figure>
          <img src={product.images[0]} alt={product.title} className="w-16 h-16 rounded-2xl object-cover" />
        </figure>
        <p className="text-very-light-pink">{product.title}</p>
      </div>
      <div className="w-1/4 flex flex-row justify-end items-center gap-4 font-bold">
        <p className="w-auto">{`$ ${product.price}`}</p>
        <img
          src="/assets/icons/icon_close.png"
          alt="delete"
          className="hover:cursor-pointer"
          onClick={() => handleRemove(indexValue)}
        />
      </div>
    </div>
  );
}

export { ShoppingCartItem };