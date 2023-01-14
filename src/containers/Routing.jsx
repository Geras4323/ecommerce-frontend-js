import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from '../pages';
import { CreateAccount } from '../pages/auth/create-account';
import { Login } from '../pages/auth/login';
import { Showroom } from '../pages/showroom';
import { ViewAccountData } from '../pages/account-data';
import { RecoverPassword } from '../pages/auth/recover-password';
import { NewPassword } from '../pages/auth/new-password';
import { EmailSent } from '../pages/auth/email-sent';
import { MyOrders } from '../pages/my-orders';
import { MyOrder } from '../pages/my-order';
import { NotFound } from '../pages/404';

import { AppContext } from '../contexts/AppContext';
import { useInitialState } from '../hooks/useInitialState';


function Routing() {
  const initialState = useInitialState();

  return (
    <AppContext.Provider value={initialState}>
      <BrowserRouter>
        <Routes>

          <Route exact path="/" element={ <Home /> } />
          <Route exact path="/create-account" element={ <CreateAccount />} />
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/showroom" element={ <Showroom /> } />
          <Route exact path="/account-data" element={ <ViewAccountData />} />
          <Route exact path="/recover-password" element={ <RecoverPassword /> } />
          <Route exact path="/new-password" element={ <NewPassword /> } />
          <Route exact path="/email-sent" element={ <EmailSent /> } />
          <Route exact path="/my-orders" element={ <MyOrders /> } />
          <Route exact path="/my-order" element={ <MyOrder /> } />
          <Route path="*" element={ <NotFound /> } />

        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export { Routing };