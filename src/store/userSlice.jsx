import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userId: null, 
    userName: '',
    totalTaps:0,
}

const userSlice = createSlice({
    name : 'user',
    initialState, 
    reducers:{
        setUser: (state, action) =>{
            state.userId = action.payload.telegramId,
            state.userName = action.payload.userName
            state.totalTaps = action.payload.totalTaps
        }
    }
})

export const {setUser} = userSlice.actions;

export default userSlice.reducer;