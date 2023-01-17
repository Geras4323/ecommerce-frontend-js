import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Cookies from 'js-cookie';

import { verifyToken } from 'src/utils/verifyToken';
import { api } from 'src/utils/axiosConnection';


function MyAccount() {
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    async function getUserData() {
      const login_token = Cookies.get('login-token');
      if (login_token) {
        const { sub: userId } = await verifyToken(login_token);
        const { data } = await api.get(`/users/${userId}`);
        setUserData(data);
      } else {
        setUserData(undefined);
      }
    }
    getUserData();
  }, [])

  return (
    <>
      <Head>
        <title>My Account | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen flex flex-col justify-center items-center">

        {userData
          ? <div className="w-80 flex flex-col items-center">
              <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-32 mb-12" />

              <label htmlFor="username" className="w-full text-sm font-bold mb-1">Username</label>
              <p name="username" className="w-full text-gray-400 bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-6" >
                {userData.username}
              </p>

              <label htmlFor="email" className="w-full text-sm font-bold mb-1">Email address</label>
              <p name="email" className="w-full text-gray-400 bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-6" >
                {userData.email}
              </p>

              <label htmlFor="first_name" className="w-full text-sm font-bold mb-1">First name</label>
              <p name="first_name" className="w-full text-gray-400 bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-6" >
                {userData.first_name}
              </p>

              <label htmlFor="last_name" className="w-full text-sm font-bold mb-1">Last name</label>
              <p name="last_name" className="w-full text-gray-400 bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-6" >
                {userData.last_name}
              </p>

              <label htmlFor="role" className="w-full text-sm font-bold mb-1">Role</label>
              <p name="role" className="w-full text-gray-400 bg-text-input-field border-none rounded-lg h-10 text-md p-2 mb-3" >
                {userData.role}
              </p>
            </div>
          : <div className='w-80 text-lg flex flex-col items-center text-center'>
              <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-32 mb-12" />
              <p>You must be logged in to see any personal information.</p>
            </div>
        }

        <Link href='/showroom'>
          <p className="mt-8 text-hospital-green text-md text-center cursor-pointer">Back to showroom</p>
        </Link>
      </div>
    </>
  );
}

export default MyAccount;