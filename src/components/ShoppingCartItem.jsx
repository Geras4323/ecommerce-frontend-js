import React from 'react';

import { AppContext } from '../contexts/AppContext';

function ShoppingCartItem({product, indexValue}) {
  const { removeFromCart } = React.useContext(AppContext);

  const handleRemove = item => {
    removeFromCart(item)
  }

  return (
    <div className="w-full flex flex-row py-3 items-center justify-between   border-b border-very-light-pink">
      <div className="w-3/4 flex flex-row items-center gap-4">
        <figure>
          <img src={product.image} alt={product.name} className="w-16 h-16 rounded-2xl object-cover border-b border-r border-border shadow-md" />
        </figure>
        <p className="text-very-light-pink">{product.name}</p>
      </div>

      <div className="w-1/4 flex flex-row justify-end items-center gap-4 font-bold">
        <p className="w-auto">{`$ ${product.price.toFixed(2)}`}</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='w-3 fill-current text-gray-400   hover:cursor-pointer' onClick={() => handleRemove(indexValue)}>
          <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
        </svg>
      </div>
    </div>
  );
}

export { ShoppingCartItem };