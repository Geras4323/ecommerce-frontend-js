import React from 'react';

import Link from 'next/link';

import { ShoppingCartItem } from './ShoppingCartItem';

import { AppContext } from '../contexts/AppContext';


function ShoppingCart({closeShoppingCart}) {
  const { cart } = React.useContext(AppContext);



  return (
    <React.Fragment>
      <div
        className="w-0 h-0   sm:w-2/3 sm:h-screen fixed top-16 right-0 left-0 bottom-0 bg-black bg-opacity-30"
        onClick={closeShoppingCart}
      ></div>

      <aside className="w-full h-screen  bg-white border border-very-light-pink border-r-0 border-b-0 p-4   sm:w-1/3 pb-6 pr-4 fixed right-0 top-16">
        <div className="flex flex-row pb-2 rounded-b-xl border-b border-b-very-light-pink px-3">
          <img
            src="/assets/icons/flechita.svg"
            alt="arrow"
            className="rotate-180 mr-4   hover:cursor-pointer"
            onClick={closeShoppingCart}
          />
          <p className="text-lg font-bold">My order</p>
        </div>

        <div className="mt-2 h-full flex flex-col justify-between pb-24">
          <section className="max-h-full pr-4 overflow-y-auto overflow-y-contain mb-2">
            {cart.length > 0
              ? cart.map((item, index) => (
              <ShoppingCartItem
                key={index}
                product={item}
                indexValue={index}
              />
            ))
              : <p className="text-center text-very-light-pink">Your cart is empty!</p>
            }
          </section>

          <div className="pt-2 px-3 rounded-t-xl border-t border-t-very-light-pink">
            <div className="text-md flex flex-row justify-between items-center rounded-lg font-bold px-5 h-12 bg-text-input-field mb-6">
              <p>
                <span>Total</span>
              </p>
              <p className="text-end font-bold">{`$
                ${cart.reduce((total, item) => {
                  return total + item.price;
                }, 0)}`}
              </p>
            </div>

            {cart.length > 0
              ? <Link href="/my-order">
                  <button className="bg-hospital-green border-none rounded-lg text-white w-full cursor-pointer text-md font-bold h-12">
                    See my order
                  </button>
                </Link>
              : <div
                  className="h-12 mt-6 bg-white border border-very-light-pink rounded-lg text-very-light-pink w-full text-md font-bold flex justify-center items-center"
                >
                  Added items to cart!
                </div>
            }

          </div>
        </div>
      </aside>
    </React.Fragment>
  );
}

export { ShoppingCart }