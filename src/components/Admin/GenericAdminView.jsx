import React from 'react';
import { capitalize } from 'lodash';
import Cookies from 'js-cookie';

import { api } from 'src/utils/axiosConnection';


const widths = {
  small: 'w-20',
  medium: 'w-36',
  large: 'w-64',
  veryLarge: 'w-80',
}


function AdminItem({ item, columnsKeys, columnsWidths }) {
  return (
    <section className='w-full h-14 py-2 px-2 flex flex-row items-center rounded-lg bg-slate-50 border-b border-border   hover:cursor-pointer'>
      {columnsKeys.map((key, index) => (
        <p key={index} className={`${widths[columnsWidths[index]]} pl-4 border-r border-border`}>{item[key]}</p>
      ))}
    </section>
  )
}


export function GenericAdminView({ title, url, columns, admin, handleGoBack }) {
  const [itemList, setItemList] = React.useState([]);
  const [columnsKeys, setColumnsKeys] = React.useState([]);
  const [columnsWidths, setColumnsWidths] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      let config = {}
      if (admin) {
        const login_token = Cookies.get('login-token');
        if (login_token) {
          config = {
            headers:{
              Authorization: `Bearer ${login_token}`,
            }
          };
        }
      }
      const { data } = await api.get(url, config);
      setItemList(data);
    })()

    setColumnsKeys(Object.keys(columns));
    setColumnsWidths(Object.values(columns));

  }, [])

  return (
    <div className='h-full'>

      {/* Back button and title */}
      <div className='mb-4 flex flex-row items-center justify-start gap-3'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-5 hover:scale-110 duration-200 hover:cursor-pointer' onClick={handleGoBack}>
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>
        <p className='font-bold text-xl'>{title}</p>
      </div>

      {/* Table header */}
      <div className='w-full h-12 my-4 py-2 pl-2 pr-6 flex flex-row items-center rounded-lg bg-slate-200 border-b border-border'>
        {columnsKeys.map((key, index) => (
          <p key={index} className={`${widths[columnsWidths[index]]} pl-4 border-r border-border`}>{key}</p>
        ))}
      </div>

      {/* Table content */}
      <div className='w-full h-[77%] flex flex-col gap-2  overflow-y-auto'>
        {itemList.map((item, index) => (
          <AdminItem key={index} item={item} columnsKeys={columnsKeys} columnsWidths={columnsWidths} />
        ))}
      </div>
    </div>
  )
}