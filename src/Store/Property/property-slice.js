import {createSlice} from "@reduxjs/toolkit";

const propertySlice=createSlice({
    //slice name
    name:"property",
    //initial state for the property slice
    initialState:{
        properties:[],
        totalProperties:0,
        searchParams:{}, //parameters used to search
        error:null,
        loading:false,

    },

    //reducers function to handle different functions
    reducers:{
        getRequest(state){
            state.loading=true;
        },
        getProperties(state,action){
            state.properties=action.payload.data;
            state.totalProperties=action.payload.all_properties;
            state.loading=false; 
        },
        //action to update search pararmeter
        
        updateSearchParams: (state, action) => {
            state. searchParams =
                Object. keys(action.payload) . length ===0
                ? {}
                :{
                    ...state.searchParams,
                    ...action.payload,

                };
            },  
            getErrors(state, action) {
                
                state.error= action. payload;
            },          
    },

})
export const propertyAction = propertySlice.actions;
export default propertySlice;