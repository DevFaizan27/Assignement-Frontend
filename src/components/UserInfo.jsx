import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams,useNavigate, Link } from 'react-router-dom';
import { deleteUserById, getUserById } from '../redux/actions/userAction';
import toast from 'react-hot-toast';
import { FaEdit,FaEyeSlash, FaEye, FaTrash } from 'react-icons/fa';
import EditUserModal from './EditUserModal';
import Spinner from './Spinner';

const UserInfo = () => {
  const[isOpen,setIsOpen]=useState(false);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { id } = useParams();
  const { user, isLoading, isError, message } = useSelector((state) => state.user);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation dialog

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id,isOpen,setIsOpen]);

  const handleDeleteClick = () => {
    setShowConfirmation(true); // Show confirmation dialog when delete button is clicked
  };

  const confirmDelete = () => {
    dispatch(deleteUserById(id)); // Dispatch delete action
    setShowConfirmation(false); // Close the confirmation dialog after deletion
    navigate('/')
  };

  if (isLoading) {
    return <p><Spinner/></p>;
  }

  if (isError) {
    return toast.error(message);
  }

  return (
    <div className="bg-[#32353F] min-h-screen w-full px-4 py-3 flex flex-col justify-center items-center">
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full md:w-96 text-white">
  
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full h-3/5 text-white">
  <img
    src={user?.user?.avatar?.url}
    alt={user?.user?.first_name}
    className="w-full h-full  object-cover object-center"
  />
</div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{user?.user?.first_name} {user?.user?.last_name}</h3>
          <div className="text-sm mb-2 flex items-center">
            <span className="mr-1">Email:</span>
            <span className="truncate">{user?.user?.email}</span>
          </div>
          <div className="text-sm mb-4 flex items-center">
            <span className="mr-1">Gender:</span>
            <span>{user?.user?.gender}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            {user?.user?.available ? (
              <span className="flex items-center gap-2 leading-3 text-green-400 text-xs font-bold">
                <FaEye />
                Available
              </span>
            ) : (
              <span className="flex items-center gap-2 leading-none text-red-400 text-xs font-bold">
                <FaEyeSlash />
                Not Available
              </span>
            )}
            <span className="text-gray-400">Domain: {user?.user?.domain}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button onClick={()=>setIsOpen(!isOpen)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none">
                <FaEdit />
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none" onClick={handleDeleteClick}>
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen&&(<EditUserModal id={id} setIsOpen={setIsOpen} user={user} getUserById={getUserById}/>)}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-sm mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 focus:outline-none"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none"
                onClick={confirmDelete}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
