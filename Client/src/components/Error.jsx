import { Link } from "react-router";
import { IoArrowBack, IoFastFoodOutline } from "react-icons/io5";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBF0] px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-[#E67E22]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-[#5D4037]/5 rounded-full blur-3xl"></div>

      <div className="text-center z-10">
        <div className="relative inline-block">
          <h1 className="text-[12rem] md:text-[15rem] font-black text-[#5D4037]/5 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <IoFastFoodOutline className="text-8xl md:text-9xl text-[#E67E22] animate-bounce" />
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-[#5D4037] -mt-8 mb-4">
          Oops! Kitchen is Closed
        </h2>
        <p className="text-gray-500 max-w-sm mx-auto mb-10 text-lg font-light">
          We couldn't find the page you're looking for. It might have been
          removed or eaten!
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-3 px-10 py-4 bg-[#E67E22] text-white rounded-full font-bold text-lg shadow-xl shadow-orange-200 hover:bg-[#D35400] hover:scale-105 active:scale-95 transition-all group"
        >
          <IoArrowBack className="group-hover:-translate-x-1 transition-transform" />
          Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default Error;
