import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';


function DesktopMenu({ closeDesktopMenu }) {

  function handleSignOut() {
    Cookies.remove('login-token');
    window.location.href = '/';
  }

  return (
    <React.Fragment>
      <div
        className="w-0 h-0   sm:w-screen sm:h-screen fixed top-16 right-0 left-0 bottom-0 bg-black bg-opacity-30"
        onClick={closeDesktopMenu}
      ></div>

      <div className="hidden   md:block w-36 h-auto bg-white absolute top-16 right-14 border border-very-light-pink rounded-b-lg pt-5 px-5">
        <ul>
          <li className="text-end font-bold mb-5">
            <Link href="/my-orders" className="title">My orders</Link>
          </li>

          <li className="text-end font-bold mb-5">
            <Link href="/auth/my-account">My account</Link>
          </li>

          <li className="text-end pt-4 border-t border-t-very-light-pink mb-5">
            <span
              onClick={handleSignOut}
              className="text-hospital-green text-sm font-bold cursor-pointer"
            >
              Sign out
            </span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

export { DesktopMenu }