import React from 'react';
import { DataImageInput } from './DataImageInput';

import { DataTextInput } from './DataTextInput';


export function ItemData({ id, data, url, title, setIsDataShown, setChangesMade }) {
  return (
    <section className='w-1/2 px-6  fixed top-0 bottom-0 right-0 flex flex-col justify-left bg-white'>

      {/* Back button and Save button */}
      <div className='w-full mb-4 flex flex-row justify-start items-center gap-3'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-5 hover:scale-110 duration-200 hover:cursor-pointer' onClick={() => setIsDataShown(false)}>
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>
        <p className='font-bold text-xl'>{title}</p>
      </div>

      <form className='w-full h-full flex flex-col overflow-y-auto'>
        {data.map((field, index) => (
          <div key={index} className='flex flex-col gap-1 mb-3'>
            <label htmlFor={field[0]}>{`${field[0]}:`}</label>
            {!(field[0] === 'image')
              ? (field[0] === 'id' || field[0] === 'createdAt' || field[0] === 'updatedAt')
                  ? <p className='px-3 py-1 rounded-md mr-4 border border-border   hover:cursor-default   focus:outline-none'>{field[1]}</p>
                  : <DataTextInput field={field} id={id} url={url} setChangesMade={setChangesMade} />
              : <DataImageInput field={field} id={id} url={url} setChangesMade={setChangesMade} />
            }
          </div>
        ))}
      </form>

    </section>
  )
}

///////////////////////////////////////////////////////////////////////////////