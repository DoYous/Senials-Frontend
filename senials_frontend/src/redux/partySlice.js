import { createSlice } from '@reduxjs/toolkit'

/* isRemain: 더 불러올 정보가 있는지 여부 */
export let isRemain = createSlice({
    name: 'isRemain'
    , initialState: true
    , reducers: {
        setRemain(state, action) {
            return action.payload;
        }
    }
})
export let { setRemain } = isRemain.actions;


/* cursor: 마지막으로 불러온 모임 번호 */
export let cursor = createSlice({
    name: 'cursor'
    , initialState: null
    , reducers: {
        setCursor(state, action) {
            return action.payload;
        }
    }
})
export let { setCursor } = cursor.actions;


/* sortMethod: 전체 모임 리스트 정렬 기준 */
export let sortMethod = createSlice({
    name: 'sortMethod'
    , initialState: 'lastest'
    , reducers: {
        setSortMethod(state, action) {
            return action.payload;
        }
    }
})
export let { setSortMethod } = sortMethod.actions;


/* keyword: 검색어 */
export let partyKeyword = createSlice({
    name: 'partyKeyword'
    , initialState: ''
    , reducers: {
        setPartyKeyword(state, action) {
            return action.payload;
        }
    }
})
export let { setPartyKeyword } = partyKeyword.actions;


/* 전체 모임 리스트 */
export let wholeParties = createSlice({
    
    name: 'wholeParties'
    , initialState: []
    , reducers: {
        setWholeParties(state, action) {
            return action.payload;
        }
        , addWholeParties(state, action) {
            state.push(...action.payload);
        }
        , toggleLike(state, action) {
            state[action.payload].liked = !state[action.payload].liked;
        }

    }
})
export let { setWholeParties, addWholeParties, toggleLike } = wholeParties.actions;


export let popularParties = createSlice({

    name: 'popularParties'
    , initialState: []
    , reducers: {
        setPopularParties(state, data) {
            let arr = (data.payload).map((data) => data);
            return arr;
        }
    }
}) 
export let { setPopularParties } = popularParties.actions;


export let lastestParties = createSlice({

    name: 'lastestParties'
    , initialState: []
    , reducers: {
        setLastestParties(state, action) {
            return action.payload;
        }
        , toggleLastestLike(state, action) {
            state[action.payload].liked = !state[action.payload].liked;
        }
    }
})
export let { setLastestParties, toggleLastestLike } = lastestParties.actions;


export let partyBoardDetail = createSlice({

    name: 'partyBoardDetail'
    , initialState: {
        images:[],
        partyMaster: {},
        randMembers: []
    }
    , reducers: {
        setPartyBoardDetail(state, action) {
            return action.payload;
        }
        , toggleDetailLike(state) {
            state.isLiked = !state.isLiked;
        }
        , setMember(state, action) {
            if(action.payload) {
                state.partyMemberCnt += 1;
                state.isMember = action.payload;
            } else {
                state.partyMemberCnt -= 1;
                state.isMember = action.payload;
            }
        }
    }
});
export let { setPartyBoardDetail, toggleDetailLike, setMember } = partyBoardDetail.actions;


export let partyBoardDetailMeets = createSlice({

    name: 'partyBoardDetailMeets'
    , initialState: {
        meetPageNumber: 0
        , hasMoreMeets: false
        , meets: []
    }
    , reducers: {
        increaseMeetPageNumber(state) {
            state.meetPageNumber++;
        }
        , setHasMoreMeets(state, action) {
            state.hasMoreMeets = action.payload;
        }
        , setMeets(state, action) {
            state.meets = action.payload;
        }
        , addMeets(state, action) {
            state.meets = [...state.meets, ...action.payload];
        }
        , toggleMeetJoined(state, action) {
            let { idx, isJoined } = action.payload;
            state.meets[idx].joined = isJoined
            if(isJoined){
                state.meets[idx].meetMemberCnt += 1;
            } else {
                state.meets[idx].meetMemberCnt -= 1;
            }
        }
    }
});
export let { increaseMeetPageNumber, setHasMoreMeets, setMeets, addMeets, toggleMeetJoined } = partyBoardDetailMeets.actions;


export let partyBoardDetailReviews = createSlice({

    name: 'partyBoardDetailReviews'
    , initialState: {
        reviewPageNumber: 0
        , hasMoreReviews: false
        , reviews: []
        , avgReviewRate: 0
        , reviewCnt: 0
    }
    , reducers: {
        increaseReviewPageNumber(state) {
            state.reviewPageNumber++;
        }
        , setHasMoreReviews(state, action) {
            state.hasMoreReviews = action.payload;
        }
        , setReviews(state, action) {
            state.reviews = action.payload;
        }
        , addReviews(state, action) {
            state.reviews = [...state.reviews, ...action.payload];
        }
        , setAvgReviewRate(state, action) {
            state.avgReviewRate = action.payload;
        }
        , setReviewCnt(state, action) {
            state.reviewCnt = action.payload;
        }
    }
})
export let { increaseReviewPageNumber, setHasMoreReviews, setReviews, addReviews, setAvgReviewRate, setReviewCnt } = partyBoardDetailReviews.actions;


export let recommParties = createSlice({

    name: 'recommParties'
    , initialState: []
    , reducers: {
        setRecommParties(state, action) {
            return action.payload;
        }
        , toggleRecommLike(state, action) {
            state[action.payload].liked = !state[action.payload].liked;
        }
    }
})
export let { setRecommParties,  setRecommHobbyNumber, toggleRecommLike } = recommParties.actions;
