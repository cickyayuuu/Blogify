import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";

const Sidebar = ({ setComponent }) => {
  const { profile, isAuth, setIsAuth } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  console.log(profile);

  const updateComponent = (value) => {
    setComponent(value);
  };

  const goToHome = () => {
    navigate("/");
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:5505/api/users/logout",
        {
          withCredentials: true,
        }
      );
      setIsAuth(false);
      toast.success("User logout successfully ! ");
    } catch (error) {
      console.log(error);
      toast.error("Error while loging out...");
    }
  };
  return (
    <>
      {
        !show && (
          <div
        className="sm:hidden  fixed top-4 left-4 z-50"
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-2xl" />
      </div>
        )
      }

      <div
        className={`w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300 transform sm:translate-x-0 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="text-center mt-10">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-2"
            src={profile?.photo?.url}
            alt=""
          />
          <p className="text-lg font-semibold mb-12">{profile?.name}</p>
        </div>

        <div
          className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer"
          onClick={() => setShow(!show)
            
          }
        >
          <BiSolidLeftArrowAlt className="text-2xl" />
        </div>
        <ul className="text-black font-semibold space-y-3 flex flex-col items-center justify-center">
          <button
            className="w-[70%] px-4 py-2 bg-red-400 rounded-lg hover:bg-red-300 transition duration-300"
            onClick={() => {
              updateComponent("My Blogs");
            }}
          >
            MY BLOGS
          </button>
         
          <button
            className="w-[70%] px-4 py-2 bg-amber-700 rounded-lg hover:bg-amber-300 transition duration-300"
            onClick={() => {
              updateComponent("Create Blog");
            }}
          >
            CREATE BLOGS
          </button>
          <button
            className="w-[70%] px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-300 transition duration-300"
            onClick={() => {
              updateComponent("My Profile");
            }}
          >
            MT PROFILE
          </button>
          <button
            className="w-[70%] px-4 py-2 bg-green-500 rounded-lg hover:bg-green-300 transition duration-300"
            onClick={goToHome}
          >
            HOME
          </button>
          <button
            className="w-[70%] px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-300 hover:text-black transition duration-300"
            onClick={handleLogOut}
          >
            LOGOUT
          </button>
        </ul>
        <div className="w-full h-[200px] flex justify-center items-center">
          <p>Made With ❤️ By Vicky 😇</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
