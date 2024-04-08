import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTeam } from '../redux/actions/teamAction';
import Spinner from './Spinner';
import toast from 'react-hot-toast';
import { reset } from '../redux/slices/teamSlice';
import { useNavigate } from 'react-router-dom';

const CreateTeam = () => {
  const [formData, setFormData] = useState({
    domain: '',
    available: false, // Changed to boolean
  });

  const{domain,available}=formData;

  const { userDetails } = useSelector((state) => state.user);

  const { isSuccess, isLoading, isError, message } = useSelector((state) => state.team);

  const dispatch = useDispatch();

  const navigate = useNavigate();

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

    // Function to handle changes in the form inputs
    const onChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formsData = new FormData();
    formsData.append('domain', domain);
    formsData.append('available',available ); // Convert boolean to string
    
    dispatch(createTeam(formsData));
  };

  return (
    <div className="bg-[#32353F] min-h-screen w-full px-4 py-3 r">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-white mb-4">Add Team</h1>
          <form onSubmit={onSubmit} className="flex flex-col md:flex-row items-center w-full justify-between bg-gray-800 p-4 rounded-lg">
            {/* Domain field */}
            <select
            name="domain"
            value={domain}
            onChange={onChange}
              className="w-full md:w-40 h-10 px-4 py-1 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-400 mb-2 md:mb-0 bg-gray-900"
              required
            >
              <option value="">Domain</option>
              {userDetails?.allDomains?.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
            <select
            name="available"
            value={available}
            onChange={onChange}
              className="w-full md:w-40 h-10 px-4 py-1 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-400 bg-gray-900"
              required
            >
              <option value="all">Status</option>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
            <button
              className="w-full md:w-auto h-10 px-4 py-1 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-white placeholder-gray-400 bg-blue-900"
              type="submit"
            >
              Add Team
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateTeam;
