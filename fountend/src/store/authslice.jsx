import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  isLoggedin:false,
   user: null,
}
const authslice = createSlice({
  name:'auth',
  initialState,
  reducers:{
      login: (state, action) => {
      state.isLoggedin = true;
       state.user = action.payload; 
      
  },
   logout: (state) => {
      state.isLoggedin = false;
      state.user = null;
    },
  },
})
export const { login, logout } = authslice.actions;
export default authslice
