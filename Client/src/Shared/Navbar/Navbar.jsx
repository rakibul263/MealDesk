import { Link, NavLink } from "react-router";

const Navbar = () => {
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
        <NavLink>Add Food</NavLink>
      </li>
      <li>
        <NavLink>My Orders</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar shadow-md px-8 lg:px-30 rounded-br-2xl rounded-bl-2xl bg-[#F5FAE1] fixed top-0 z-2">
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
        <Link to="/login" className="btn bg-[#7D8D86] text-white rounded-2xl">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
