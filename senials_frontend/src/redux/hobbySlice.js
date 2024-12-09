import { createSlice} from "@reduxjs/toolkit";

export const hobbyCard = createSlice({
    name:'hobbyCard',
    initialState:
        [],
      reducers:{
        setHobbyCard(state, action) {
            return action.payload
        }
    }
})

export const {setHobbyCard}=hobbyCard.actions

export const hobbyTop3Card = createSlice({
    name:'hobbyTop3Card',
    initialState:
        [],
      reducers:{
        setHobbyTop3Card(state, action) {
            return action.payload
        }
    }
})

export const {setHobbyTop3Card}=hobbyTop3Card.actions
