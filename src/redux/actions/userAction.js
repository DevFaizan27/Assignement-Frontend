import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//get the user
export const getUsers = createAsyncThunk(
  'users/getAllUser',
  async ({ name, status, domain, gender,currentPage,limitPerPage}, thunkAPI) => {
    try {
      // Construct the API URL with query parameters   
      let apiUrl = `${import.meta.env.VITE_BASE_URL}/api/user/get-users?page=${currentPage}&limit=${limitPerPage}`;

      if (name) apiUrl += `&search=${name}`;

      if (status) apiUrl += `&available=${status}`;
      if (domain) apiUrl += `&domain=${domain}`;
      if (gender) apiUrl += `&gender=${gender}`;

      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);


//action to get user bu id
export const getUserById=createAsyncThunk(
  'user/getuserById',
  async(id)=>{
    try {
      const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/get-user-by-id/${id}`)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error)
    }
  }
)


//delete user 
export const deleteUserById=createAsyncThunk(
  'user/deleteUserById',
  async(id)=>{
    try {
      const response=await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/user/delete-user/${id}`)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error)
    }
  }
)


//add user
export const addUser=createAsyncThunk(
  'user/addUser',
  async(formDataWithFiles,thunkAPI)=>{
      try {
          const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/add-user`,formDataWithFiles,{ headers: {
              'Content-Type': 'multipart/form-data',
          }})
          return response.data.message;
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data.error);
        }
  }
)

//edit user
export const editUser=createAsyncThunk(
  'user/editUser',
  async({formDataWithFiles,id},thunkAPI)=>{
      try {
          const response=await axios.put(`${import.meta.env.VITE_BASE_URL}/api/user/update-user/${id}`,formDataWithFiles,{ headers: {
              'Content-Type': 'multipart/form-data',
          }})
          return response.data.message;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data.error)
      }
  }
)
