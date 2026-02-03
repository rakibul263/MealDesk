import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import {
  IoPersonOutline,
  IoMailOutline,
  IoImageOutline,
  IoLockClosedOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";

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
          .then(() => {
            Swal.fire({
              title: "Verify Your Account 📧",
              text: "We've sent a verification link to your email address.",
              icon: "success",
              confirmButtonColor: "#E67E22",
              customClass: { popup: "rounded-[2rem]" },
            });
            navigate("/login");
          })
          .catch(() => {
            Swal.fire({
              title: "Verification Email Failed",
              icon: "error",
              confirmButtonColor: "#5D4037",
            });
          });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "This email might already be in use.",
          confirmButtonColor: "#5D4037",
        });
      });
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-6 lg:pt-32 pb-20">
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl shadow-orange-100/50 flex flex-col md:flex-row-reverse overflow-hidden border border-orange-50">
        {/* Visual Side (Now on the Right for Signup) */}
        <div className="md:w-5/12 bg-[#5D4037] p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#E67E22] rounded-full opacity-10 animate-pulse"></div>

          <div className="relative z-10 text-right md:text-left">
            <h1 className="text-white text-4xl font-black leading-tight mb-4">
              Join the <br /> Foodie <br />{" "}
              <span className="text-[#E67E22]">Community.</span>
            </h1>
            <p className="text-orange-100/60 text-sm font-medium leading-relaxed">
              Create your account to unlock exclusive recipes, manage your meal
              plans, and join thousands of food enthusiasts.
            </p>
          </div>

          <div className="relative z-10 pt-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="w-10 h-10 bg-[#E67E22] rounded-xl flex items-center justify-center text-white font-bold">
                  1
                </div>
                <p className="text-white text-xs font-bold">
                  Register your account
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="w-10 h-10 bg-[#E67E22] rounded-xl flex items-center justify-center text-white font-bold">
                  2
                </div>
                <p className="text-white text-xs font-bold">
                  Verify your email address
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="md:w-7/12 p-8 md:p-14">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#5D4037]">
              Create Account
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Join MealDesk and start exploring
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#5D4037] uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <IoPersonOutline
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E67E22] transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-[#E67E22]/30 focus:bg-white focus:outline-none transition-all font-medium text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#5D4037] uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <IoMailOutline
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E67E22] transition-colors"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-[#E67E22]/30 focus:bg-white focus:outline-none transition-all font-medium text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#5D4037] uppercase tracking-widest ml-1">
                Profile Photo URL
              </label>
              <div className="relative group">
                <IoImageOutline
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E67E22] transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Your imgbb image link"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-[#E67E22]/30 focus:bg-white focus:outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#5D4037] uppercase tracking-widest ml-1">
                Security Password
              </label>
              <div className="relative group">
                <IoLockClosedOutline
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E67E22] transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-[#E67E22]/30 focus:bg-white focus:outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-[11px] font-bold p-3 rounded-xl border border-red-100 animate-shake">
                ⚠️ {error}
              </div>
            )}

            <button className="w-full bg-[#5D4037] hover:bg-[#E67E22] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-brown-100 flex items-center justify-center gap-2 group mt-4">
              Create My Account
              <IoChevronForwardOutline className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-bold text-gray-400">
            Already part of the family?{" "}
            <Link to="/login" className="text-[#E67E22] hover:underline ml-1">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
