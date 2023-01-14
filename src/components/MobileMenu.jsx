import React from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

function MobileMenu({ email }) {

  function handleSignOut() {
    Cookies.remove('login-token');
    window.location.href = '/auth/login';
  }

  return (
    <div className="bg-white w-screen h-screen p-6 border-t border-t-very-light-pink fixed left-0 top-16 z-10  md:hidden">
      <ul className="m-6 border-b border-b-very-light-pink">
        <li className="mb-5">
          <a href="#" className="MobileMenu_Item">CATEGORIES</a>
        </li>
        <li className="mb-5">
          <a href="#" className="MobileMenu_Item">All</a>
        </li>
        <li className="mb-5">
          <a href="#" className="MobileMenu_Item">Clothes</a>
        </li>
        <li className="mb-5">
          <a href="#" className="MobileMenu_Item">Electronics</a>
        </li>
        <li className="mb-5">
          <a href="#" className="MobileMenu_Item">Furnitures</a>
        </li>
        <li className="mb-5">
          <a href="#" className="MobileMenu_Item">Toys</a>
        </li>
        <li className="mb-5">
          <a href="#" className="MobileMenu_Item">Other</a>
        </li>
      </ul>

      <ul className="m-6">
        <li className="mb-5">
          <p className="text-md text-gray-300 font-light">{email}</p>
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
            className="text-sm text-hospital-green font-bold cursor-pointer"
          >
            Sign out
          </span>
        </li>
      </ul>
    </div>
  );
}

export { MobileMenu };