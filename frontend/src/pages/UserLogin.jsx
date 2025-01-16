import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../context/UserContext";

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logInUser = { email, password };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        logInUser
      );
      if (response.status === 200) {
        const data = response.data;
        setUser(data); 
        localStorage.setItem("token", data.token); 
        navigate('/home'); 
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-16 mb-10'
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="Logo"
        />
        <form onSubmit={handleSubmit}>
          <h3 className='text-lg mb-2 font-medium'>What's Your Email</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded w-full px-4 py-2 border text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <h3 className='text-lg mb-2 font-medium'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded w-full px-4 py-2 border text-lg placeholder:text-base'
            type="password"
            placeholder='password'
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg"
          >
            Login
          </button>
        </form>
        <p className='text-center'>
          New here?{" "}
          <Link to='/user/signup' className='text-blue-600'>
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to='/captain/login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;