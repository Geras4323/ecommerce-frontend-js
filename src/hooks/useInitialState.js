import React from 'react';

function useInitialState() {
  const [cart, setCart] = React.useState([]);
  const [isShoppingCartShown, setIsShoppingCartShown] = React.useState(false)
  const [isMenuShown, setIsMenuShown] = React.useState(false)

  function addToCart(product) {
    setCart([...cart, product]);
  }

  function removeFromCart(indexValue) {
    setCart(cart.filter((product, index) => index !== indexValue))
  }


  return {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    isShoppingCartShown,
    setIsShoppingCartShown,
    isMenuShown,
    setIsMenuShown
  };
}

export { useInitialState };