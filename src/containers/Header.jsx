import React from 'react';
import Cookies from 'js-cookie';

import Link from 'next/link';

import { MobileMenu } from '../components/MobileMenu';
import { DesktopMenu } from '../components/DesktopMenu';
import { verifyToken } from 'src/utils/verifyToken';

import { ShoppingCart } from '../components/ShoppingCart';

import { AppContext } from '../contexts/AppContext';
import { api } from 'src/utils/axiosConnection';


function Header() {
  const [email, setEmail] = React.useState();
  const {
    cart,
    isShoppingCartShown,
    setIsShoppingCartShown,
    isMenuShown,
    setIsMenuShown
  } = React.useContext(AppContext);


  React.useEffect(() => {
    async function getMail() {
      const login_token = Cookies.get('login-token');
      const { sub: userId } = await verifyToken(login_token);
      const { data } = await api.get(`/users/${userId}`);
      setEmail(data.email);
    }
    getMail();
  }, [])


  const handleShowMenu = () => {
    setIsMenuShown(!isMenuShown);
    setIsShoppingCartShown(false);
  }

  const handleShowShoppingCart = () => {
    setIsShoppingCartShown(!isShoppingCartShown);
    setIsMenuShown(false);
  }



  return (
    <nav className="fixed top-0 left-0 right-0  bg-white z-10 flex justify-between px-6 border-b border-b-very-light-pink">
      <img
        src="/assets/icons/icon_menu.svg" alt="menu"
        className="md:hidden   hover:cursor-pointer"
        onClick={handleShowMenu}
        />

      <div className="flex">
        <Link href="/">
          <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-24   hover:cursor-pointer" />
        </Link>
        <ul className="p-0 m-0 hidden   md:flex items-center h-16 ml-3 text-very-light-pink">
          <li>
            <a href="#" className="Header_Item">All</a>
          </li>
          <li>
            <a href="#" className="Header_Item">Clothes</a>
          </li>
          <li>
            <a href="#" className="Header_Item">Electronics</a>
          </li>
          <li>
            <a href="#" className="Header_Item">Furniture</a>
          </li>
          <li>
            <a href="#" className="Header_Item">Toys</a>
          </li>
          <li>
            <a href="#" className="Header_Item">Others</a>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <ul className="p-0 m-0 flex items-center h-16">
          <li
            className="text-very-light-pink text-sm mr-3 hidden   md:block   hover:cursor-pointer hover:text-hospital-green"
            onClick={handleShowMenu}
          >
            {email}
          </li>
          {isMenuShown ? <DesktopMenu /> : null}
          {isMenuShown ? <MobileMenu email={email} /> : null}
          <li
            className="relative   hover:cursor-pointer"
            onClick={handleShowShoppingCart}
          >
            <img src="/assets/icons/icon_shopping_cart.svg" alt="shopping cart" />
            {cart.length > 0
              && <div className="w-4 h-4 bg-hospital-green rounded-full text-sm font-bold absolute -top-1 -right-1 flex justify-center items-center">
                  {cart.length}
                </div>
            }
          </li>
          {isShoppingCartShown ? <ShoppingCart closeShoppingCart={handleShowShoppingCart}/> : null}
        </ul>
      </div>

    </nav>
  );
}

export { Header };