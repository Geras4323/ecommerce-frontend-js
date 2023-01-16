import React from 'react';
import Cookies from 'js-cookie';

import Head from 'next/head';

import { Header } from '../containers/Header';
import { ProductsList } from '../containers/ProductsList';

import { verifyToken } from 'src/utils/verifyToken';


function Showroom() {
  const [email, setEmail] = React.useState();

  const [category, setCategory] = React.useState(0)


  React.useEffect(() => {
    async function getMail() {
      const login_token = Cookies.get('login-token');
      if (login_token) {
        const { email } = await verifyToken(login_token);
        setEmail(email);
      } else {
        setEmail(undefined);
      }
    }
    getMail();
  }, [])

  return (
    <>
      <Head>
        <title>Showroom | Yard Sale</title>
      </Head>
      <div>
        <Header email={email} setCategory={setCategory} />
        <ProductsList email={email} category={category} />
      </div>
    </>
  );
}

export default Showroom;