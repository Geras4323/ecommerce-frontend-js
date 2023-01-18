import '../styles/globals.css';

import { AppContext } from '../contexts/AppContext';
import { useInitialState } from '../hooks/useInitialState';

import { Analytics } from '@vercel/analytics/react';


function MyApp({ Component, pageProps }) {
  const initialState = useInitialState();

  return (
    <AppContext.Provider value={initialState}>
      <Component {...pageProps} />
      <Analytics />
    </AppContext.Provider>
  )
}

export default MyApp
