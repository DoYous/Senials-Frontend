import {configureStore, createSlice} from '@reduxjs/toolkit'
import { isRemain, cursor, sortMethod, partyKeyword, wholeParties, popularParties } from './partySlice.js'

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
        user: user.reducer,
        isRemain: isRemain.reducer
        , cursor: cursor.reducer
        , sortMethod: sortMethod.reducer
        , partyKeyword: partyKeyword.reducer
        , wholeParties: wholeParties.reducer
        , popularParties: popularParties.reducer

    }
})