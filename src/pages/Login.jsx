import { useNavigate } from 'react-router-dom';
import React from "react";

const Login = () => {

  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const payload = {
      email,
      password,
    };
    console.log(payload);
    // make api call

    navigate('/dashboard')
    
    
  };

  const handleReset = () => {
    console.log("Reset");
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="border rounded flex flex-col item-center justify-center p-10">
        <h2 className="text-center mb-2 text-blue-800 font-bold">
          Login with your Credential
        </h2>
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="flex item-center justify-center flex-col gap-4 w-75"
        >
          <input
            type="text"
            placeholder="Enter your email"
            className="border rounded p-2"
            name="email"
          />
          <input
            type="text"
            placeholder="Enter your password"
            className="border rounded p-2"
            name="password"
          />
          <button
            type="submit"
            className="bg-blue-800 text-white p-2 rounded cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
