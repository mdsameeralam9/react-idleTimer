import { useNavigate } from "react-router-dom";
import React from "react";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget; // the <form>
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    const payload = { email, password };
    console.log(payload);
    // TODO: make API call

    // Optional: reset after successful submit
    form.reset(); // clears back to initial values
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="border rounded flex flex-col items-center justify-center p-10">
        <h2 className="text-center mb-2 text-blue-800 font-bold">
          Login with your Credential
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center flex-col gap-4 w-75"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="border rounded p-2"
            name="email"
            // defaultValue can define initial state that reset() returns to
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="border rounded p-2"
            name="password"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-800 text-white p-2 rounded cursor-pointer"
            >
              Login
            </button>

            <button
              type="reset"
              className="bg-gray-200 text-gray-900 p-2 rounded cursor-pointer"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
