import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { api } from 'src/utils/axiosConnection';


function RecoverPassword() {
  const form = React.useRef(null);

  const [isEmail, setIsEmail] = React.useState(false);
  const [error, setError] = React.useState();

  const [sending, setSending] = React.useState(false);

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
    setSending(true);
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
      setSending(false);
    }
  }

  return (
    <>
      <Head>
        <title>Recover Password | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <Link href='/'>
            <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-32 mb-10   hover:cursor-pointer" />
          </Link>

          <p className='w-full mb-6 text-left'>
            Enter your account&apos;s email address. You will receive a password reset link.
          </p>

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

            {sending
              ? <div className='mt-4 mb-8 bg-hospital-green bg-opacity-50 border-none rounded-lg text-white w-full cursor-pointer text-md font-bold h-12'>
                  <span className='h-full flex justify-center items-center animate-spin'>
                    <svg className='h-3/5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                  </span>
                </div>
              : <button
                  type="button"
                  disabled={!isEmail}
                  className={`${isEmail ? 'bg-hospital-green text-white' : 'bg-black bg-opacity-20 text-gray-400'} border-none rounded-lg w-full text-md font-bold h-12 mt-4 mb-8`}
                  onClick={handleRecovery}
                >
                  Send email
                </button>
            }

          </form>

          <Link href='/'><a className='text-base text-hospital-green font-bold'>Back to home</a></Link>
        </div>
      </div>
    </>
  );
}

export default RecoverPassword;