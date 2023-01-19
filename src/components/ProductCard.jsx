import React from 'react';


import { AppContext } from '../contexts/AppContext';

import { ProductDetail } from './ProductDetail';

function ProductCard({ product, logged=false }) {
  const { cart, addToCart, setIsShoppingCartShown } = React.useContext(AppContext);

  const [isAdded, setIsAdded] = React.useState(false)
  const [isDetailShown, setIsDetailShown] = React.useState(false)


  const handleAddProduct = (item) => {
    addToCart(item);
  }

  const handleShowDetail = () => {
    setIsDetailShown(!isDetailShown)
    setIsShoppingCartShown(false)
  }

  // Updates ProductCard addToCart button depending on if it is in the shopping cart
  React.useEffect(() => {
    setIsAdded(cart.some((item) => item === product))
  })



  return (
    <div className="w-36 border-b border-very-light-pink rounded-xl pb-3   sm:w-60">
      <img
        src={product.image}
        alt={product.name}
        className="w-36 h-36 rounded-2xl object-cover border-b border-r border-border shadow-md   hover:cursor-pointer   sm:w-60 sm:h-60"
        onClick={handleShowDetail}
      />
      {isDetailShown &&
        <ProductDetail
          product={product}
          handleAddProduct={handleAddProduct}
          isAdded={isAdded}
          setIsDetailShown={setIsDetailShown}
          logged={logged}
        />
      }
      <div className="flex justify-between items-start mt-3   sm:items-center">
        <div>
          <p className="font-bold text-md mt-0 mb-1">{`$ ${product.price}`}</p>
          <p className="text-sm text-gray-500 my-0 w-24   sm:w-full sm:text-base">{product.name}</p>
        </div>
        {logged &&
          <div>
            {!isAdded
              ? <figure
                  onClick={() => handleAddProduct(product)}
                  className="m-0   hover:cursor-pointer">
                  <img src="/assets/icons/bt_add_to_cart.svg" />
                </figure>
              : <figure
                  className="m-0 rounded-full border-b border-b-very-light-pink">
                  <img src="/assets/icons/bt_added_to_cart.svg" />
                </figure>
            }
          </div>
        }
        {/* <figure
          onClick={() => handleClick(product)}
          className="m-0   hover:cursor-pointer">
          <img
            src={!isAdded ? "/assets/icons/bt_add_to_cart.svg" : "/assets/icons/bt_added_to_cart.svg"}
            className="w-9 h-9"
          />
        </figure> */}
      </div>
    </div>
  );
}

export { ProductCard };