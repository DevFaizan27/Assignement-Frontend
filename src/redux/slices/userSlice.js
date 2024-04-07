import { createSlice } from "@reduxjs/toolkit";
import { getUsers, getUserById, deleteUserById, addUser, editUser } from "../actions/userAction.js";



const initialState={
    userDetails:[],
    user:null,
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:''
}


// Create the product slice
const userSlice = createSlice({
    name: 'user',
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
      .addCase(getUsers.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.userDetails = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
    })
    .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
    })
    .addCase(deleteUserById.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(deleteUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
    })
    .addCase(deleteUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
    })
    .addCase(addUser.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
    })
    .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
    })
    .addCase(editUser.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
    })
    .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
    })
    }
  });

  export const {reset}=userSlice.actions;
  export default userSlice.reducer;