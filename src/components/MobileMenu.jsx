import React from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

import { AppContext } from 'src/contexts/AppContext';


function MobileMenu({ email, setCategory }) {
  const { setIsMenuShown } = React.useContext(AppContext);

  function handleSignOut() {
    Cookies.remove('login-token');
    window.location.href = '/auth/login';
  }

  function handleChangeCategory(categoryID) {
    setCategory(categoryID);
    setIsMenuShown(false);
  }


  return (
    <div className="bg-white w-screen h-screen p-6 border-t border-t-very-light-pink fixed left-0 top-16 z-10  md:hidden">
      <ul className={`m-6 ${email && 'border-b'} border-very-light-pink`}>
        <li className="mb-5">
          <span className="MobileMenu_Item">CATEGORIES</span>
        </li>
        <li className="mb-5">
          <div onClick={() => handleChangeCategory(0)} className="MobileMenu_Item">All</div>
        </li>
        <li className="mb-5">
          <div onClick={() => handleChangeCategory(3)} className="MobileMenu_Item">Bath</div>
        </li>
        <li className="mb-5">
          <div onClick={() => handleChangeCategory(2)} className="MobileMenu_Item">Clothes</div>
        </li>
        <li className="mb-5">
          <div onClick={() => handleChangeCategory(1)} className="MobileMenu_Item">Electronics</div>
        </li>
        <li className="mb-5">
          <div onClick={() => handleChangeCategory(5)} className="MobileMenu_Item">Furniture</div>
        </li>
        <li className="mb-5">
          <div onClick={() => handleChangeCategory(4)} className="MobileMenu_Item">Lighting</div>
        </li>
      </ul>

      {email &&
        <ul className="m-6">
          <li className="mb-5">
            <p className="text-md text-gray-500">{email}</p>
          </li>
          <li className="mb-5">
            <Link href="/my-orders" className="MobileMenu_Item">My orders</Link>
          </li>
          <li className="mb-5">
            <Link href="/auth/my-account" className="MobileMenu_Item">My account</Link>
          </li>
          <li className="mb-5">
            <span
              onClick={handleSignOut}
              className="text-base text-hospital-green font-bold cursor-pointer"
            >
              Sign out
            </span>
          </li>
        </ul>
      }
    </div>
  );
}

export { MobileMenu };