import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { api } from 'src/utils/axiosConnection';


export function DataImageInput({ field, id, url, setChangesMade }) {
  const [willChange, setWillChange] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [currentImage, setCurrentImage] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setCurrentImage(field[1]);
  }, [])


  function handleInputChange(event) {
    const fileType = event.target.files[0].type;
    try {
      if (
        fileType !== 'image/png' &&
        fileType !== 'image/jpg' &&
        fileType !== 'image/jpeg'
      ) {
        throw new Error('Invalid file extension');
      }
      setImage(event.target.files[0]);

    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  }


  function wontChange() {
    setImage(null);
    setError(null);
    setWillChange(false);
  }


  async function uploadNewImage() {
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const uploadUrl = process.env.CLOUDINARY_UPLOAD_URL || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;
    try {
      const imageFormData = new FormData();
      imageFormData.append('file', image);
      imageFormData.append('upload_preset', uploadPreset);
      const { data } = await axios.post(uploadUrl, imageFormData);
      const secureUrl = data['secure_url'];

      const body = {}
      body[field[0]] = secureUrl;
      const config = {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        }
      };
      const imageResponse = await api.patch(`${url}/${id}`, body, config);
      setCurrentImage(imageResponse.data[field[0]]);
      setWillChange(false);
      setChangesMade(prev => prev += 1)

    } catch (error) {
      console.warn(error);
    }
  }


  return (
    <div className='mr-4 pl-4 flex flex-row justify-between gap-4 bg-slate-200 rounded-md'>

      <section className='flex flex-row gap-4 py-2 '>
        {/* Current image */}
        <div className='pr-4 border-r border-gray-400'>
          <p className='text-center text-gray-600'>Current</p>
          <img src={currentImage} alt={field[0]} className='w-20 aspect-square rounded-xl border border-gray-300 shadow-md object-cover'/>
        </div>

        {/* Upload button and edit button */}
        <div className='w-auto h-full flex flex-row justify-start'>

          {/* Upload button */}
          {willChange
            ? <div className='w-auto max-w-xl h-full flex flex-col justify-start gap-1'>
                <label
                  htmlFor={field[0]}
                  className='w-36 h-10 flex justify-center items-center rounded-lg bg-slate-50 text-slate-800 border border-border shadow-md   hover:cursor-pointer hover:bg-slate-100'
                >
                  Upload image
                </label>
                <div className='flex flex-row gap-4'>
                  {image && <p className='text-gray-600'>Selected:</p>}
                  <p className='text-gray-700'>{image ? `${image.name}` : '- No file selected -'}</p>
                </div>
                {error && <p className='text-red-500'>{error}</p>}
              </div>
            : <div className='w-auto h-full flex items-center'>
                <p className='text-gray-700'>{`Enable upload -->`}</p>
              </div>
          }

          <input
            id={field[0]}
            type='file'
            onChange={handleInputChange}
            accept='image/png, image/jpg, image/jpeg'
            className='hidden bg-red-200 '
          />
        </div>
      </section>


      <section>
        {/* Edit button */}
        {!willChange &&
          <div
            onClick={() => setWillChange(true)}
            className='w-10 h-full flex justify-center items-center   hover:cursor-pointer'
          >
            <FontAwesomeIcon icon={faPenToSquare} className='h-5 text-gray-500 fill-current' />
          </div>
        }

        {/* Confirm & Decline buttons */}
        {willChange &&
          <div className='w-20 h-full flex flex-col justify-evenly items-center rounded-r-md   bg-gradient-to-l from-slate-300'>
            {image
              ? <FontAwesomeIcon
                  icon={faCheck}
                  onClick={uploadNewImage}
                  className='w-12 h-5 rounded-md p-0.5 bg-white border border-border shadow-md text-hospital-green fill-current   hover:bg-hospital-green hover:text-white hover:cursor-pointer'
                />
              : <FontAwesomeIcon
                  icon={faCheck}
                  className='w-12 h-5 rounded-md p-0.5 bg-slate-200 border border-border shadow-md text-gray-400 fill-current'
                />
            }

            <FontAwesomeIcon
              icon={faXmark}
              onClick={wontChange}
              className='w-12 h-5 rounded-md p-0.5 bg-white border border-border shadow-md text-red-500 fill-current   hover:bg-red-500 hover:text-white hover:cursor-pointer'
            />
          </div>
        }
      </section>

    </div>
  )
}