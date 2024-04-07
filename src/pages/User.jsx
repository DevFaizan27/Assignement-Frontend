import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/actions/userAction.js';
import PaginationBtn from '../components/PaginationBtn.jsx';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner.jsx';

const User = () => {
  // const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [domain, setDomain] = useState("");
  const [gender, setGender] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [limitPerPage, setLimitPerPage] = useState(20); // Items per page

  const dispatch = useDispatch();
  const { userDetails, isLoading, isError, isSuccess, message } = useSelector((state) => state.user);

  console.log(domain);
  console.log(status);
  console.log(gender);
 

  useEffect(() => {
    const domainFilter = domain === "all"  ? "" : domain;
    const genderFilter = gender === "all"  ? "" : gender;
    const stausFilter = status === "all"  ? "" : status;
    dispatch(getUsers({  status:stausFilter, domain:domainFilter, gender:genderFilter,currentPage,limitPerPage }));
  }, [dispatch, status, domain, gender,currentPage]);



  

  if (isLoading) {
    return <p><Spinner/></p>;
  }

  if (isError) {
    return toast.error(message);
  }


  return (
    <div className="bg-[#32353F] min-h-screen w-full px-4 py-3 flex flex-col justify-center items-center">
      <SearchBar
        status={status}
        setStatus={setStatus}
        domain={domain}
        setDomain={setDomain}
        // name={name}
        // setName={setName}
        currentPage={currentPage}
        limitPerPage={limitPerPage}
        gender={gender}
        setGender={setGender}
        getUsers={getUsers}
      />
      <div className="flex-grow mt-6 overflow-y-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {userDetails?.users?.map((user) => (
            <UserCard user={user}  key={user._id} />
          ))}
        </div>
        <PaginationBtn currentPage={currentPage} setCurrentPage={setCurrentPage}  limitPerPage={limitPerPage} setLimitPerPage={setLimitPerPage} getUsers={getUsers} />
      </div>
    </div>
  );
};

export default User;
