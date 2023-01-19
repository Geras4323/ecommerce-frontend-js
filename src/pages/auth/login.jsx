import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';

import { api } from 'src/utils/axiosConnection';


function Login() {
  const form = React.useRef(null);
  const button = React.useRef(null);

  const [error, setError] = React.useState();
  const [isSomeEmpty, setIsSomeEmpty] = React.useState(true);

  const [logging, setLogging] = React.useState(false);


  function checkEmpty() {
    const formData = new FormData(form.current);
    const email = formData.get('email');
    const password = formData.get('password');
    if (email.length === 0 || password.length === 0) {
      setIsSomeEmpty(true);
    } else {
      setIsSomeEmpty(false);
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      button.current.click();
    }
  }

  async function handleLogin() {
    setLogging(true);
    try {
      const formData = new FormData(form.current);
      const body = {
        email: formData.get('email').toLowerCase(),
        password: formData.get('password')
      }
      const config = {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        }
      };
      const {data} = await api.post('/auth/login', body, config);
      Cookies.set('login-token', data.token);
      setLogging(false);
      window.location.href = '/showroom';
    } catch (err) {
      const responseError = err.response.data.error.message;
      if (responseError === 'Unauthorized') {
        setError('Wrong password');
      } else {
        setError(responseError);
      }
      setLogging(false);
    }
  }

  return (
    <>
      <Head>
        <title>Login | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen p-4 grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <Link href='/'>
            <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-32 mb-12   hover:cursor-pointer" />
          </Link>
          <h1 className="text-lg mb-9 text-start w-full font-bold">Login</h1>


          <form className="flex flex-col w-full" ref={form}>
            <label htmlFor="email" className="text-sm font-bold mb-1">Email address</label>
            <input
              type="text"
              style={{textTransform: 'lowercase'}}
              id="email"
              name="email"
              placeholder="email@example.com"
              className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-6"
              onChange={checkEmpty}
              onKeyDown={handleKeyPress}
              tabIndex='0'
            />

            <label htmlFor="password" className="text-sm font-bold mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*********"
              className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-3"
              onChange={checkEmpty}
              onKeyDown={handleKeyPress}
              tabIndex='0'
            />

            {error &&
              <p className='text-red-400'>{error}</p>
            }

            {logging
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
                  ref={button}
                  disabled={isSomeEmpty}
                  className={`${isSomeEmpty ? 'bg-black bg-opacity-20 text-gray-400' : 'bg-hospital-green text-white hover:font-bold'} border-none rounded-lg w-full text-md font-bold h-12 mt-4 mb-8 transition-all duration-200`}
                  onClick={handleLogin}
                >
                  Log in
                </button>
            }

            <Link href='/auth/recover-password'>
              <a className="mb-10 text-hospital-green text-center font-bold">Forgot my password</a>
            </Link>
          </form>

          <Link href='/auth/create-account'>
            <div className='bg-white flex justify-center items-center border border-hospital-green rounded-lg text-hospital-green w-full cursor-pointer text-md font-bold h-12 mt-4   hover:bg-hospital-green hover:text-white hover:font-bold   transition-all duration-200'>
              Sign up
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;