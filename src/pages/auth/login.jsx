import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';

import { api } from 'src/utils/axiosConnection';


function Login() {
  const form = React.useRef(null);

  const [error, setError] = React.useState();
  const [isSomeEmpty, setIsSomeEmpty] = React.useState(true);


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
      handleLogin();
    }
  }

  async function handleLogin() {
    try {
      const formData = new FormData(form.current);
      const body = {
        email: formData.get('email'),
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
      window.location.href = '/showroom';
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
        <title>Login | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <Link href='/'>
            <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-32 mb-12   sm:hidden   hover:cursor-pointer" />
          </Link>
          <h1 className="text-lg mb-9 text-start w-full font-bold">Login</h1>


          <form className="flex flex-col w-full" ref={form}>
            <label htmlFor="email" className="text-sm font-bold mb-1">Email address</label>
            <input
              type="text"
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

            <button
              type="button"
              disabled={isSomeEmpty}
              className={`${isSomeEmpty ? 'bg-black bg-opacity-20 text-gray-400' : 'bg-hospital-green text-white'} border-none rounded-lg w-full text-md font-bold h-12 mt-4 mb-8 transition-all duration-200`}
              onClick={handleLogin}
            >
              Log in
            </button>

            <Link href='/auth/recover-password'>
              <a className="text-hospital-green text-md text-center mb-10">Forgot my password</a>
            </Link>
          </form>

          <Link href='/auth/create-account'>
            <div className='bg-white flex justify-center items-center border border-hospital-green rounded-lg text-hospital-green w-full cursor-pointer text-md font-bold h-12 mt-4 mb-8   hover:bg-hospital-green hover:text-white   transition-all duration-200'>
              Sign up
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;