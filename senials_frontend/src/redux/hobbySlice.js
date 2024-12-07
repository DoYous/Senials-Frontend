import { createSlice} from "@reduxjs/toolkit";

const hobbyCard = createSlice({
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

export default hobbyCard.reducer;