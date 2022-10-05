import React from 'react';

import Head from 'next/head';

function ViewAccountData() {
  return (
    <>
      <Head>
        <title>Account Data | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <h1 className="text-lg mb-9 text-start w-full font-bold">My account</h1>

          <form action="/" className="flex flex-col w-full">
            <div>
              <label htmlFor="name" className="text-sm font-bold mb-1">Name</label>
              <p className="h-10 text-md p-2 mb-6 text-very-light-pink">Your name</p>

              <label htmlFor="email" className="text-sm font-bold mb-1">Email</label>
              <p className="h-10 text-md p-2 mb-6 text-very-light-pink">platzi@example.com</p>

              <label htmlFor="password" className="text-sm font-bold mb-1">Password</label>
              <p className="h-10 text-md p-2 mb-6 text-very-light-pink">*********</p>
            </div>

            <input type="submit" value="Edit" className="bg-white border border-hospital-green rounded-lg text-hospital-green w-full cursor-pointer text-md font-bold h-12 mt-4 mb-8" />
          </form>
        </div>
      </div>
    </>
  );
}

export default ViewAccountData;