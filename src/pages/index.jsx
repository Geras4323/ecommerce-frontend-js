import React from 'react';
import Cookies from 'js-cookie';

import Head from 'next/head';
import Link from 'next/link';

import { verifyToken } from 'src/utils/verifyToken';
import { VerticalImageMarquee } from 'src/components/VerticalImageMarquee';
import { AdminUtils } from 'src/components/Admin/AdminUtils';


export default function Home() {
  const [logged, setLogged] = React.useState();
  const [email, setEmail] = React.useState();
  const [role, setRole] = React.useState();
  const [isAdminUtilsOpen, setIsAdminUtilsOpen] = React.useState(false);

  React.useEffect(() => {
    async function getAccount() {
      const login_token = Cookies.get('login-token');
      if (login_token) {
        const { email, role } = await verifyToken(login_token);
        setEmail(email);
        setRole(role);
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
      <div className="w-screen h-screen flex flex-row justify-between items-center">


        <div className='hidden w-1/4 h-full bg-slate-100 overflow-hidden md:flex flex-row gap-4 relative px-3 shadow-2xl'>
          {/* <div className='w-full h-full absolute z-20 bg-gradient-to-b from-white via-transparent to-white' /> */}

          <VerticalImageMarquee
            speed={'slow'}
            urls={[
              'https://5.imimg.com/data5/LW/GN/MY-4990337/bath-soap-500x500.jpg',
              'https://ae01.alicdn.com/kf/He1a1c6a2db39447f9e9e33e7a21351a13.jpg',
              'https://m.media-amazon.com/images/I/71TawoxTk6L._UY500_.jpg',
              'https://m.media-amazon.com/images/I/71AVijzvhNL._UX569_.jpg',
              'https://indyschild.com/wp-content/uploads/2016/12/AdobeStock_96977357.jpeg',
              'https://m.media-amazon.com/images/I/41vbmwe7e4L._SY450_.jpg',
              'https://www.ikea.com/us/en/images/products/arkelstorp-desk-black__0735967_pe740301_s5.jpg?f=s',
              'https://cdn-learn.adafruit.com/assets/assets/000/001/161/medium800/led_strips_digitalledstrip.jpg?1396769336',
            ]}
          />

          <VerticalImageMarquee
            speed={'medium'}
            urls={[
              'https://i5.walmartimages.ca/images/Large/735/328/6000196735328.jpg',
              'https://m.media-amazon.com/images/I/41Glq0rVOvS._SY445_.jpg',
              'https://beardoi.s3.ap-south-1.amazonaws.com/uploads/3642-compact-sheesham-beard-comb-512x512.jpg',
              'https://i0.wp.com/recargasrafaela.com.ar/wp-content/uploads/2022/01/fox_relok_m6pro.jpg',
              'https://m.media-amazon.com/images/I/418QpEn9JKL._SX425_.jpg',
              'https://www.collinsdictionary.com/images/full/sock_99256316_1000.jpg',
              'https://images.fravega.com/f300/c453eec4f43bd55572ef32816f0dc7de.jpg',
              'https://secure.img1-fg.wfcdn.com/im/64150170/resize-h310-w310%5Ecompr-r85/1591/159162856/floral-single-shower-curtain-hooks.jpg',
            ]}
          />

        </div>


        <div className='w-full md:w-3/4 h-auto flex flex-row justify-center'>
          <div className="w-80 flex flex-col items-center">


            {isAdminUtilsOpen && <AdminUtils setIsAdminUtilsOpen={setIsAdminUtilsOpen} />}


            <img src="/assets/logos/logo_yard_sale.svg" alt="logo" className="w-36 mb-14" />

            <div className="w-full pb-5 text-lg border-b border-border">
              {logged

                ? <section className='flex flex-col gap-4'>
                    <p>Logged as <b className='text-gray-500 font-normal'>{email}</b></p>

                    {role === 'administrator' &&
                    <div
                      onClick={() => setIsAdminUtilsOpen(true)}
                      className="w-full h-12 rounded-lg flex justify-center items-center border border-border text-hospital-green shadow-md   hover:cursor-pointer hover:bg-hospital-green hover:text-white hover:shadow-lg hover:font-bold   transition-all duration-200"
                    >
                      Admin Utilities
                    </div>}

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
      </div>
    </>
  );
}