import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupImg from '../../assets/signup.jpg'
import prev from '../../assets/prev.svg'
import './Signup.css'

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, confirm_password, email }) // Convert the body to a JSON string
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      console.log('Signup successful:', data);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="signup flex justify-center items-center min-h-screen bg-secondary bg-opacity-60">
      {/* Back to Home Link */}
      <Link to="/" className="absolute flex justify-center items-center top-4 left-4 text-white opacity-60 text-base font-medium hover:scale-105 transition ease-in-out duration-300">
          <img src={prev} alt='Prev Icon' className='w-4 me-2'/>
          Back to Home
        </Link>
      <div className="flex w-[1000px] h-[800px] bg-interface rounded-3xl overflow-hidden shadow-lg">
        <div className="w-2/5 bg-cover" style={{ backgroundImage: `url(${signupImg})` }}></div>
        <div className="w-3/5 p-10 flex flex-col justify-start">
          <h1 className="text-white font-inter text-4xl font-bold mb-8 text-center">Sign Up</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full h-12 px-4 rounded-3xl bg-secondary shadow-md text-white"
                placeholder="example@gmail.com"
                value={email} // mei added
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                className="w-full h-12 px-4 rounded-3xl bg-secondary shadow-md text-white"
                placeholder="Enter your username"
                value={username} // mei added
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full h-12 px-4 rounded-3xl bg-secondary shadow-md text-white"
                placeholder="Enter your password"
                value={password} // mei added
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full h-12 px-4 rounded-3xl bg-secondary shadow-md text-white"
                placeholder="Confirm your password"
                value={confirm_password} // mei added
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-primary text-white font-bold rounded-full hover:brightness-110 mt-4"
            >
              Create Account
            </button>
            {/* If password doesn't match confirm-password, error message display -- Mei added */}
            <div id="error-message" style={{color: "red"}}></div>
          </form>
          <p className="mt-6 text-center text-white text-opacity-65 text-base">
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

export default Signup;
