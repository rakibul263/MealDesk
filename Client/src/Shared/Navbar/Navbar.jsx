import { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const links = (
    <>
      <li>
        <NavLink>Home</NavLink>
      </li>
      <li>
        <NavLink>All Foods</NavLink>
      </li>
      <li>
        <NavLink>Gallery</NavLink>
      </li>
      <li>
        <NavLink>My Food</NavLink>
      </li>
      <li>
        <NavLink to="/addFood">Add Food</NavLink>
      </li>
      <li>
        <NavLink>My Orders</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar shadow-md px-8 lg:px-30 rounded-br-2xl rounded-bl-2xl bg-[#F5FAE1] fixed top-0 z-2 border-b-1 border-[#896C6C]">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <div>
          <img src="/logo.png" alt="MealDesk" className="w-12" />
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border-2 border-[#7C6261]">
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow bg-[#D6CFB6]"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li
                onClick={() => {
                  signOutUser();
                }}
              >
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn bg-[#7D8D86] text-white rounded-2xl">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
