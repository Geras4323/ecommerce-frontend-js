import React from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { api } from 'src/utils/axiosConnection';


function NewPassword() {
  const router = useRouter();
  const { token } = router.query;

  const form = React.useRef(null);

  const [meetsLength, setMeetsLength] = React.useState(false);
  const [areEqual, setAreEqual] = React.useState(true);
  const [isSomeEmpty, setIsSomeEmpty] = React.useState(true);

  const [expired, setExpired] = React.useState(false);


  async function handleChangePassword() {
    try {
      const formData = new FormData(form.current);
      const body = {
        token: token,
        newPassword: formData.get('new-password'),
      }
      const config = {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        }
      };
      const response = await api.post('/auth/change-password', body, config);
      console.log(response);
      if (response.status === 200) {
        window.location.href = '/auth/login';
      }
    } catch (err) {
      setExpired(true);
    }
  }

  function checkRequirements() {
    const formData = new FormData(form.current);
    const password = formData.get('new-password');
    const re_password = formData.get('re-new-password');
    if (/.{8,}/g.test(password)) {
      setMeetsLength(true);
    } else {
      setMeetsLength(false);
    }
    if (password === re_password) {
      setAreEqual(true);
    } else {
      setAreEqual(false);
    }
    if (password.length === 0 || re_password.length === 0) {
      setIsSomeEmpty(true);
    } else {
      setIsSomeEmpty(false);
    }
  }


  return (
    <>
      <Head>
        <title>New Password | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-32 mb-12" />

          <h1 className="text-lg mb-3 text-center font-bold">Create a new password</h1>
          <p className="text-gray-600 text-md mt-0 mb-8 text-center">Enter a new password for your account</p>

          <form className="flex flex-col w-full" ref={form}>
            <div className={`mb-5 flex flex-row justify-start items-center gap-3 ${meetsLength ? 'text-green-400' : 'text-red-400'}`}>
              {meetsLength
                ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-4 h-4 fill-current'>
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                  </svg>
                : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-4 h-4 fill-current'>
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                  </svg>
              }
              <p className=''>Password must be at least 8 charaters long.</p>
            </div>
            <div className={`mb-5 flex flex-row justify-start items-center gap-3 ${areEqual ? 'text-green-400' : 'text-red-400'}`}>
              {isSomeEmpty
                ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-4 h-4 fill-current text-blue-500'>
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/>
                  </svg>
                : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-4 h-4 fill-current'>
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/>
                  </svg>
              }
              <p className={`${isSomeEmpty && 'text-blue-500'}`}>Passwords must be equal.</p>
            </div>

            <label htmlFor="new-password" className="text-sm font-bold mb-1">Password</label>
            <input
              id="new-password"
              name="new-password"
              autoComplete='off'
              onChange={checkRequirements}
              className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-3"
            />
            <label htmlFor="re-new-password" className="text-sm font-bold mb-1">Re-enter Password</label>
            <input
              id="re-new-password"
              name="re-new-password"
              autoComplete='off'
              onChange={checkRequirements}
              className="bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-3"
            />

            <button
              type="button"
              disabled={!meetsLength || !areEqual}
              onClick={handleChangePassword}
              className={`${(!meetsLength || !areEqual) ? 'bg-black bg-opacity-20 text-gray-400' : 'bg-hospital-green text-white'} border-none rounded-lg w-full text-md font-bold h-12 mt-4 mb-8 transition-all duration-200`}
            >
              Confirm
            </button>
          </form>

          {expired &&
            <p className='text-red-400'>This petition expired. Please go <Link href='/auth/recover-password'><a className='text-hospital-green underline'>back to password recovery</a></Link></p>
          }
        </div>
      </div>
    </>
  );
}

export default NewPassword;