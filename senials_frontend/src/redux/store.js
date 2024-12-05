import {configureStore, createSlice} from '@reduxjs/toolkit'

//example state data
let user = createSlice({
    
    name:'state이름~',
    initialState:'kim',
    reducers:{
        changeName(state){
            return 'john kim'
        }
    }
})

export let {changeName}=user.actions

export default configureStore({
    reducer: {
        //example reducer data
        user: user.reducer

    }
})