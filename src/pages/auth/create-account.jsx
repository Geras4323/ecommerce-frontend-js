import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { api } from 'src/utils/axiosConnection';


function CreateAccount() {
  const form = React.useRef(null);

  const [error, setError] = React.useState();
  const [isSomeEmpty, setIsSomeEmpty] = React.useState(true);

  const [usernameMeetsLength, setUsernameMeetsLength] = React.useState(false);
  const [passwordMeetsLength, setPasswordMeetsLength] = React.useState(false);
  const [passwordsMatch, setPasswordsMatch] = React.useState(false);

  function checkEmpty() {
    const formData = new FormData(form.current);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const re_password = formData.get('re-password');
    const firstName = formData.get('first_name');
    const lastName = formData.get('last_name');
    if (username.length < 4 || email.length === 0 || password.length < 8 || (password !== re_password) || firstName.length === 0 || lastName.length === 0) {
      setIsSomeEmpty(true);
    } else {
      setIsSomeEmpty(false);
    }
  }

  function checkUsernameRequirements() {
    const formData = new FormData(form.current);
    const username = formData.get('username');
    if (username.length >= 4) {
      setUsernameMeetsLength(true);
    } else {
      setUsernameMeetsLength(false);
    }
    checkEmpty();
  }

  function checkPasswordRequirements() {
    const formData = new FormData(form.current);
    const password = formData.get('password');
    if (password.length >= 8) {
      setPasswordMeetsLength(true);
    } else {
      setPasswordMeetsLength(false);
    }
    checkPasswordsMatch();
    checkEmpty();
  }

  function checkPasswordsMatch() {
    const formData = new FormData(form.current);
    const password = formData.get('password');
    const re_password = formData.get('re-password');
    if (password === re_password) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
    checkEmpty();
  }


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
      setError(err.response.data.error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Create Account | Yard Sale</title>
      </Head>
      <div className="w-full h-screen p-4 grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <div className='w-full mb-9 flex flex-row items-center'>
            <h1 className="text-lg text-start w-full font-bold">New account</h1>
            <Link href='/auth/login'>
              <p className="w-full text-right text-base text-hospital-green font-bold   hover:cursor-pointer">Back to login</p>
            </Link>
          </div>

          <form className="flex flex-col w-full" ref={form}>
            <div className="flex flex-col w-full">

              <div className='flex flex-row justify-between items-center'>
                <label htmlFor="username" className="text-sm font-bold mb-1">Username *</label>
                <div className={`flex flex-row items-center gap-2 fill-current ${usernameMeetsLength ? 'text-green-400' : 'text-red-400'}`}>
                  {usernameMeetsLength
                    ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-3 h-3 fill-current'>
                        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                      </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-3 h-3 fill-current'>
                        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                      </svg>
                  }
                  <span className='text-sm'>4 characters long</span>
                </div>
              </div>
              <input type="text" onChange={checkUsernameRequirements} id="username" name='username' placeholder="Your username" className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />


              <label htmlFor="email" className="text-sm font-bold mb-1">Email *</label>
              <input type="text" onChange={checkEmpty} id="email" name='email' placeholder="email@example.com" className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />


              {/* 1st password */}
              <div className='flex flex-row justify-between items-center'>
                <label htmlFor="password" className="text-sm font-bold mb-1">Password *</label>
                <div className={`flex flex-row items-center gap-2 fill-current ${passwordMeetsLength ? 'text-green-400' : 'text-red-400'}`}>
                  {passwordMeetsLength
                    ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-3 h-3 fill-current'>
                        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                      </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-3 h-3 fill-current'>
                        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                      </svg>
                  }
                  <span className='text-sm'>8 characters long</span>
                </div>
              </div>
              <input type="password" onChange={checkPasswordRequirements} id="password" name='password' placeholder="*********" className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />

              {/* 2nd password */}
              <div className='flex flex-row justify-between items-center'>
                <label htmlFor="re-password" className="text-sm font-bold mb-1">Re-Enter Password *</label>
                <div className={`flex flex-row items-center gap-2 fill-current ${passwordsMatch ? 'text-green-400' : 'text-red-400'}`}>
                  {passwordsMatch
                    ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-3 h-3 fill-current'>
                        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                      </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-3 h-3 fill-current'>
                        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                      </svg>
                  }
                  <span className='text-sm'>Passwords match</span>
                </div>
              </div>
              <input type="password" onChange={checkPasswordsMatch} id="re-password" name='re-password' placeholder="*********" className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />



              <label htmlFor="first_name" className="text-sm font-bold mb-1">First name *</label>
              <input id="first_name" onChange={checkEmpty} name='first_name' className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />


              <label htmlFor="last_name" className="text-sm font-bold mb-1">Last name *</label>
              <input id="last_name" onChange={checkEmpty} name='last_name' className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />


              <label htmlFor="phone" className="text-sm font-bold mb-1">Phone</label>
              <input id="phone" name='phone' placeholder='- can be left empty -' className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-5" />
            </div>

            {error &&
              <p className='text-red-400'>{error}</p>
            }

            <button
              type="button"
              disabled={isSomeEmpty || !passwordMeetsLength}
              onClick={handleCreateAccount}
              className={`${isSomeEmpty ? 'bg-black bg-opacity-20 text-gray-400' : 'bg-hospital-green text-white'} border-none rounded-lg text-white w-full text-md font-bold h-12 mt-4 mb-8 transition-all duration-200`}
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