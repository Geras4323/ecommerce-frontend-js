import React from 'react';

function MobileMenu() {
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
          <a href="#" className="MobileMenu_Item">My orders</a>
        </li>
        <li className="mb-5">
          <a href="#" className="MobileMenu_Item">My account</a>
        </li>
      </ul>

      <ul className="m-6">
        <li className="mb-5">
          <a href="#" className="text-sm font-light">platzi@example.com</a>
        </li>
        <li className="mb-5">
          <a href="#" className="text-sm text-hospital-green font-bold">Sign out</a>
        </li>
      </ul>
    </div>
  );
}

export { MobileMenu };