import React from 'react';
import Cookies from 'js-cookie';

import Link from 'next/link';

import { MobileMenu } from '../components/MobileMenu';
import { DesktopMenu } from '../components/DesktopMenu';
import { ShoppingCart } from '../components/ShoppingCart';

import { AppContext } from '../contexts/AppContext';


function Header({ email, setCategory }) {
  const {
    cart,
    isShoppingCartShown,
    setIsShoppingCartShown,
    isMenuShown,
    setIsMenuShown
  } = React.useContext(AppContext);


  const handleShowMenu = () => {
    setIsMenuShown(!isMenuShown);
    setIsShoppingCartShown(false);
  }

  const handleShowShoppingCart = () => {
    setIsShoppingCartShown(!isShoppingCartShown);
    setIsMenuShown(false);
  }



  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-10 flex justify-between px-6 border-b border-b-very-light-pink shadow-md">
      <img
        src="/assets/icons/icon_menu.svg" alt="menu"
        className="md:hidden   hover:cursor-pointer"
        onClick={handleShowMenu}
        />

      <div className="flex">
        <Link href="/">
          <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-24   hover:cursor-pointer" />
        </Link>
        <ul className="p-0 m-0 h-16 ml-3 hidden items-center text-gray-400   md:flex md:flex-row md:gap-1">
          <li>
            <div onClick={() => setCategory(0)} className="Header_Item">All</div>
          </li>
          <li>
            <div onClick={() => setCategory(3)} className="Header_Item">Bath</div>
          </li>
          <li>
            <div onClick={() => setCategory(2)} className="Header_Item">Clothes</div>
          </li>
          <li>
            <div onClick={() => setCategory(1)} className="Header_Item">Electronics</div>
          </li>
          <li>
            <div onClick={() => setCategory(5)} className="Header_Item">Furniture</div>
          </li>
          <li>
            <div onClick={() => setCategory(4)} className="Header_Item">Lighting</div>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <ul className="p-0 m-0 flex items-center h-16">
          {email
            ? <div className="p-0 m-0 flex items-center h-16">
                <li
                    className="text-gray-500 text-base mr-3 hidden   md:block   hover:cursor-pointer hover:text-hospital-green"
                    onClick={handleShowMenu}
                  >
                    {email}
                  </li>
                  <li
                    className="relative   hover:cursor-pointer"
                    onClick={handleShowShoppingCart}
                  >
                  <img src="/assets/icons/icon_shopping_cart.svg" className='drop-shadow-lg' alt="shopping cart" />
                  {cart.length > 0
                    && <div className="w-4 h-4 bg-hospital-green rounded-full text-sm font-bold absolute -top-1 -right-1 flex justify-center items-center">
                        {cart.length}
                      </div>
                  }
                </li>
              </div>
            : <Link href='/auth/login'><a className='mr-3 text-base font-bold text-hospital-green'>Login</a></Link>
          }
          {isMenuShown ? <DesktopMenu /> : null}
          {isMenuShown ? <MobileMenu email={email} setCategory={setCategory} /> : null}
          {isShoppingCartShown ? <ShoppingCart closeShoppingCart={handleShowShoppingCart}/> : null}
        </ul>
      </div>

    </nav>
  );
}

export { Header };