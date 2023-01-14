import React from 'react';

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
        <span className='text-gray-300'>Last</span>
      }

      <div className="flex flex-row items-center gap-4 font-bold">
        <p>$ {order.total}</p>
        <img src="/assets/icons/flechita.svg" alt="arrow" />
      </div>
    </div>
  );
}

export { MyOrdersItem }