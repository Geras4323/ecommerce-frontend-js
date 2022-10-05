import React from 'react';

function DesktopMenu() {
  return (
    <div className="hidden   md:block w-36 h-auto bg-white absolute top-16 right-14 border border-very-light-pink rounded-b-lg pt-5 px-5">
      <ul>
        <li className="text-end font-bold mb-5">
          <a href="#" className="title">My orders</a>
        </li>

        <li className="text-end font-bold mb-5">
          <a href="#">My account</a>
        </li>

        <li className="text-end pt-5 border-t border-t-very-light-pink mb-5">
          <a href="#" className="text-hospital-green text-sm ">Sign out</a>
        </li>
      </ul>
    </div>
  );
}

export { DesktopMenu }