import React, { use, useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const Signup = () => {
  const [error, setError] = useState("");
  const { createUser, verifiedEmail } = use(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!hasUppercase) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!hasLowercase) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        });
        verifiedEmail()
          .then((res) => {
            Swal.fire({
              title: "Please Verify Your Account",
              text: "We send a mail on your mail address.",
              icon: "success",
            });
            navigate("/login");
          })
          .catch((error) => {
            Swal.fire({
              title: "Something want wrong",
              icon: "error",
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Try Again.",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEE6CA] px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/70 rounded-2xl shadow-2xl border border-white/40">
        <div className="text-center pt-8 px-8">
          <h2 className="text-3xl font-semibold text-[#896C6C]">
            Register MealDesk Account
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Explore Delicious Moments
          </p>
        </div>

        <div className="px-8 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                required
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#EEE6CA]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                required
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#EEE6CA]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Photo URL
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="https://example.com/photo.jpg"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#EEE6CA]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="At least 6 characters"
                required
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#EEE6CA]"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#EEE6CA] text-gray-800 font-semibold hover:bg-[#e2d9b8] transition duration-300 shadow-md cursor-pointer"
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className="text-center pb-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
