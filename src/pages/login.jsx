import React from 'react';

import Head from 'next/head';

function Login() {
  const form = React.useRef(null);

  const handleSubmit = () => {
    const formData = new FormData(form.current);
    const data = {
      username: formData.get('email'),
      password: formData.get('password')
    }
    console.log(data);
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
            <input type="text" name="email" placeholder="platzi@example.com" className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-6" />

            <label htmlFor="password" className="text-sm font-bold mb-1">Password</label>
            <input type="password" name="password" placeholder="*********" className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-3" />

            <button
              className="bg-hospital-green border-none rounded-lg text-white w-full cursor-pointer text-md font-bold h-12 mt-4 mb-8"
              type="button"
              onClick={handleSubmit}>
              Log in
            </button>
            <a href="#" className="text-hospital-green text-sm text-center mb-10">Forgot my password</a>
          </form>

          <button className="bg-white border border-hospital-green rounded-lg text-hospital-green w-full cursor-pointer text-md font-bold h-12 mt-4 mb-8">Sign up</button>
        </div>
      </div>
    </>
  );
}

export default Login;