import React from 'react';
import { Link } from 'react-router-dom';

function Start() {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1515543582370-4cff31e54e8b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-red-400 h-screen w-full justify-between flex flex-col pt-5'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" className='w-14 ml-9'/>
        <div className='bg-white pb-7 py-4 px-4'>
          <h2 className='text-3xl font-bold ml-4'>Get started with Uber</h2>
          <Link to="/user/login" className='flex items-center justify-center w-full bg-black text-white rounded py-3 mt-2'>Continue</Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
