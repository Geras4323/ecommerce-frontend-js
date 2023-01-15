import React from 'react';

import Head from 'next/head';

import { api } from 'src/utils/axiosConnection';


function RecoverPassword() {
  const form = React.useRef(null);

  async function handleRecovery() {
    const formData = new FormData(form.current);
    const body = {
      email: formData.get('email'),
    }
    console.log(body)
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      }
    };
    const {data} = await api.post('/auth/recovery', body, config);
    window.location.href = '/auth/email-sent';
  }

  return (
    <>
      <Head>
        <title>Recover Password | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-32 mb-10   sm:hidden" />

          <p className='mb-6'>
            Enter your account&apos;s email address. You will receive a password reset link.
          </p>

          <form action="/" className="flex flex-col w-full" ref={form}>
            <label htmlFor="email" className="text-sm font-bold mb-1">Email address</label>
            <input type="text" name="email" placeholder="email@example.com" className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-6" />

            <button
              className="bg-hospital-green border-none rounded-lg text-white w-full cursor-pointer text-md font-bold h-12 mt-4 mb-8"
              type="button"
              onClick={handleRecovery}
            >
              Send email
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RecoverPassword;