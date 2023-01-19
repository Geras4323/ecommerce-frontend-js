import React from 'react';

import Link from 'next/link';

import { api } from 'src/utils/axiosConnection';

function MyOrdersItem({ order, last=false }) {
  const [numberOfProducts, setNumberOfProducts] = React.useState(0);


  React.useEffect(() => {
    async function countProducts() {
      const { data } = await api.get(`/orders/${order.id}`);
      setNumberOfProducts(data.products.length);
    }
    countProducts();
  }, [])

  return (
    <div className="w-full flex flex-row mb-6 items-center justify-between">
      <p className="flex flex-col items-center">
        <span className="text-md font-bold">{order.createdAt.replace(/T.*Z$/g, "")}</span>
        <span className="text-sm text-very-light-pink">
          {numberOfProducts === 1
            ? '1 article'
            : `${numberOfProducts} articles`
          }
        </span>
      </p>

      {last &&
        <span className='text-gray-400'>Last</span>
      }

      <div className="flex flex-row items-center gap-4 font-bold">
        <p>$ {order.total.toFixed(2)}</p>
        <Link href={`/order-details/${order.id}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='w-2.5 fill-current text-gray-500   hover:cursor-pointer'>
            <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

export { MyOrdersItem }