import { createSlice } from "@reduxjs/toolkit";

export let categories = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {
        setCategories(state, data) {
            return data.payload;
        }
    }
})
export let { setCategories } = categories.actions;


export let categoriesWithHobbies = createSlice({
    name: 'categoriesWithHobbies'
    , initialState: []
    , reducers: {
        setCategoriesWithHobbies(state, action) {
            return action.payload;
        }
    }
})
export let { setCategoriesWithHobbies } = categoriesWithHobbies.actions;


export let hobbiesForWrite = createSlice({
    name: 'hobbiesForWrite'
    , initialState: []
    , reducers: {
        setHobbiesForWrite(state, action) {
            return action.payload;
        }
    }
})
export let { setHobbiesForWrite } = hobbiesForWrite.actions;
