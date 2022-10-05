import React from 'react';

import Head from 'next/head';

function NewPassword() {

  return (
    <>
      <Head>
        <title>New Password | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-32 mb-12   sm:hidden" />

          <h1 className="text-lg mb-3 text-center font-bold">Create a new password</h1>
          <p className="text-very-light-pink text-md font-light mt-0 mb-8 text-center">Enter a new password for your account</p>

          <form action="/" className="flex flex-col w-full">
            <label htmlFor="password" className="text-sm font-bold mb-1">Password</label>
            <input type="password" id="password" placeholder="*********" className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-3" />
            <label htmlFor="new-password" className="text-sm font-bold mb-1">Re-enter Password</label>
            <input type="password" id="new-password" placeholder="*********" className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-3" />

            <input type="submit" value="Confirm" className="bg-hospital-green border-none rounded-lg text-white w-full cursor-pointer text-md font-bold h-12 mt-4 mb-8" />
          </form>
        </div>
      </div>
    </>
  );
}

export default NewPassword;