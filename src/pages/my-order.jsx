import React from 'react';
import Cookies from 'js-cookie';

import Head from 'next/head';
import Link from 'next/link';

import { MyOrderItem } from '../components/MyOrderItem';
import { AppContext } from '../contexts/AppContext';

import { verifyToken } from 'src/utils/verifyToken';
import { api } from 'src/utils/axiosConnection';


function MyOrder() {
  const { cart, setCart, setIsShoppingCartShown } = React.useContext(AppContext);
  const [makingReservation, setMakingReservation] = React.useState(false);
  const [reservationMade, setReservationMade] = React.useState(false);
  const [reservationError, setReservationError] = React.useState(false);

  const total = cart.reduce((total, item) => {
    return total + item.price;
  }, 0)

  const date = new Date();
  let dd = String(date.getDate()).padStart(2, '0'); // gets the day. Adds padding to fill the specified length
  let mm = String(date.getMonth() + 1).padStart(2, '0');
  let yyyy = date.getFullYear();
  let currentDate = `${dd} / ${mm} / ${yyyy}`;


  async function handleReservation() {
    try {
      setReservationError(false);
      setMakingReservation(true);

      // Get logged user's ID
      const login_token = Cookies.get('login-token');
      const { sub: userId } = await verifyToken(login_token);

      // Generate order for that user
      const orderBody = {
        userID: userId,
        total: total,
      }
      const config = {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        }
      };
      const { data: order } = await api.post('/orders', orderBody, config);

      // Add products for that order
      cart.forEach(async item => {
        const addProductBody = {
          orderID: order.id,
          productID: item.id,
          quantity: 1,
        }
        await api.post('/orders/add-product', addProductBody, config);
      })

      // Generate payment for that order
      const paymentBody = {
        orderID: order.id,
        amount: 0,
      }
      const { data: payment } = await api.post('/payments', paymentBody, config);

      // Send confirmation emails
      const confirmationBody = {
        userID: userId,
        orderID: order.id,
      }
      const { data: confirmation } = await api.post('/orders/confirmation', confirmationBody, config);
      console.log(confirmation);

      setMakingReservation(false);
      setReservationMade(true);
      setIsShoppingCartShown(false);

    } catch (err) {
      setMakingReservation(false);
      setReservationMade(false);
      setReservationError(true);
    }
  }

  function emptyCart() {
    setCart([]);
  }

  function goBack() {
    if (reservationMade) {
      emptyCart();
    }
  }


  return (
    <>
      <Head>
        <title>My Order | Yard Sale</title>
      </Head>
      <div className="w-full h-screen p-4 flex justify-center">

        <img src="/assets/logos/logo_yard_sale.svg" alt="logo"
        className="hidden w-32 fixed top-6 left-8   md:block" />

        <div className="w-96 h-full flex flex-col justify-center">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-lg mb-10 font-bold">My order</h1>
            <div
              onClick={goBack}
              className='text-md text-hospital-green mb-10 font-bold'
            >
              <Link href="/showroom">
                {reservationMade ? 'Back to showroom' : 'Back to cart'}
              </Link>
            </div>
          </div>

          <div className="max-h-full flex flex-col">
            <div className="flex flex-row justify-between h-16 items-center bg-text-input-field mb-6 rounded-lg px-6">
              <p className="flex flex-col">
                <span className="text-md font-bold">{currentDate}</span>
                <span className="text-sm text-very-light-pink">
                  {cart.length === 1
                    ? '1 article'
                    : `${cart.length} articles`
                  }
                </span>
              </p>
              <p className="text-end font-bold">{`$
                ${total}`}
              </p>
            </div>

            <section className="max-h-96 px-2 overflow-y-auto overflow-y-contain mb-2">
              {cart.map((item, index) => (
                <MyOrderItem
                  key={index}
                  product={item}
                />
              ))}
            </section>

            {!makingReservation && !reservationMade &&
              <button
                onClick={handleReservation}
                disabled={cart.length === 0}
                className={`${cart.length === 0 ? 'bg-trnsparent text-red-400' : 'bg-hospital-green'} border-none rounded-lg text-white w-full text-md font-bold h-12`}
              >
                {cart.length === 0 ? 'No items in cart!' : 'Place order'}
              </button>
            }
            {makingReservation && !reservationMade &&
              <div className='bg-hospital-green bg-opacity-50 border-none rounded-lg text-white w-full cursor-pointer text-md font-bold h-12'>
                <span className='h-full flex justify-center items-center animate-spin'>
                  <svg className='h-3/5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                </span>
              </div>
            }
            {!makingReservation && reservationMade &&
              <div className='flex flex-col justify-center items-center'>
                <div
                  className="flex justify-center items-center gap-3 bg-hospital-green bg-opacity-50 rounded-lg text-white w-full text-md font-bold h-12"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='h-3/5 fill-current text-green-800'>
                      <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/>
                    </svg>
                    Reservation Made
                </div>
                <Link href='/my-orders'>
                  <div
                    onClick={emptyCart}
                    className='mt-6 bg-white flex justify-center items-center border border-hospital-green rounded-lg text-hospital-green w-full cursor-pointer text-md font-bold h-12   hover:bg-hospital-green hover:text-white hover:font-bold   transition-all duration-200'
                  >
                    See my orders
                  </div>
                </Link>
              </div>
            }

            <p className='my-4 text-base text-very-light-pink'>You will receive an email cointaining your reservation details.</p>

            {reservationError &&
              <p className='mt-4 text-red-500 text-md'>Something went wrong :(</p>
            }

          </div>
        </div>
      </div>
    </>
  );
}

export default MyOrder;