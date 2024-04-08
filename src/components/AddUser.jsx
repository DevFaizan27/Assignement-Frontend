import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { reset } from '../redux/slices/userSlice.js';
import { addUser } from '../redux/actions/userAction.js';
import Spinner from './Spinner.jsx';

const AddUser = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    domain: '',
    gender: '', // Changed to string
    available: false, // Changed to boolean
    images: null,
  });

  // Destructuring form data
  const { first_name, last_name, email, domain, gender, available, files } = formData;

  // Redux dispatch function
  const dispatch = useDispatch();

  // Navigate function from react-router-dom
  const navigate = useNavigate();

  // Redux state selectors
  const { isSuccess,isLoading, isError, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (message) {
      if (isError) {
        toast.error(message);
        dispatch(reset());
      }
      if (isSuccess) {
        toast.success(message);
        navigate('/');
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

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithFiles = new FormData();
    formDataWithFiles.append('first_name', first_name);
    formDataWithFiles.append('last_name', last_name);
    formDataWithFiles.append('email', email);
    formDataWithFiles.append('gender', gender);
    formDataWithFiles.append('domain', domain);
    formDataWithFiles.append('available', available);

    for (const file of files) {
      formDataWithFiles.append('images', file);
    }

    dispatch(addUser(formDataWithFiles));
  };

  return (
    <div className="bg-gray-900 text-white py-10 px-6 sm:px-10 md:px-20 lg:px-40 xl:px-80">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
      <h2 className="text-3xl font-semibold mb-6">Add User</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          name="first_name"
          value={first_name}
          onChange={onChange}
          placeholder="First Name"
          className="bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="last_name"
          value={last_name}
          onChange={onChange}
          placeholder="Last Name"
          className="bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          className="bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="domain"
          value={domain}
          onChange={onChange}
          placeholder="Domain"
          className="bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <select
          name="gender"
          value={gender}
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
          value={available}
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
            files: e.target.files,
        });
    }}
    className="bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
/>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add user
        </button>
      </form>
      </>
      )}
    </div>
  );
};

export default AddUser;
