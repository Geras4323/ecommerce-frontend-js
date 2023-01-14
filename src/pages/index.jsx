import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

function Home() {
  return (
    <>
      <Head>
      <title>Home | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <h1 className="text-xl mb-9 text-start w-full font-bold">Welcome</h1>

          <p className="mb-2 text-lg"><Link href="/auth/login"><a className="text-hospital-green underline">Login</a></Link></p>
          <p className="text-lg">Go to <Link href="/showroom"><a className="text-hospital-green underline">Showroom</a></Link></p>

        </div>
      </div>
    </>
  );
}

export default Home;