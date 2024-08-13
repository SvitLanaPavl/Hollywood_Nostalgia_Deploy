import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import signupImg from '../../assets/signup.jpg'
import './Login_Signup.css'
import prev from '../../assets/prev.svg'

const handleSubmit = (username, password) => {
  fetch('http://172.17.0.2:9002/auth/login', {
    method: "POST",
    body: {username: username, password: password}
  })
}

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
          <form className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                className="w-full h-12 px-4 rounded-3xl bg-secondary shadow-md text-white"
                placeholder="Enter your username"
                defaultValue={username} required // Mei added
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full h-12 px-4 rounded-3xl bg-secondary shadow-md text-white focus:outline-offset-0"
                placeholder="Enter your password"
                defaultValue={password} required // Mei added
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
              onClick= {handleSubmit()}
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
