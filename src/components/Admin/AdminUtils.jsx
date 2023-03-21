import React from 'react';
import { capitalize } from 'lodash';

import { ProductsAdmin } from './ProductsAdmin';
import { SuppliersAdmin } from './SuppliersAdmin';
import { CategoriesAdmin } from './CategoriesAdmin';
import { UsersAdmin } from './UsersAdmin';
import { OrdersAdmin } from './OrdersAdmin';
import { PaymentsAdmin } from './PaymentsAdmin';



function CommonButton({ title, setIsDisplaced, openViews, setOpenViews, setSelectedView }) {
  // uses button name (lowercase) to navigate
  function handleClick() {
    const views = {...openViews};
    views[title] = true;
    setOpenViews({...views})
    setSelectedView(title);
    setIsDisplaced(true)
  }

  return (
    <div
      onClick={handleClick}
      className="w-full h-12 rounded-lg flex justify-center items-center border border-border text-hospital-green shadow-md   hover:cursor-pointer hover:bg-hospital-green hover:text-white hover:shadow-lg hover:font-bold   transition-all duration-200"
    >
      {capitalize(title)}
    </div>
  )
}


export function AdminUtils({ setIsAdminUtilsOpen }) {
  const [isDisplaced, setIsDisplaced] = React.useState(false);
  const [openViews, setOpenViews] = React.useState({
    products: false,
    suppliers: false,
    categories: false,
    users: false,
    orders: false,
    payments: false,
  })
  const [selectedView, setSelectedView] = React.useState('');

  // Goes back and closes opened menu after animation
  function handleGoBack() {
    const views = {...openViews}
    views[selectedView] = false;
    setIsDisplaced(false)
    setTimeout(() => {
      setOpenViews({...views});
    }, 700)
  }

  return (
    <div className='flex justify-center items-center fixed top-0 bottom-0 right-0 left-0   md:bg-gradient-to-r from-white'>

      {/* Background that closes the modal */}
      <div className='w-full h-full absolute bg-black bg-opacity-50'  onClick={() => setIsAdminUtilsOpen(false)} />

      {/* The bigger rectangle you see */}
      <div className='w-3/4 h-3/4 py-6 rounded-2xl bg-slate-100 border border-border z-10 overflow-hidden'>


        {/* Doubled sized container */}
        <div className={`w-[200%] h-full flex flex-row ${isDisplaced && '-translate-x-1/2'} duration-700`}>

          {/* First sention - seen when not displaced */}
          <section className='w-full h-full px-6 flex flex-row gap-6'>
            <div className='w-full h-full flex flex-col items-center gap-6'>
              <p className='text-lg text-black mt-6' >Products</p>
              <CommonButton
                title={'products'} setIsDisplaced={setIsDisplaced} openViews={openViews} setOpenViews={setOpenViews} setSelectedView={setSelectedView} />
              <CommonButton
                title={'suppliers'} setIsDisplaced={setIsDisplaced} openViews={openViews} setOpenViews={setOpenViews} setSelectedView={setSelectedView} />
              <CommonButton
                title={'categories'} setIsDisplaced={setIsDisplaced} openViews={openViews} setOpenViews={setOpenViews} setSelectedView={setSelectedView} />
            </div>
            <div className='w-full h-full flex flex-col items-center gap-6'>
              <p className='text-lg text-black mt-6' >Users</p>
              <CommonButton
                title={'users'} setIsDisplaced={setIsDisplaced} openViews={openViews} setOpenViews={setOpenViews} setSelectedView={setSelectedView} />
              <CommonButton
                title={'orders'} setIsDisplaced={setIsDisplaced} openViews={openViews} setOpenViews={setOpenViews} setSelectedView={setSelectedView} />
              <CommonButton
                title={'payments'} setIsDisplaced={setIsDisplaced} openViews={openViews} setOpenViews={setOpenViews} setSelectedView={setSelectedView} />
            </div>
          </section>

          {/* Second section - seen when displaced */}
          <section className='w-full h-full px-6'>
            <button onClick={handleGoBack}>Back</button>
            {openViews.products && <ProductsAdmin />}
            {openViews.suppliers && <SuppliersAdmin />}
            {openViews.categories && <CategoriesAdmin />}
            {openViews.users && <UsersAdmin />}
            {openViews.orders && <OrdersAdmin />}
            {openViews.payments && <PaymentsAdmin />}
          </section>

        </div>

      </div>

    </div>
  )
}