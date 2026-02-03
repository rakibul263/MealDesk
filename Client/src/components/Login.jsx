import React, { use } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser, signInGoogle } = use(AuthContext);
  const navigate = useNavigate();

  const handleGoogle = () => {
    signInGoogle()
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Try Again.",
          footer: <a href="/signup"></a>,
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((res) => {
        navigate("/");
        Swal.fire({
          title: "Login Successful.",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Try Again.",
          footer: <a href="/signup"></a>,
        });
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#EEE6CA]">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/70 rounded-2xl shadow-2xl border border-white/40">
        <div className="text-center pt-8 px-8">
          <h2 className="text-3xl font-bold text-[#896C6C]">
            Your Table is Ready
          </h2>
          <p className="text-sm text-gray-500 mt-2">login to MealDesk.</p>
        </div>

        <div className="px-8 py-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email Address"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#EEE6CA]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                name="password"
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

            <button className="w-full py-3 rounded-xl bg-[#EEE6CA] text-gray-800 font-semibold hover:bg-[#e2d9b8] transition duration-300 shadow-md cursor-pointer">
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

          {/* login with google */}
          <button
            className="btn bg-white text-black border-[#e5e5e5] w-[85%] rounded-2xl mt-5"
            onClick={handleGoogle}
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
