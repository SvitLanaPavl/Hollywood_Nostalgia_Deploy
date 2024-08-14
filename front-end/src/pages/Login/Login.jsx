import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupImg from '../../assets/signup.jpg'
import './Login_Signup.css'
import prev from '../../assets/prev.svg'

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }) // Convert the body to a JSON string
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      console.log('Login successful:', data);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="signup flex justify-center items-center min-h-screen bg-gray-500 bg-opacity-60">
      {/* Back to Home Link */}
      <Link to="/" className="absolute flex justify-center items-center top-4 left-4 text-white opacity-60 text-base font-medium hover:scale-105 transition ease-in-out duration-300">
          <img src={prev} alt='Prev Icon' className='w-4 me-2'/>
          Back to Home
        </Link>
      <div className="flex w-[1000px] h-[800px] bg-interface rounded-3xl overflow-hidden shadow-lg">
        <div className="w-2/5 bg-cover" style={{ backgroundImage: `url(${signupImg})` }}></div>
        <div className="w-3/5 p-10 flex flex-col justify-start">
          <h1 className="text-white text-center font-inter text-4xl font-bold mb-8">Log In</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                className="w-full h-12 px-4 rounded-3xl bg-secondary shadow-md text-white"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update state on change
                required // Mei added
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full h-12 px-4 rounded-3xl bg-secondary shadow-md text-white focus:outline-offset-0"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on change
                required // Mei added
              />
              <div className="text-right mt-2">
                <Link to="/forgot-password" className="text-red-500 text-sm hover:brightness-110">
                  Forgot password?
                </Link>
              </div>
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-primary hover:brightness-110 rounded-full text-white font-bold mt-4"
            >
              Log In
            </button>
          </form>
          <p className="mt-6 text-center text-white text-opacity-65 text-base">
            New user?{" "}
            <Link to="/signup" className="text-primary font-bold hover:brightness-110">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
