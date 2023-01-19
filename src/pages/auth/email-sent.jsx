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
          <Link href='/'>
            <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-32 mb-12   hover:cursor-pointer" />
          </Link>

          <h1 className="text-lg mb-3 text-center font-bold">Email has been sent!</h1>
          <p className="text-gray-500 text-md mt-0 mb-5 text-center">Please check your inbox for instructions on how to reset the password</p>

          <div className='w-full mb-8 flex flex-row items-center gap-3 text-blue-500'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-4 h-4 fill-current'>
              <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/>
            </svg>
            <p className='w-full text-left'>
              Please check your spam folder.
            </p>
          </div>

          <div className="w-32 h-32 rounded-full bg-text-input-field flex justify-center items-center mb-6">
            <img src="/assets/icons/email.svg" alt="email" className="w-20" />
          </div>

          <Link href="/auth/login">
            <div
              className="w-full mt-4 mb-8 h-12 rounded-lg flex justify-center items-center border border-border text-hospital-green shadow-md   hover:cursor-pointer hover:bg-hospital-green hover:text-white hover:shadow-lg hover:font-bold   transition-all duration-200"
            >
              Login
            </div>
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