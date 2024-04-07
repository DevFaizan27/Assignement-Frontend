import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';
import { getUsers } from '../redux/actions/userAction';

const SearchBar = ({
  setStatus,
  setDomain,
  setGender,
  curretPage,
  limitPerPage,
}) => {
  const { userDetails } = useSelector((state) => state.user);
  const [name, setName] = useState("");


  const resetFilter = () => {
    setDomain('');
    setGender('');
    setStatus('');
  };

  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(getUsers({ name,curretPage,limitPerPage }));
  };
  

  return (
    <div className="flex flex-col md:flex-row items-center w-full justify-between bg-gray-800 p-4 rounded-lg">

      {/* Input fields */}
      <div className="flex flex-col md:flex-row w-full md:w-auto mb-2 md:mb-0">
        <input
          className="w-full md:w-auto h-10 px-4 py-2 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-400 mb-2 md:mb-0 md:mr-2 bg-gray-900"
          type="text"
          placeholder="Enter name or email"
          onChange={(e) => setName(e.target.value)}
        />
        {/* Search button */}
        <button
          className="flex items-center justify-center bg-blue-500 rounded-full h-10 w-10 focus:outline-none focus:ring-0 focus:ring-opacity-50"
          onClick={handleSearch}
        >
          <FaSearch className="text-white" />
        </button>
      </div>

      {/* Select fields */}
      <div className="flex flex-col md:flex-row w-full md:w-auto mb-2 md:mb-0 space-y-2 md:space-y-0 md:space-x-2">
        <select
          className="w-full md:w-auto h-10 px-4 py-1 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-400 mb-2 md:mb-0 bg-gray-900"
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="all">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Domain field */}
        <select
          className="w-full md:w-auto h-10 px-4 py-1 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-400 mb-2 md:mb-0 bg-gray-900"
          onChange={(e) => setDomain(e.target.value)}
        >
          <option value="all">Domain</option>
          {userDetails?.allDomains?.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>

        <select
          className="w-full md:w-auto h-10 px-4 py-1 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-400 bg-gray-900"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">Status</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>

      {/* Reset button */}
      <button
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
        onClick={resetFilter}
      >
        Reset Filter
      </button>
    </div>
  );
};

export default SearchBar;
