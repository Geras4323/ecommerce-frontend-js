import React from 'react';

import Head from 'next/head';

function CreateAccount() {
  return (
    <>
      <Head>
        <title>Create Account | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <h1 className="text-lg mb-9 text-start w-full font-bold">New account</h1>

          <form className="flex flex-col w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="text-sm font-bold mb-1">Name</label>
              <input type="text" id="name" placeholder="Your name" className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />

              <label htmlFor="email" className="text-sm font-bold mb-1">Email</label>
              <input type="text" id="email" placeholder="platzi@example.com" className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />

              <label htmlFor="password" className="text-sm font-bold mb-1">Password</label>
              <input type="password" id="password" placeholder="*********" className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />
            </div>

            <input type="submit" value="Create" className="bg-hospital-green border-none rounded-lg text-white w-full cursor-pointer text-md font-bold h-12 mt-4 mb-8" />
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;