import React from 'react';

import Head from 'next/head';

import { api } from 'src/utils/axiosConnection';


function RecoverPassword() {
  const form = React.useRef(null);

  const [isEmail, setIsEmail] = React.useState(false);
  const [error, setError] = React.useState();

  function checkIsEmail() {
    const formData = new FormData(form.current);
    const email = formData.get('email');
    if (/^[\w\.]{5,30}\+?\w{0,10}@[\w\-\.]{3,}\.\w{2,5}$/.test(email)) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  }

  async function handleRecovery() {
    try {
      const formData = new FormData(form.current);
      const body = {
        email: formData.get('email'),
      }
      const config = {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        }
      };
      const {data} = await api.post('/auth/recovery', body, config);
      window.location.href = '/auth/email-sent';
    } catch (err) {
      const responseError = err.response.data.error.message;
      if (responseError === 'Unauthorized') {
        setError('Wrong password');
      } else {
        setError(responseError);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Recover Password | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-32 mb-10" />

          <p className='w-full mb-6 text-left'>
            Enter your account&apos;s email address. You will receive a password reset link.
          </p>
          <div className='w-full mb-6 flex flex-row items-center gap-3 text-blue-500'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-4 h-4 fill-current'>
              <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/>
            </svg>
            <p className='w-full text-left'>
              Please check your spam folder.
            </p>
          </div>

          <form action="/" className="flex flex-col w-full" ref={form}>
            <label htmlFor="email" className="text-sm font-bold mb-1">Email address</label>
            <input
              type="text"
              id='email'
              name="email"
              onChange={checkIsEmail}
              placeholder="email@example.com"
              className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-6"
            />

            {error &&
              <p className='text-red-400'>{error}</p>
            }

            <button
              type="button"
              disabled={!isEmail}
              className={`${isEmail ? 'bg-hospital-green text-white' : 'bg-black bg-opacity-20 text-gray-400'} border-none rounded-lg w-full text-md font-bold h-12 mt-4 mb-8`}
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