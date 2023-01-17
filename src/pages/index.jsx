import React from 'react';
import Cookies from 'js-cookie';

import Head from 'next/head';
import Link from 'next/link';

import { verifyToken } from 'src/utils/verifyToken';


function Home() {
  const [logged, setLogged] = React.useState();
  const [email, setEmail] = React.useState();

  React.useEffect(() => {
    async function getAccount() {
      const login_token = Cookies.get('login-token');
      if (login_token) {
        const { email } = await verifyToken(login_token);
        setEmail(email);
        setLogged(true);
      } else {
        setEmail(undefined);
        setLogged(false);
      }
    }
    getAccount()
  }, [logged])

  function handleSignOut() {
    Cookies.remove('login-token');
    setLogged(false);
  }


  return (
    <>
      <Head>
      <title>Home | Yard Sale</title>
      </Head>
      <div className="w-screen h-screen grid justify-center items-center">
        <div className="w-80 flex flex-col items-center">
          <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-36 mb-14" />

          <div className="w-full pb-5 text-lg border-b border-border">
            {logged

              ? <section className='flex flex-col gap-4'>
                  <p>Logged as <b className='text-gray-500 font-normal'>{email}</b></p>
                  <div
                    onClick={handleSignOut}
                    className="w-full h-12 rounded-lg flex justify-center items-center border border-border text-hospital-green shadow-md   hover:cursor-pointer hover:bg-hospital-green hover:text-white hover:shadow-lg hover:font-bold   transition-all duration-200"
                  >
                    Sign out
                  </div>
                </section>

              : <section className='w-full flex flex-col items-center text-center gap-3'>
                  <Link href="/auth/login">
                    <div
                      className="w-full h-12 rounded-lg flex justify-center items-center border border-border text-hospital-green shadow-md   hover:cursor-pointer hover:bg-hospital-green hover:text-white hover:shadow-lg hover:font-bold   transition-all duration-200"
                    >
                      Login
                    </div>
                  </Link>
                  <Link href="/auth/create-account">
                    <div
                      className="w-full h-12 rounded-lg flex justify-center items-center border border-border text-hospital-green shadow-md   hover:cursor-pointer hover:bg-hospital-green hover:text-white hover:shadow-lg hover:font-bold   transition-all duration-200"
                    >
                      Sign up
                    </div>
                  </Link>
                </section>
            }
          </div>

          <Link href="/showroom">
            <div className="w-full h-12 rounded-lg mt-5 flex justify-center items-center border border-border text-lg text-hospital-green shadow-md   hover:cursor-pointer hover:bg-hospital-green hover:text-white hover:shadow-lg hover:font-bold   transition-all duration-200">
              Go to Showroom
            </div>
          </Link>

        </div>
      </div>
    </>
  );
}

export default Home;