import { createSlice } from "@reduxjs/toolkit";
import { createTeam, getTeamById, getTeams } from "../actions/teamAction";



const initialState={
    teams:[],
    team:null,
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:''
}


// Create the product slice
const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        reset:(state)=>{
            state.isSuccess=false
            state.isLoading=false
            state.isError=false
            state.message=''
        }
    },
    extraReducers: (builder) => {
             //------user end build case------------
      builder
    .addCase(getTeams.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getTeams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.teams = action.payload;
    })
    .addCase(getTeams.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
    })
    .addCase(createTeam.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(createTeam.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
    })
    .addCase(createTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
    })
    .addCase(getTeamById.pending, (state) => {
          state.isLoading = true;
      })
    .addCase(getTeamById.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.team = action.payload;
      })
    .addCase(getTeamById.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      })
    }
  });

  export const {reset}=teamSlice.actions;
  export default teamSlice.reducer;