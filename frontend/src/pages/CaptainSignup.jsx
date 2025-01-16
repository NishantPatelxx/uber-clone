import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from "../context/CaptainDataProvider";
import axios from "axios";

function CaptainSignup() {
  const navigate = useNavigate();
  const { setCaptainData } = useContext(CaptainDataContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    vehicleColor: '',
    vehiclePlate: '',
    vehicleCapacity: '',
    vehicleType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: formData.firstName,
        lastname: formData.lastName
      },
      email: formData.email,
      password: formData.password,
      vehicle: {
        color: formData.vehicleColor,
        plate: formData.vehiclePlate,
        capacity: formData.vehicleCapacity,
        vehicleType: formData.vehicleType
      }
    };
    // try {
    //   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData);
    //   if (response.status === 201) {
    //     const data = response.data;
    //     setCaptainData(data.captain);
    //     localStorage.setItem("token", data.token);
    //     console.log(data.token);
    //     navigate('/captain/home');
    //   }
    // } catch (error) {
    //   console.error("Error during API call:", error.response ? error.response.data : error.message);
    // }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData);
      if (response.status === 201) {
        const data = response.data;
        console.log("API Response:", data); // Log the entire response
        if (data.token) {
          console.log("Token to store:", data.token);
          localStorage.setItem("token", data.token);
          console.log("Token from localStorage:", localStorage.getItem("token")); // Verify storage
          setCaptainData(data.captain);
          navigate('/captain/home');
        } else {
          console.error("Token missing in API response");
        }
      }
    } catch (error) {
      console.error("Error during API call:", error.response ? error.response.data : error.message);
    }
    
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      vehicleColor: '',
      vehiclePlate: '',
      vehicleCapacity: '',
      vehicleType: ''
    });
  };

  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
        <form onSubmit={handleSubmit}>
          <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='First name'
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Last name'
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
          <input
            required
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            required
            type="password"
            placeholder='password'
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              name="vehicleColor"
              value={formData.vehicleColor}
              onChange={handleChange}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              name="vehiclePlate"
              value={formData.vehiclePlate}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              name="vehicleCapacity"
              value={formData.vehicleCapacity}
              onChange={handleChange}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>
          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Create Captain Account</button>
        </form>
        <p className='text-center'>Already have an account? <Link to='/captain/login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  );
}

export default CaptainSignup;

