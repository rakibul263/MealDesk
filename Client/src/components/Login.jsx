import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";

const Login = () => {
  const { signInUser, signInGoogle, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForgetPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Reset Password",
      input: "email",
      inputPlaceholder: "Enter your email",
      showCancelButton: true,
      confirmButtonText: "Send Link",
      confirmButtonColor: "#E67E22",
      cancelButtonColor: "#5D4037",
      customClass: { popup: "rounded-3xl" },
    });
    if (email) {
      try {
        await resetPassword(email);
        Swal.fire({
          icon: "success",
          title: "Sent!",
          confirmButtonColor: "#E67E22",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Email not found",
          confirmButtonColor: "#5D4037",
        });
      }
    }
  };

  const handleGoogle = async () => {
    try {
      await signInGoogle();
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Google Sign-in failed",
        confirmButtonColor: "#E67E22",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await signInUser(email, password);
      if (!res.user.emailVerified) {
        Swal.fire({
          icon: "warning",
          title: "Verify Email",
          confirmButtonColor: "#E67E22",
        });
        return;
      }
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid credentials",
        confirmButtonColor: "#5D4037",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center p-6 lg:pt-32 pb-20">
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl shadow-orange-100/50 flex flex-col md:flex-row overflow-hidden border border-orange-50">
        {/* Left Side: Modern Branding Section */}
        <div className="md:w-5/12 bg-[#5D4037] p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#E67E22] rounded-full opacity-10 animate-pulse"></div>

          <div className="relative z-10">
            <h1 className="text-white text-4xl font-black leading-tight mb-4">
              Delicious <br /> Moments <br />{" "}
              <span className="text-[#E67E22]">Start Here.</span>
            </h1>
            <p className="text-orange-100/60 text-sm font-medium leading-relaxed">
              Access your personalized dashboard, track your favorite meals, and
              explore the best recipes in town.
            </p>
          </div>

          <div className="relative z-10 pt-10">
            <p className="text-white text-xs font-bold uppercase tracking-widest">
              Join with us
            </p>
          </div>
        </div>

        <div className="md:w-7/12 p-8 md:p-16">
          <div className="mb-10 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-black text-[#5D4037]">
                Welcome Back
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Please enter your details to login
              </p>
            </div>
            <div className="hidden sm:block">
              <span className="text-4xl">🍕</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-[#5D4037] uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div className="relative group">
                <IoMailOutline
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E67E22] transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-[#E67E22]/30 focus:bg-white focus:outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black text-[#5D4037] uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgetPassword}
                  className="text-[10px] font-bold text-[#E67E22] hover:underline uppercase tracking-tighter"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <IoLockClosedOutline
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E67E22] transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-[#E67E22]/30 focus:bg-white focus:outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            <button className="w-full bg-[#5D4037] hover:bg-[#E67E22] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-brown-100 flex items-center justify-center gap-2 group">
              Sign In Now
              <IoChevronForwardOutline className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="flex items-center my-8">
            <div className="flex-1 h-[1px] bg-gray-100"></div>
            <span className="px-4 text-[10px] text-gray-300 font-bold uppercase tracking-widest">
              Social Login
            </span>
            <div className="flex-1 h-[1px] bg-gray-100"></div>
          </div>

          <button
            onClick={handleGoogle}
            className="w-full py-4 rounded-2xl border-2 border-stone-100 hover:border-orange-100 hover:bg-orange-50/30 transition-all flex items-center justify-center gap-3 font-bold text-sm text-[#5D4037]"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <p className="mt-10 text-center text-sm font-bold text-gray-400">
            New here?{" "}
            <NavLink
              to="/signup"
              className="text-[#E67E22] hover:underline ml-1"
            >
              Create an account
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
