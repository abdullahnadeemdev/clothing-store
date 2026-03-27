import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={assets.logo} alt="" className="w-[max(10%,80px)]" />
      <button
        onClick={() => setToken("")}
        className="px-5 py-2 text-white bg-gray-600 rounded-full sm:px-7 sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
