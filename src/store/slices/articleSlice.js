import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
const baseUrl=import.meta.env.VITE_BASE_URL;
const version=import.meta.env.VITE_VERSION;

const initialState={
    allArticles:[],
    myArticles:[],
    loading:false,
    error:null
}

export const addArticle=createAsyncThunk(
    "addArticle",
    async(article,thunkApi)=>{
        alert("running")
        let token=thunkApi.getState().user?.user?.accessToken || JSON.parse(sessionStorage.getItem("user"))?.accessToken
        console.log(token);
        try{
            const response=await fetch(`${baseUrl}/${version}/article/addarticle`,{
                method:"POST",
                body:JSON.stringify(article),
                headers:{
                    "Content-Type":"application/json",
                    Authorization:token
                }
            })
            const result=await response.json();
            if(!result.ok)
            return thunkApi.rejectWithValue(result);
            else
            return result;
            
        }   catch(err){
            thunkApi.rejectWithValue(err.message);
        }
        console.log(thunkApi);
        alert("ran");

    }
)

const articleSlice=createSlice(
    {
        name:"articles",
        initialState,
        reducers:{
            UpdateArticle:(state,action)=>{
                    state.allArticles=action.payload;
        }},
        extraReducers:(builder)=>{
            builder
            .addCase(addArticle.fulfilled,(state,action)=>{
                state.myArticles=action.payload;
                state.error=null;
                state.loading=false;
        })
        }
    }
)

export default articleSlice.reducer;
export const {UpdateArticle}=articleSlice.actions;