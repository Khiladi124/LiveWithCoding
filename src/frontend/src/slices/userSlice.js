import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
}
const setUserReducer = (state, action) => {
    state.user = action.payload;
}
const clearUserReducer = (state) => {
    state.user = null;
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: setUserReducer,
        clearUser: clearUserReducer
    }
   
   
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;