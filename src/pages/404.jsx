import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

function NotFound() {
  return (
    <>
      <Head>
        <title>404 | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <Link href="/">
          <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-40 mb-12   hover:cursor-pointer   md:w-48   lg:w-52" />
        </Link>
        <img src="/assets/logos/error404.png" alt="logo" className="w-40 mb-12   md:w-48   lg:w-52" />
        <p className="text-xl mb-4">Oops! Nothing to see here!</p>
        <p className="text-lg text-very-light-pink">Looks like this page does not exist.</p>
        <Link href='/'>
          <a className='mt-4 text-lg font-bold text-hospital-green underline'>Back to home</a>
        </Link>
      </div>
    </>
  );
}

export default NotFound;