import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


//get all teams
export const getTeams=createAsyncThunk(
    'team/getTeams',
    async()=>{
      try {
        const res=await axios.get(`http://localhost:5500/api/team/get-teams`)
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    }
)


export const createTeam = createAsyncThunk(
  'team/createTeam',
  async ( domain, available , thunkAPI) => {
    try {
      // Make the API call to create a team
      const response = await axios.post(`http://localhost:5500/api/team/create-team`, { domain, available });
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, reject the action with the error message
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// get team by id
export const getTeamById=createAsyncThunk(
    'team/getTeamById',
    async(id)=>{
      try {
        const res=await axios.get(`http://localhost:5500/api/team/get-team/${id}`)
        console.log(res);
        return res.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    }
)