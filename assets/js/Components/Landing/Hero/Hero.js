import React from 'react';
import Typed from 'react-typed';
import route from "@/Services/route";

const Hero = () => {
  return (
      <div id='home' className='bg-indigo-600'>
          <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center text-white'>
              <p className='uppercase text-[#00DF9A]'>Growing with data analytics</p>
              <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Grow with data.</h1>
              <div className='flex justify-center items-center gap-2'>
                  <p className='md:text-5xl sm:text-4xl text-xl font-semibold py-4'>For games such as</p>
                  <Typed
                      className='md:text-5xl sm:text-4xl text-xl font-bold text-[#00DF9A]'
                      strings={['LoL', 'Dota 2', 'CS:GO', 'Rocket League', 'Valorant', 'Brawlhalla']}
                      typeSpeed={120} backSpeed={140}
                      loop
                  />
              </div>
              <p className='md:text-2xl text-xl font-semibold px-4'>Monitor your data analytics to increase revenue for BTB, BTC & SASS platforms</p>
              <a href={route('register')}>
                  <button className='py-4 px-2 w-[200px] bg-white text-indigo-600 hover:opacity-75 font-bold rounded-lg my-6 mx-auto py-3'>Get Started</button>
              </a>
          </div>
      </div>
  );
}

export default Hero;
