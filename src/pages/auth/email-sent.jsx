import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

function EmailSent() {
  return (
    <>
      <Head>
        <title>Email Sent | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-32 mb-12" />

          <h1 className="text-lg mb-3 text-center font-bold">Email has been sent!</h1>
          <p className="text-gray-500 text-md mt-0 mb-8 text-center">Please check your inbox for instructions on how to reset the password</p>

          <div className="w-32 h-32 rounded-full bg-text-input-field flex justify-center items-center mb-6">
            <img src="/assets/icons/email.svg" alt="email" className="w-20" />
          </div>

          <Link href='/auth/login'>
            <button className="bg-hospital-green border-none rounded-lg text-white w-full cursor-pointer text-md font-bold h-12 mt-4 mb-8">Login</button>
          </Link>

          <p className="text-sm">
            <span className="text-gray-500">Didn&apos;t receive the email? </span>
            <Link href='/auth/recover-password'><a className="text-hospital-green">Resend</a></Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default EmailSent;