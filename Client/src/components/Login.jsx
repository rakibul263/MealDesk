import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signInUser, signInGoogle, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForgetPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Forgot Password 🔐",
      input: "email",
      inputLabel: "Enter your registered email",
      inputPlaceholder: "example@gmail.com",
      showCancelButton: true,
      confirmButtonText: "Send Reset Link",
      confirmButtonColor: "#A3B18A",
      inputValidator: (value) => {
        if (!value) {
          return "Email is required!";
        }
      },
    });
    if (email) {
      try {
        await resetPassword(email);
        Swal.fire({
          icon: "success",
          title: "Email Sent 📧",
          text: "Password reset link has been sent to your email.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "No account found with this email.",
        });
      }
    }
  };

  const handleGoogle = async () => {
    try {
      const res = await signInGoogle();
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Try Again.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await signInUser(email, password);
      const loggedUser = res.user;

      await loggedUser.reload();

      if (!loggedUser.emailVerified) {
        Swal.fire({
          icon: "warning",
          title: "Email Not Verified ❌",
          text: "Please verify your email before logging in.",
        });
        return;
      }
      Swal.fire({
        title: "Login Successful 🎉",
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#EEE6CA]">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/70 rounded-2xl shadow-2xl border border-white/40">
        <div className="text-center pt-8 px-8">
          <h2 className="text-3xl font-bold text-[#896C6C]">
            Your Table is Ready
          </h2>
          <p className="text-sm text-gray-500 mt-2">Login to MealDesk</p>
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
                placeholder="Enter Your Verified Email"
                required
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#EEE6CA]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                placeholder="Enter Your Password."
                type="password"
                name="password"
                required
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#EEE6CA]"
              />
              <p
                className="text-sm flex justify-end hover:cursor-pointer hover:underline mt-2"
                onClick={handleForgetPassword}
              >
                Forget Your Password
              </p>
            </div>

            <button className="w-full py-3 rounded-xl bg-[#EEE6CA] text-gray-800 font-semibold hover:bg-[#e2d9b8] transition duration-300 shadow-md">
              Login
            </button>
          </form>
        </div>

        <div className="text-center pb-6">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <NavLink to="/signup" className="font-medium hover:underline">
              Sign up
            </NavLink>
          </p>

          <button
            onClick={handleGoogle}
            className="btn bg-white text-black border-[#e5e5e5] w-[85%] rounded-2xl mt-5"
          >
            <FcGoogle size={20} />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
