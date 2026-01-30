import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F5FAE1] text-base-content border-t-1 border-[#896C6C] rounded-tl-2xl rounded-tr-2xl">
      <div className="footer max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <img src="/logo.png" alt="MealDesk" className="w-20" />
          <p className="mt-2 text-sm">
            Smart restaurant management solution to manage orders, menus, and
            staff efficiently.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.facebook.com/rakibul13631/"
              target="_blank"
              className="btn btn-circle btn-outline btn-sm"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/_rakibul_hasan_shuvo_/"
              target="_blank"
              className="btn btn-circle btn-outline btn-sm"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/rakibul263"
              target="_blank"
              className="btn btn-circle btn-outline btn-sm"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        <div>
          <span className="footer-title">Quick Links</span>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/menu" className="link link-hover">
            Menu
          </Link>
          <Link to="/dashboard" className="link link-hover">
            Dashboard
          </Link>
          <Link to="/login" className="link link-hover">
            Login
          </Link>
        </div>

        <div>
          <span className="footer-title">Contact</span>
          <p>Email: rakibulhasanshuvo206@gmail.com</p>
          <p>Phone: +880 1521-711716</p>
          <p>Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="border-t border-base-300 text-center py-4 text-sm">
        © {new Date().getFullYear()} MealDesk. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
