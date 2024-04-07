import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const [open, setOpen] = useState(false);
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  return (
    <div className="w-full md:basis-[20%] md:h-full flex-col items-center justify-center">
      <div
        className="w-full flex items-center justify-between md:justify-start 
        md:items-start px-4 md:flex-col py-5 md:basis-[20%] bg-[#1E212A] 
    text-white md:h-full md:py-5 md:px-2"
      >
        {/* logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-8 w-8 rounded-full" />
          <h1 className="text-lg font-bold ">Heliverse</h1>
        </div>

        {/* Home */}
        <div
          className={`hidden md:flex gap-2 mt-8 px-1 items-center cursor-pointer ${
            currentPath === "/" ? "text-blue-500 font-bold" : ""
          }`}
          onClick={() => {
            // dispatch(clearAll());
            navigate("/");
          }}
        >
          <FaHome />
          All Users
        </div>

        {/* Getting teams */}
        <div
          className={`hidden md:flex gap-2 mt-3 px-1 items-center cursor-pointer ${
            currentPath === "/team" ? "text-blue-500 font-bold" : ""
          }`}
          onClick={() => {
            // dispatch(clearAll());
            navigate("team");
          }}
        >
          <RiTeamLine />
          Team
        </div>

        <div
          className={`hidden md:flex gap-2 mt-3 px-1 items-center cursor-pointer ${
            currentPath === "/add-user" ? "text-blue-500 font-bold" : ""
          }`}
          onClick={() => {
            navigate("/add-user");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add user
        </div>


        {/* to create a team  */}
         <div
          className={`hidden md:flex gap-2 mt-3 px-1 items-center cursor-pointer ${
            currentPath === "/add-team" ? "text-blue-500 font-bold" : ""
          }`}
          onClick={() => {
            navigate("/add-team");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add team
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          onClick={() => setOpen(!open)}
          className="w-6 h-6 md:hidden cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>

      {open && (
        <div
          className="w-full flex flex-col
        px-3
        items-start justify-center bg-[#1E212A] text-white transition-all d
        uration-500 ease-in-out md:hidden"
        >
          <hr className="text-white h-2 w-full" />
          <div
            className={`flex gap-2 m-2 px-1 items-center cursor-pointer ${
              currentPath === "/" ? "text-blue-500 font-bold" : ""
            }`}
            onClick={() => {
              navigate("/");
            }}
          >
            <FaHome />
            All Users
          </div>

          <div
            className={`flex  gap-2 m-2 px-1 items-center cursor-pointer ${
              currentPath === "/team" ? "text-blue-500 font-bold" : ""
            }`}
            onClick={() => {
              navigate("/team");
            }}
          >
            <RiTeamLine />
            Team
          </div>
          <div
          className={`flex gap-2 m-2 px-1 items-center cursor-pointer ${
            currentPath === "/add-user" ? "text-blue-500 font-bold" : ""
          }`}
          onClick={() => {
            navigate("/add-user");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add user
        </div>

        <div
          className={`flex gap-2 m-2 px-1 items-center cursor-pointer ${
            currentPath === "/add-team" ? "text-blue-500 font-bold" : ""
          }`}
          onClick={() => {
            navigate("/add-team");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add team
        </div>
        
        </div>
      )}
    </div>
  );
};

export default SideNav;
