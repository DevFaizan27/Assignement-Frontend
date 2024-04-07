import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//get the user
export const getUsers = createAsyncThunk(
  'users/getAllUser',
  async ({ name, status, domain, gender,currentPage,limitPerPage}, thunkAPI) => {
    try {
      // Construct the API URL with query parameters
      let apiUrl = `http://localhost:5500/api/user/get-users?page=${currentPage}&limit=${limitPerPage}`;

      if (name) apiUrl += `&search=${name}`;

      if (status) apiUrl += `&available=${status}`;
      if (domain) apiUrl += `&domain=${domain}`;
      if (gender) apiUrl += `&gender=${gender}`;

      const res = await axios.get(apiUrl);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const getUserById=createAsyncThunk(
  'user/getuserById',
  async(id)=>{
    try {
      const res=await axios.get(`http://localhost:5500/api/user/get-user-by-id/${id}`)
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)



export const deleteUserById=createAsyncThunk(
  'user/deleteUserById',
  async(id)=>{
    try {
      const res=await axios.delete(`http://localhost:5500/api/user/delete-user/${id}`)
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)


export const addUser=createAsyncThunk(
  'user/addUser',
  async(formDataWithFiles,thunkAPI)=>{
      try {
          const response=await axios.post(`http://localhost:5500/api/user/add-user`,formDataWithFiles,{ headers: {
              'Content-Type': 'multipart/form-data',
          }})
          console.log(response.data.message);
          return response.data;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data.error)
      }
  }
)

export const editUser=createAsyncThunk(
  'user/editUser',
  async({formDataWithFiles,id},thunkAPI)=>{
      try {
        console.log(id);
          const response=await axios.put(`http://localhost:5500/api/user/update-user/${id}`,formDataWithFiles,{ headers: {
              'Content-Type': 'multipart/form-data',
          }})
          console.log(response);
          return response.data.message;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data.error)
      }
  }
)
