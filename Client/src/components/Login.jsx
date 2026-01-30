import React from "react";
import { NavLink } from "react-router";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/70 rounded-2xl shadow-2xl border border-white/40">
        <div className="text-center pt-8 px-8">
          <h2 className="text-3xl font-semibold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-2">
            Login to continue your journey
          </p>
        </div>

        <div className="px-8 py-6">
          <form className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#EEE6CA]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#EEE6CA]"
              />
              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700 transition"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button className="w-full py-3 rounded-xl bg-[#EEE6CA] text-gray-800 font-semibold hover:bg-[#e2d9b8] transition duration-300 shadow-md">
              Login
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center pb-6">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <NavLink
              to="/signup"
              className="font-medium cursor-pointer hover:underline"
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
