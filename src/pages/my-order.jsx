import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { MyOrderItem } from '../components/MyOrderItem';

import { AppContext } from '../contexts/AppContext';


function MyOrder() {
  const { cart } = React.useContext(AppContext);

  const date = new Date();
  let dd = String(date.getDate()).padStart(2, '0'); // gets the day. Adds padding to fill the specified length
  let mm = String(date.getMonth() + 1).padStart(2, '0');
  let yyyy = date.getFullYear();
  let currentDate = `${dd} / ${mm} / ${yyyy}`;

  return (
    <>
      <Head>
        <title>My Order | Yard Sale</title>
      </Head>
      <div className="w-full h-screen grid place-items-center">
        <Link href="/">
          <img src="/assets/logos/logo_yard_sale.svg" alt="logo"
          className="w-26 fixed top-6 left-8   sm:w-32   hover:cursor-pointer" />
        </Link>
        <div className="grid w-80">
          <h1 className="text-lg mb-10 font-bold">My order</h1>

          <div className="flex flex-col">
            <div className="flex flex-row justify-between h-16 items-center bg-text-input-field mb-6 rounded-lg px-6">
              <p className="flex flex-col">
                <span className="text-md font-bold">{currentDate}</span>
                <span className="text-sm text-very-light-pink">
                  {cart.length < 2
                    ? '1 article'
                    : `${cart.length} articles`
                  }
                </span>
              </p>
              <p className="text-end font-bold">$
                {cart.reduce((total, item) => {
                  return total + item.price;
                }, 0)}
              </p>
            </div>

            {cart.map((item, index) => (
              <MyOrderItem
                key={index}
                product={item}
              />
            ))}
            {/* <MyOrderItem price="$120,00" title="Bike"/>
            <MyOrderItem price="$120,00" title="Bike"/>
            <MyOrderItem price="$120,00" title="Bike"/> */}

          </div>
        </div>
      </div>
    </>
  );
}

export default MyOrder;