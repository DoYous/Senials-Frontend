import { createSlice } from "@reduxjs/toolkit";

let categories = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {
        setCategories(state, data) {
            return data.payload;
        }
    }
})

export let { setCategories } = categories.actions;
export default categories.reducer;
