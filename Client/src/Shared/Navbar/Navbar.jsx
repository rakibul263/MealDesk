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
      ? "text-[#896C6C] font-semibold border-b-2 border-[#896C6C]"
      : "text-gray-600 hover:text-[#896C6C] transition";

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
      <li>
        <NavLink to="/myFoods" className={navLinkClass}>
          My Food
        </NavLink>
      </li>
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
    <div className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-[#E5E1D8] shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-6">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              ☰
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 shadow-xl bg-white rounded-xl w-52"
            >
              {links}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="MealDesk" className="w-10" />
            <span className="font-bold text-lg text-[#896C6C]">MealDesk</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1">{links}</ul>
        </div>

        <div className="navbar-end">
          {user?.emailVerified ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-[#896C6C] object-cover"
                />
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-3 shadow-xl bg-white rounded-xl w-44"
              >
                <li>
                  <Link to="/profile" className="hover:bg-[#F5FAE1] rounded-lg">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-full bg-[#896C6C] text-white font-medium hover:bg-[#6f5555] transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
