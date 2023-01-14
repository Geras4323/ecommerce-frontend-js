import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import Cookies from 'js-cookie';

import { verifyToken } from 'src/utils/verifyToken';
import { api } from 'src/utils/axiosConnection';


function MyAccount() {
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    async function getUserData() {
      const login_token = Cookies.get('login-token');
      const { sub: userId } = await verifyToken(login_token);
      const { data } = await api.get(`/users/${userId}`);
      setUserData(data);
    }
    getUserData();
  }, [])

  return (
    <>
      <Head>
        <title>Login | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-32 mb-12   sm:hidden" />

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

          <Link href='/showroom'>
            <p className="mt-4 text-white text-md text-center mb-10 cursor-pointer">Back to showroom</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MyAccount;