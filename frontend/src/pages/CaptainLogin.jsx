import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainDataProvider'; // Corrected import path

function CaptainLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCaptainData } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captain)

    if (response.status === 200) {
      const data = response.data

      setCaptainData(data)
      localStorage.setItem('token', data.token)
      navigate('/captain/home')

    }

    setEmail('')
    setPassword('')
  }
  
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-16 mb-10'
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg mb-2 font-medium'>Captain Email</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded w-full px-4 py-2 border text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className='text-lg mb-2 font-medium'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded w-full px-4 py-2 border text-lg placeholder:text-base'
            type="password"
            placeholder='password'
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg"
          >
            Login
          </button>
        </form>
        <p className='text-center'>
          New Captain?{" "}
          <Link to='/captain/signup' className='text-blue-600'>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CaptainLogin;
