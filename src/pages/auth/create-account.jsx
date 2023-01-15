import React from 'react';

import Head from 'next/head';

import { api } from 'src/utils/axiosConnection';


function CreateAccount() {
  const form = React.useRef(null);

  const [error, setError] = React.useState();

  async function handleCreateAccount() {
    try {
      const formData = new FormData(form.current);
      const phone = () => {
        const phone = formData.get('phone');
        if (phone.length === 0) {
          return null;
        } else {
          return phone;
        }
      }
      const body = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        phone: phone,
      }
      const config = {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        }
      };
      await api.post('/users', body, config);
      window.location.href = '/auth/login';
    } catch (err) {
      console.log(err.response.data.error.message);
      setError(err.response.data.error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Create Account | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <h1 className="text-lg mb-9 text-start w-full font-bold">New account</h1>

          <form className="flex flex-col w-full" ref={form}>
            <div className="flex flex-col w-full">
              <label htmlFor="username" className="text-sm font-bold mb-1">Username *</label>
              <input type="text" id="username" name='username' placeholder="Your username" className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />

              <label htmlFor="email" className="text-sm font-bold mb-1">Email *</label>
              <input type="text" id="email" name='email' placeholder="email@example.com" className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />

              <label htmlFor="password" className="text-sm font-bold mb-1">Password *</label>
              <input type="password" id="password" name='password' placeholder="*********" className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />

              <label htmlFor="first_name" className="text-sm font-bold mb-1">First name *</label>
              <input id="first_name" name='first_name' className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />

              <label htmlFor="last_name" className="text-sm font-bold mb-1">Last name *</label>
              <input id="last_name" name='last_name' className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />

              <label htmlFor="phone" className="text-sm font-bold mb-1">Phone</label>
              <input id="phone" name='phone' placeholder='can be left empty' className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />
            </div>

            {error &&
              <p className='text-red-400'>{error}</p>
            }

            <button
              type="button"
              onClick={handleCreateAccount}
              className="bg-hospital-green border-none rounded-lg text-white w-full text-md font-bold h-12 mt-4 mb-8"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;