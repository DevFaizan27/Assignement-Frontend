import React from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from "react-icons/fa";
import {Link} from 'react-router-dom'

const UserCard = ({ user,prope }) => {
  const { first_name, last_name, email, domain } = user;

  return (
    <div className="w-80 sm:w-80 mx-auto rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white">
      <div className="p-4">
        <img
          src={user.avatar.url}
          alt={`${first_name} ${last_name}`}
          className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-900"
        />
        <h2 className="text-lg font-semibold text-center">{`${first_name} ${last_name}`}</h2>
        <p className="text-gray-300 text-center mb-4">{email}</p>
        <div className="flex items-center justify-between mb-4">
          {user.available ? (
            <span className="flex items-center gap-2 leading-3 text-green-400 text-xs md:font-bold">
              <FaEye />
              Available
            </span>
          ) : (
            <span className="flex items-center gap-2 leading-none text-red-400 text-xs md:font-bold">
              <FaEyeSlash />
              Not Available
            </span>
          )}
          <span className="text-gray-400">Domain: {domain}</span>
        </div>
        {/* Buttons Container */}
         
        <Link
  to={`user-info/${user._id}`}
  className={`${prope} bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded flex items-center justify-center`}
>
  <FaEye className="mr-2" />
  <span className="ml-2">See User</span>
</Link>

        {/* End Buttons Container */}
      </div>
      
    </div>
  );
};

export default UserCard;
