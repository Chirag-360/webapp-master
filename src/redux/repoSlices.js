import { createSlice } from "@reduxjs/toolkit";

const repoSlices = createSlice({
    name:'starRepo',
    initialState : {
        repo : [],
        addDeleteData : [],
        commitData: [],
        contributorData: [],
        chartval: 'commits',
        isLoading: false,
    },
    reducers : {
        getRepo(state, action){
            if(action.payload === undefined){
                state.repo = []
            }else{
                action.payload &&
                action.payload?.map((item)=>{
                    state.repo = [...state.repo,item]
                })
            }
        },
        getadData(state,action){
            state.addDeleteData = action.payload
        },
        getcommitData(state,action){
            state.commitData = action.payload
        },
        getcontributorData(state,action){
            state.contributorData = action.payload
        },
        getChartVal(state, action){
            state.chartval = action.payload
        },
        setLoading(state){
            state.isLoading = !state.isLoading
        }
    }
})

export const { getRepo, getadData, getcommitData, getChartVal, getcontributorData, setLoading } = repoSlices.actions

export default repoSlices.reducer;