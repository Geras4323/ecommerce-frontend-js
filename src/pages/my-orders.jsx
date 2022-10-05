import React from 'react';

import Head from 'next/head';

import { MyOrdersItem } from '../components/MyOrdersItem';


function MyOrders() {
  return (
    <>
      <Head>
        <title>My Orders | Yard Sale</title>
      </Head>
      <div className="w-full h-screen grid place-items-center">
        <div className="grid w-80">
          <h1 className="text-lg mb-10 font-bold">My orders</h1>

          <div className="flex flex-col gap-4">

            <MyOrdersItem />
            <MyOrdersItem />
            <MyOrdersItem />
            <MyOrdersItem />

          </div>
        </div>
      </div>
    </>
  );
}

export default MyOrders;