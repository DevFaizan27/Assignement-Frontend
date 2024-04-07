import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, getUserById } from '../redux/actions/userAction';
import { RiCloseFill } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { reset } from '../redux/slices/userSlice.js';
import Spinner from './Spinner.jsx';


const EditUserModal = ({ id, user, setIsOpen }) => {
  const [formData, setFormData] = useState({
    first_name: user?.user?.first_name || '',
    last_name: user?.user?.last_name || '',
    email: user?.user?.email || '',
    domain: user?.user?.domain || '',
    gender: user?.user?.gender || '',
    available: user?.user?.available || false,
    images: null,
  });

  const dispatch = useDispatch();
  const { isSuccess, isLoading, isError, message } = useSelector((state) => state.user);
  if (isLoading) {
    <Spinner />
  }
  useEffect(() => {
    if (message) {
      if (isError) {
        toast.error(message);
        dispatch(reset());
      }
      if (isSuccess) {
        toast.success(message);
        dispatch(getUserById(id))
        dispatch(reset());
      }
    }
  }, [isError, isSuccess, message, dispatch]);


  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithFiles = new FormData();
    formDataWithFiles.append('first_name', formData.first_name);
    formDataWithFiles.append('last_name', formData.last_name);
    formDataWithFiles.append('email', formData.email);
    formDataWithFiles.append('gender', formData.gender);
    formDataWithFiles.append('domain', formData.domain);
    formDataWithFiles.append('available', formData.available);

    if (formData.images) {
      for (const file of formData.images) {
        formDataWithFiles.append('images', file);
      }
    }

    try {
      dispatch(editUser({ formDataWithFiles, id }));
      // Close the modal or handle success
      dispatch(getUserById(id))
      setIsOpen(false); // Close the modal on success
    } catch (error) {
      console.error('Error editing user:', error);
      // Handle error
    }
  };

  return (
    <div className="fixed  inset-0 flex items-center justify-center rounded-md  bg-opacity-50">
      <div className="bg-gray-900 text-white p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Edit User</h2>
          <button
            className="text-white bg-red-500 p-2 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            <RiCloseFill />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={onChange}
            placeholder="First Name"
            className="bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={onChange}
            placeholder="Last Name"
            className="bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Email"
            className="bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={onChange}
            placeholder="Domain"
            className="bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={onChange}
            className="bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select
            name="available"
            value={formData.available}
            onChange={onChange}
            className="bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
          >
            <option value={false}>Not Available</option>
            <option value={true}>Available</option>
          </select>
          <input
            type="file"
            name="images"
            onChange={(e) => {
              setFormData({
                ...formData,
                images: e.target.files,
              });
            }}
            className="bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
