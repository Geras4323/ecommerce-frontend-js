import React from 'react';

import { ItemData } from './ItemData';

const widths = {
  small: 'w-20',
  medium: 'w-36',
  large: 'w-64',
  veryLarge: 'w-80',
}


export function AdminItem({ item, url, title, columnsKeys, columnsWidths, setChangesMade }) {
  const [isDataShown, setIsDataShown] = React.useState(false);

  function handleClickItem() {
    setIsDataShown(true);
  }

  return (
    <div>
      <section
        onClick={handleClickItem}
        className='w-full h-12 py-2 px-2 flex flex-row items-center rounded-lg bg-slate-100 border-b border-border   hover:cursor-pointer hover:bg-slate-200'
      >
        {columnsKeys.map((key, index) => (
          <p key={index} className={`${widths[columnsWidths[index]]} pl-4 border-r border-gray-300`}>{item[key]}</p>
        ))}
      </section>

      {isDataShown && <ItemData id={item.id} data={Object.entries(item)} url={url} title={title} setIsDataShown={setIsDataShown} setChangesMade={setChangesMade} />}
    </div>
  )
}