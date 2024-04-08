import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


//get all teams
export const getTeams=createAsyncThunk(
    'team/getTeams',
    async()=>{
      try {
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/team/get-teams`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
      }
    }
)

//create a new team
export const createTeam = createAsyncThunk(
  'team/createTeam',
  async(formsData, thunkAPI) => {
    try {
      // Make the API call to create a team
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/team/create-team`,formsData,{headers:{
        'Content-Type': 'multipart/form-data',
      }});
      return response.data.message;
    } catch (error) {
      // If an error occurs, reject the action with the error message
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);


// get team by id
export const getTeamById=createAsyncThunk(
    'team/getTeamById',
    async(id)=>{
      try {
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/team/get-team/${id}`)
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    }
)