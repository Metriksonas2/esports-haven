import React from 'react';

const Preview = ({ invert, image, section, title, subtitle }) => {
  return (
      <React.Fragment>
          {invert && (
              <div className='w-full py-16 px-4'>
                  <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-2'>
                      <div className='flex flex-col justify-center text-indigo-600'>
                          <p className='uppercase font-bold'>{section}</p>
                          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>{title}</h1>
                          <p>{subtitle}</p>
                      </div>
                      <img className='w-[500px] mx-auto my-4 border shadow-md' src={image} alt=""/>
                  </div>
              </div>
          )}

          {!invert && (
              <div className='w-full bg-indigo-600 py-16 px-4'>
                  <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 gap-2'>
                      <img className='w-[500px] mx-auto my-4 shadow-md' src={image} alt=""/>
                      <div className='flex flex-col justify-center text-white'>
                          <p className='uppercase font-bold'>{section}</p>
                          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>{title}</h1>
                          <p>{subtitle}</p>
                      </div>
                  </div>
              </div>
          )}
      </React.Fragment>
  );
}

export default Preview;
