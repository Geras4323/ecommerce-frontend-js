import React from 'react';

import Head from 'next/head';

import { Header } from '../containers/Header';
import { ProductsList } from '../containers/ProductsList';

function Showroom() {
  return (
    <>
      <Head>
        <title>Showroom | Yard Sale</title>
      </Head>
      <div>
        <Header />
        <ProductsList />
      </div>
    </>
  );
}

export default Showroom;