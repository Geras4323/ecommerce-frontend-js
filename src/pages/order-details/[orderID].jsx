import React from 'react';
import Cookies from 'js-cookie';

import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { verifyToken } from 'src/utils/verifyToken';
import { api } from 'src/utils/axiosConnection';
import { MyOrderItem } from 'src/components/MyOrderItem';

function OrderDetails() {
  const router = useRouter();

  const [logged, setLogged] = React.useState();
  const [products, setProducts] = React.useState([]);
  const [ownsOrder, setOwnsOrder] = React.useState();

  React.useEffect(() => {
    async function verifyAndFetch() {
      try {
        const { orderID } = router.query;
        const login_token = Cookies.get('login-token');
        if (login_token) {
          setLogged(true);
          const { sub: userID } = await verifyToken(login_token);
          const {data: order} = await api.get(`/orders/${orderID}`);
          if (order.userID === userID) {
            setOwnsOrder(true);
            setProducts(order.products);
          } else {
            setOwnsOrder(false);
          }
        } else {
          setLogged(false);
        }
      } catch (err) {}
    }
    verifyAndFetch()
  }, [router.query])


  return (
    <>
    <Head>
      <title>Order Details | Yard Sale</title>
    </Head>
    <div className="pt-6 pb-4 w-full h-screen grid place-items-center">
      <div className="grid w-80">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-lg mb-10 font-bold">Order Details</h1>
          <Link href="/showroom">
            <p className="text-md text-hospital-green mb-10 font-bold   hover:cursor-pointer">Back to showroom</p>
          </Link>
        </div>

        {logged
          ? ownsOrder
            ? products.length > 0
              ? <div className="flex flex-col gap-4">
                  {products.map(product => (
                      <MyOrderItem
                        key={product.id}
                        product={product}
                      />
                    ))
                  }
                </div>
              : <p className='text-center text-lg'>This order has no products</p>

            : <p className='text-center text-lg'>This order does not belong to you.</p>

          : <div className='w-80 text-lg flex flex-col items-center text-center'>
              <p>You must be logged in to see your orders</p>
            </div>
        }

      </div>
    </div>
  </>
  );
}

export default OrderDetails;