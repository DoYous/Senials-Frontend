import {configureStore, createSlice} from '@reduxjs/toolkit';
import {hobbyCard,hobbyDetail,hobbyReview,hobbyTop3Card} from './hobbySlice';
import { isRemain, cursor, sortMethod, partyKeyword, wholeParties, popularParties, lastestParties, partyBoardDetail, partyBoardDetailMeets, partyBoardDetailReviews, recommParties } from './partySlice.js'
import { categories, categoriesWithHobbies, hobbiesForWrite } from './categorySlice.js'
import { partyBoardDetailMembers } from './partyDetailSlice.js';

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
        hobbyReview:hobbyReview.reducer
        , isRemain: isRemain.reducer
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
        , partyBoardDetail: partyBoardDetail.reducer
        , partyBoardDetailMeets: partyBoardDetailMeets.reducer
        , partyBoardDetailReviews: partyBoardDetailReviews.reducer
        , recommParties: recommParties.reducer
        // 모임 멤버 전체보기
        , partyBoardDetailMembers: partyBoardDetailMembers.reducer
    }
})