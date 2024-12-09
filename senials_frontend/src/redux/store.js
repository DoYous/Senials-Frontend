import {configureStore, createSlice} from '@reduxjs/toolkit';
import {hobbyCard,hobbyDetail,hobbyReview,hobbyTop3Card} from './hobbySlice';
import { isRemain, cursor, sortMethod, partyKeyword, wholeParties, popularParties, lastestParties } from './partySlice.js';
import categories from './categorySlice.js';

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
        hobbyList:hobbyCard.reducer,
        hobbyTop3List:hobbyTop3Card.reducer,
        hobbyDetail:hobbyDetail.reducer,
        hobbyReview:hobbyTop3Card.reducer
        , isRemain: isRemain.reducer
        , cursor: cursor.reducer
        , sortMethod: sortMethod.reducer
        , partyKeyword: partyKeyword.reducer
        , wholeParties: wholeParties.reducer
        , popularParties: popularParties.reducer
        , lastestParties: lastestParties.reducer
        , categories: categories
    }
})