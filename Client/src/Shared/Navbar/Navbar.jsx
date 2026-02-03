import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-[#E67E22] font-bold border-b-2 border-[#E67E22] pb-1"
      : "text-gray-700 hover:text-[#E67E22] font-medium transition-all duration-300";

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/foods" className={navLinkClass}>
          All Foods
        </NavLink>
      </li>
      <li>
        <NavLink to="/gallery" className={navLinkClass}>
          Gallery
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={`/myFoods/${user.email}`} className={navLinkClass}>
            My Food
          </NavLink>
        </li>
      )}

      <li>
        <NavLink to="/addFood" className={navLinkClass}>
          Add Food
        </NavLink>
      </li>
      <li>
        <NavLink to="/orders" className={navLinkClass}>
          My Orders
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-8">
        {/* Left Section */}
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden text-[#E67E22]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-4 shadow-2xl bg-white rounded-2xl w-60 gap-3 border border-orange-50"
            >
              {links}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-1 bg-orange-50 rounded-lg group-hover:rotate-12 transition-transform">
              <img
                src="/logo.png"
                alt="MealDesk"
                className="w-9 h-9 object-contain"
              />
            </div>
            <span className="font-black text-2xl tracking-tight text-[#5D4037]">
              Meal<span className="text-[#E67E22]">Desk</span>
            </span>
          </Link>
        </div>

        {/* Center Section */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-6">{links}</ul>
        </div>

        {/* Right Section */}
        <div className="navbar-end">
          {user?.emailVerified ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar online"
              >
                <div className="w-10 rounded-full ring ring-[#E67E22] ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL} alt="profile" />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-4 p-3 shadow-2xl bg-white rounded-xl w-52 border border-orange-50"
              >
                <div className="px-4 py-2 mb-2 border-b border-gray-100">
                  <p className="text-xs text-gray-400">Welcome,</p>
                  <p className="font-bold text-[#5D4037] truncate">
                    {user?.displayName || "User"}
                  </p>
                </div>
                <li>
                  <Link
                    to="/profile"
                    className="hover:bg-orange-50 hover:text-[#E67E22] font-medium py-2"
                  >
                    User Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="mt-2 text-red-500 hover:bg-red-50 font-medium py-2 border-t border-gray-50"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="relative inline-flex items-center justify-center px-7 py-2.5 overflow-hidden font-medium text-white transition duration-300 ease-out bg-[#E67E22] rounded-full shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#D35400] group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                Login
              </span>
              <span className="relative invisible">Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
