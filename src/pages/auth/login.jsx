import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';

import { api } from 'src/utils/axiosConnection';


function Login() {
  const form = React.useRef(null);

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }

  async function handleLogin() {
    const formData = new FormData(form.current);
    const body = {
      email: formData.get('email'),
      password: formData.get('password')
    }
    console.log(body);
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      }
    };
    const {data} = await api.post('/auth/login', body, config);
    console.log(data.token);
    Cookies.set('login-token', data.token);
    console.log('cookie set');
    window.location.href = '/showroom';
  }

  return (
    <>
      <Head>
        <title>Login | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-32 mb-12   sm:hidden" />

          <form action="/" className="flex flex-col w-full" ref={form}>
            <label htmlFor="email" className="text-sm font-bold mb-1">Email address</label>
            <input
              type="text"
              name="email"
              placeholder="email@example.com"
              className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-6"
              onKeyDown={handleKeyPress}
              tabIndex='0'
            />

            <label htmlFor="password" className="text-sm font-bold mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="*********"
              className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-3"
              onKeyDown={handleKeyPress}
              tabIndex='0'
            />

            <button
              className="bg-hospital-green border-none rounded-lg text-white w-full cursor-pointer text-md font-bold h-12 mt-4 mb-8"
              type="button"
              onClick={handleLogin}
            >
              Log in
            </button>
            <Link href='/auth/recover-password'>
              <a className="text-hospital-green text-sm text-center mb-10">Forgot my password</a>
            </Link>
          </form>

          <Link href='/create-account'>
            <div className='bg-white flex justify-center items-center border border-hospital-green rounded-lg text-hospital-green w-full cursor-pointer text-md font-bold h-12 mt-4 mb-8'>
              Sign up
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;