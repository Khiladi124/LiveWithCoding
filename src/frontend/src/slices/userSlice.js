import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
}
const setUserReducer = (state, action) => {
    state.user = action.payload.user|| null;
    state.accessToken = action.payload.accessToken || null;
    state.refreshToken = action.payload.refreshToken || null;
}
const clearUserReducer = (state) => {
    state.user = null;
    state.accessToken = null;
    state.refreshToken = null;
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