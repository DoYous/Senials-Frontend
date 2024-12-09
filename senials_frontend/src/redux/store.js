import {configureStore, createSlice} from '@reduxjs/toolkit'
import { isRemain, cursor, sortMethod, partyKeyword, wholeParties, popularParties, lastestParties } from './partySlice.js'
import { categories, categoriesWithHobbies, hobbiesForWrite } from './categorySlice.js'

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
        isRemain: isRemain.reducer
        , cursor: cursor.reducer
        , sortMethod: sortMethod.reducer
        , partyKeyword: partyKeyword.reducer
        , wholeParties: wholeParties.reducer
        , popularParties: popularParties.reducer
        , lastestParties: lastestParties.reducer
        // 모임 목록 - 카테고리 카드
        , categories: categories.reducer
        // 글 작성, 수정 용 카테고리 & 취미
        , categoriesWithHobbies: categoriesWithHobbies.reducer
        , hobbiesForWrite: hobbiesForWrite.reducer

    }
})