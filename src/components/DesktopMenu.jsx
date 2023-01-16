import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

function DesktopMenu() {

  function handleSignOut() {
    Cookies.remove('login-token');
    window.location.href = '/';
  }

  return (
    <div className="hidden   md:block w-36 h-auto bg-white absolute top-16 right-14 border border-very-light-pink rounded-b-lg pt-5 px-5">
      <ul>
        <li className="text-end font-bold mb-5">
          <Link href="/my-orders" className="title">My orders</Link>
        </li>

        <li className="text-end font-bold mb-5">
          <Link href="/auth/my-account">My account</Link>
        </li>

        <li className="text-end pt-5 border-t border-t-very-light-pink mb-5">
          <span
            onClick={handleSignOut}
            className="text-hospital-green text-sm cursor-pointer"
          >
            Sign out
          </span>
        </li>
      </ul>
    </div>
  );
}

export { DesktopMenu }