import React from 'react';
import { capitalize } from 'lodash';

import { GenericAdminView } from './GenericAdminView';


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
    }, 500)
  }

  return (
    <div className='flex justify-center items-center fixed top-0 bottom-0 right-0 left-0   md:bg-gradient-to-r from-white'>

      {/* Background that closes the modal */}
      <div className='w-full h-full absolute bg-black bg-opacity-50'  onClick={() => setIsAdminUtilsOpen(false)} />

      {/* The bigger rectangle you see */}
      <div className='w-full h-full py-6   sm:w-3/4 sm:h-3/4 sm:rounded-2xl bg-white border border-border z-10 overflow-hidden relative'>

        <div className='w-5 absolute top-2 right-4 hover:cursor-pointer hover:scale-110 duration-200 z-20'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='w-full h-full' onClick={() => setIsAdminUtilsOpen(false)}>
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
          </svg>
        </div>


        {/* Doubled sized container */}
        <div className={`w-[200%] h-full flex flex-row  ${isDisplaced && '-translate-x-1/2'} duration-500`}>

          {/* First sention - seen when not displaced */}
          <section className='w-full h-full px-6 gap-10 flex flex-col   sm:flex-row'>
            <div className='w-full h-auto flex flex-col items-center gap-6'>
              <p className='text-xl text-black mt-6'>Products</p>
              <CommonButton
                title={'products'} setIsDisplaced={setIsDisplaced} openViews={openViews} setOpenViews={setOpenViews} setSelectedView={setSelectedView} />
              <CommonButton
                title={'suppliers'} setIsDisplaced={setIsDisplaced} openViews={openViews} setOpenViews={setOpenViews} setSelectedView={setSelectedView} />
              <CommonButton
                title={'categories'} setIsDisplaced={setIsDisplaced} openViews={openViews} setOpenViews={setOpenViews} setSelectedView={setSelectedView} />
            </div>
            <div className='w-full h-auto flex flex-col items-center gap-6 border-t border-border   sm:border-none'>
              <p className='text-xl text-black mt-6'>Users</p>
              <CommonButton
                title={'users'} setIsDisplaced={setIsDisplaced} openViews={openViews} setOpenViews={setOpenViews} setSelectedView={setSelectedView} />
              <CommonButton
                title={'orders'} setIsDisplaced={setIsDisplaced} openViews={openViews} setOpenViews={setOpenViews} setSelectedView={setSelectedView} />
              <CommonButton
                title={'payments'} setIsDisplaced={setIsDisplaced} openViews={openViews} setOpenViews={setOpenViews} setSelectedView={setSelectedView} />
            </div>
          </section>

          {/* Second section - seen when displaced */}
          <section className='w-full h-full px-6 overflow-x-auto'>

            {openViews.products &&
              <GenericAdminView
                title='Products'
                url='/products'
                columns={{
                  id: 'small',
                  name: 'large',
                  price: 'medium',
                  categoryID: 'medium',
                }}
                handleGoBack={handleGoBack}
              />}

            {openViews.suppliers &&
              <GenericAdminView
                title='Suppliers'
                url='/suppliers'
                columns={{
                  id: 'small',
                  name: 'large',
                }}
                handleGoBack={handleGoBack}
              />
            }

            {openViews.categories &&
              <GenericAdminView
                title='Categories'
                url='/categories'
                columns={{
                  id: 'small',
                  name: 'medium',
                }}
                handleGoBack={handleGoBack}
              />
            }

            {openViews.users &&
              <GenericAdminView
                title='Users'
                url='/users'
                columns={{
                  id: 'small',
                  email: 'veryLarge',
                  role: 'medium',
                }}
                admin
                handleGoBack={handleGoBack}
              />
            }

            {openViews.orders &&
              <GenericAdminView
                title='Orders'
                url='/orders'
                columns={{
                  id: 'small',
                  total: 'medium',
                  userID: 'small',
                }}
                handleGoBack={handleGoBack}
              />
            }

            {openViews.payments &&
              <GenericAdminView
                title='Payments'
                url='/payments'
                columns={{
                  id: 'small',
                  amount: 'medium',
                  orderID: 'small',
                }}
                handleGoBack={handleGoBack}
              />
            }

          </section>

        </div>

      </div>

    </div>
  )
}