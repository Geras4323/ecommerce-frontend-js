import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

import { api } from 'src/utils/axiosConnection';


export function DataTextInput({ field, id, url, setChangesMade }) {
  const inputRef = React.useRef(null);
  const [previousValue, setPreviousValue] = React.useState();
  const [currentValue, setCurrentValue] = React.useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = React.useState(false);
  const [willChange, setWillChange] = React.useState(false);

  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setCurrentValue(field[1]);
  }, [])

  function wontChange() {
    inputRef.current.value = currentValue;
    setError(false);
    setWillChange(false);
  }

  function evaluateEquality() {
    if (inputRef.current.value != currentValue) { // may be number in DB but we send text
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
  }

  async function uploadChanges() {
    try {
      const body = {};
      body[field[0]] = inputRef.current.value;
      const config = {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        }
      };
      const { data } = await api.patch(`${url}/${id}`, body, config);
      setPreviousValue(currentValue);
      setCurrentValue(data[field[0]]);
      setError(false);
      setWillChange(false);
      setChangesMade(prev => prev += 1) // update to trigger a re-fetch and re-render of the main list

    } catch (err) {
      console.log(err);
      if (err.response.status === 400) { // wrong datatype
        const error = err.response.data.error;
        const stringifiedError = JSON.stringify(error.message);
        setError(stringifiedError);
      }
      else if (err.response.status === 409) {
        const error = err.response.data.error;
        const stringifiedError = JSON.stringify(error.message);
        setError(stringifiedError);
      }
      else if (err.response.status === 500 ) {  // id not found
        setError('ID not found');
      }
      else {
        console.log(err)
        setError('There has been an error');
      }
    }
  }


  return (
    <>
      <div className={`pl-3 flex flex-row justify-between items-center bg-slate-200 mr-4 rounded-md`}>
        <input
          ref={inputRef}
          id={field[0]}
          type='text'
          readOnly={!willChange}
          onChange={evaluateEquality}
          autoComplete='off'
          className={`w-full py-1 bg-transparent ${willChange ? 'hover:cursor-text' : 'hover:cursor-default'}   focus:outline-none`} defaultValue={field[1]}
        />

        {/* Edit button */}
        {!willChange &&
          <div
            onClick={() => {
              inputRef.current.focus();
              setWillChange(true);
              evaluateEquality();
            }}
            className='w-10 h-full flex justify-center items-center   hover:cursor-pointer'
          >
            <FontAwesomeIcon icon={faPenToSquare} className='h-5 text-gray-500 fill-current' />
          </div>
        }

        {/* Confirm & Decline buttons */}
        {willChange &&
          <div className='w-20 h-full flex flex-row justify-around items-center rounded-r-md   bg-gradient-to-l from-slate-400'>
            {isSubmitEnabled
              ? <FontAwesomeIcon
                  icon={faCheck}
                  onClick={uploadChanges}
                  className='h-5 aspect-square rounded-md p-0.5 bg-white border border-border shadow-md text-hospital-green fill-current   hover:bg-hospital-green hover:text-white hover:cursor-pointer'
                />
              : <FontAwesomeIcon
                  icon={faCheck}
                  className='h-5 aspect-square rounded-md p-0.5 bg-slate-200 border border-border shadow-md text-gray-400 fill-current'
                />
            }

            <FontAwesomeIcon
              icon={faXmark}
              onClick={wontChange}
              className='h-5 aspect-square rounded-md p-0.5 bg-white border border-border shadow-md text-red-500 fill-current   hover:bg-red-500 hover:text-white hover:cursor-pointer'
            />
          </div>
        }
      </div>

      {previousValue &&
        <div className='flex flex-row gap-4'>
          <p className='text-sm text-gray-500'>Previous:</p>
          <p className='text-sm text-gray-500'>{previousValue}</p>
        </div>
      }

      {error &&
        <div className='flex flex-row gap-4'>
          <p className='text-sm text-red-500'>{error}</p>
        </div>
      }
    </>
  )
}