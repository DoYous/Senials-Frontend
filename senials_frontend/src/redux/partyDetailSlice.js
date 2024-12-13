import { createSlice } from "@reduxjs/toolkit";

export let partyBoardDetailMembers = createSlice({

    name: 'partyBoardDetailMembers'
    , initialState: []
    , reducers: {
        setDetailMembers(state, action) {
            return action.payload;
        }
        , addDetailMembers(state, action) {
            return [...state, ...action.payload];
        }
    }
});
export let { setDetailMembers, addDetailMembers } = partyBoardDetailMembers.actions;
