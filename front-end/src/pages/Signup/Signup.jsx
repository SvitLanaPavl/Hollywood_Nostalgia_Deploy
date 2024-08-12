import React from 'react';
import { Link } from 'react-router-dom';
import signupImg from '../../assets/signup.jpg'
import './Signup.css'

const SignUp = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-500 bg-opacity-60">
      <div className="flex w-[1000px] h-[800px] bg-interface rounded-3xl overflow-hidden shadow-lg">
        <div className="w-2/5 bg-cover" style={{ backgroundImage: `url(${signupImg})` }}></div>
        <div className="w-3/5 p-10 flex flex-col justify-start">
          <h1 className="text-white font-inter text-4xl font-bold mb-8 text-center">Sign Up</h1>
          <form className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full h-12 px-4 rounded-3xl bg-secondary shadow-md text-white"
                placeholder="example@gmail.com"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                className="w-full h-12 px-4 rounded-3xl bg-secondary shadow-md text-white"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full h-12 px-4 rounded-3xl bg-secondary shadow-md text-white"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full h-12 px-4 rounded-3xl bg-secondary shadow-md text-white"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-primary text-white font-bold rounded-full hover:brightness-110 mt-4"
            >
              Create Account
            </button>
          </form>
          <p className="mt-6 text-center text-white text-opacity-65 text-lg">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:brightness-110 font-bold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
