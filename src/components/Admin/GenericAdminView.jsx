import React from 'react';
import Cookies from 'js-cookie';
// import { capitalize } from 'lodash';

import { api } from 'src/utils/axiosConnection';
import { AdminItem } from './AdminItem';

const widths = {
  small: 'w-20',
  medium: 'w-36',
  large: 'w-64',
  veryLarge: 'w-80',
}



export function GenericAdminView({ title, url, columns, admin, handleGoBack }) {
  const [itemList, setItemList] = React.useState([]);
  const [columnsKeys, setColumnsKeys] = React.useState([]);
  const [columnsWidths, setColumnsWidths] = React.useState([]);

  const [changesMade, setChangesMade] = React.useState(0);

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
      setItemList(data.sort((a, b) => a.id - b.id)); //order items by ID
    })()

    setColumnsKeys(Object.keys(columns));
    setColumnsWidths(Object.values(columns));

  }, [changesMade])

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
      <div className='w-full h-12 mt-4 mb-3 py-2 pl-2 pr-6 flex flex-row items-center rounded-lg shadow-md shadow-slate-300 bg-slate-200 border-b border-border'>
        {columnsKeys.map((key, index) => (
          <p key={index} className={`${widths[columnsWidths[index]]} pl-4 border-r border-gray-400`}>{key}</p>
        ))}
      </div>

      {/* Table content */}
      <div className='w-full h-[77%] flex flex-col gap-2  overflow-y-auto'>
        {itemList.map((item, index) => (
          <AdminItem key={index} item={item} url={url} title={title} columnsKeys={columnsKeys} columnsWidths={columnsWidths} setChangesMade={setChangesMade} />
        ))}
      </div>
    </div>
  )
}