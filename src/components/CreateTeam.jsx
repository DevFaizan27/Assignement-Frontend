import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { createTeam } from '../redux/actions/teamAction';
import Spinner from './Spinner';
import toast from 'react-hot-toast';
import { reset } from '../redux/slices/teamSlice';
import {useNavigate} from 'react-router-dom'


const CreateTeam = () => {
  const[domain,setDomain]=useState("");
  const[status,setStatus]=useState(false);

  const { userDetails } = useSelector((state) => state.user);

  const { isSuccess,isLoading, isError, message } = useSelector((state) => state.team);


  const dispatch = useDispatch();

  const navigate=useNavigate()

  if(isLoading){
    <Spinner/>
  }
  useEffect(() => {
    if (message) {
      if (isError) {
        toast.error(message);
        dispatch(reset());
      }
      if (isSuccess) {
        toast.success(message);
        navigate('/team');
        dispatch(reset());
      }
    }
  }, [isError, isSuccess, message, dispatch, navigate]);

  const onSubmit=()=>{
    dispatch(createTeam({domain,available:status}))
  }




  return (
    <div className="bg-[#32353F] min-h-screen w-full px-4 py-3 r">
      <h1 className="text-2xl font-bold text-white mb-4">Add Team</h1>
      <div className="flex flex-col md:flex-row items-center w-full justify-between bg-gray-800 p-4 rounded-lg">

        {/* Domain field */}
        <select
          className="w-full md:w-40 h-10 px-4 py-1 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-400 mb-2 md:mb-0 bg-gray-900"
          onChange={(e) => setDomain(e.target.value)}
          required
        >
          <option value="all">Domain</option>
          {userDetails?.allDomains?.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>

        <select
          className="w-full md:w-40 h-10 px-4 py-1 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-400 bg-gray-900"
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="all">Status</option>
          <option value={true}>Available</option>
          <option value={false}>Not Available</option>
        </select>

        <button
          className="w-full md:w-auto h-10 px-4 py-1 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-400 bg-blue-900"
          onClick={onSubmit}
        >
          Add Team
        </button>
      </div>
    </div>
  );
};

export default CreateTeam;
