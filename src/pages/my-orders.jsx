import React from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

import Head from 'next/head';

import { MyOrdersItem } from '../components/MyOrdersItem';
import { api } from 'src/utils/axiosConnection';


function MyOrders() {
  const [orders, setOrders] = React.useState([]);


  React.useEffect(() => {
    async function fetchOrders() {
      const login_token = Cookies.get('login-token');
      const config = {
        headers:{
          Authorization: `Bearer ${login_token}`,
        }
      };
      const myOrders = await api.get('/profile/my-orders', config);
      setOrders(myOrders.data);
    }

    fetchOrders()
  }, [])

  return (
    <>
      <Head>
        <title>My Orders | Yard Sale</title>
      </Head>
      <div className="w-full h-screen grid place-items-center">
        <div className="grid w-80">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-lg mb-10 font-bold">My orders</h1>
            <Link href="/showroom">
              <p className="text-md text-hospital-green mb-10 font-bold   hover:cursor-pointer">Back to showroom</p>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {orders.map((order, index) => (
                <MyOrdersItem
                key={order.id}
                  order={order}
                  last={index === (orders.length)-1}
                />
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default MyOrders;