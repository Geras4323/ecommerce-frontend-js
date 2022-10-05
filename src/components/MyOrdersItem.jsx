import React from 'react';

function MyOrdersItem() {
  return (
    <div className="w-full flex flex-row mb-6 items-center justify-between">
      <p className="flex flex-col items-center">
        <span className="text-md font-bold">03.25.21</span>
        <span className="text-sm text-very-light-pink">4 articles</span>
      </p>
      <div className="flex flex-row items-center gap-4 font-bold">
        <p>$560.00</p>
        <img src="/assets/icons/flechita.svg" alt="arrow" />
      </div>
    </div>
  );
}

export { MyOrdersItem }