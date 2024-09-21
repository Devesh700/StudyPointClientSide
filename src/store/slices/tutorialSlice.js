import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    SkillTitle:{},
    allTitle:[],
    subTitle:[],
    Topics:[],
    loading:false,
    error:null
}
const baseUrl = import.meta.env.VITE_BASE_URL;
const version = import.meta.env.VITE_VERSION;


export const getAllSkillTitle=createAsyncThunk(
    "getallSkillTitle",
    async(_,thunkApi)=>{
        try {
            const response=await fetch(`${baseUrl}/${version}/skilltitle/get/all`,{
                method:"GET"
            });
            const result=await response.json();
            if(!result.ok){
                return thunkApi.rejectWithValue(result);
            }
            else{
                return result.data;
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)



export const getSkillTitleById=createAsyncThunk(
    "getSkillTitleById",
    async(_id,thunkApi)=>{
        if(!_id){
            alert("please select which skill you want to learn");
            return;
        }

        try {
            const reponse=await fetch(`${baseUrl}/${version}/skilltitle/${_id}`,{
                method:"GET"
            });
            const res=await reponse.json();
            if(!res.ok){
                alert("not fetched")
                return thunkApi.rejectWithValue(res);
            }
            else{
            console.log(res);
            return thunkApi.fulfillWithValue(res.data);
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)


export const getTopicById=createAsyncThunk(
    "getTopicById",
    async(_id,thunkApi)=>{
        if(!_id){
            alert("please select which skill you want to learn");
            return;
        }

        try {
            const reponse=await fetch(`${baseUrl}/${version}/topics/${_id}`,{
                method:"GET"
            });
            const res=await reponse.json();
            if(!res.ok){
                alert("not fetched")
                return thunkApi.rejectWithValue(res);
            }
            else{
            console.log(res);
            return thunkApi.fulfillWithValue(res.data);
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

export const addSkillTitle=createAsyncThunk(
    "addSkillTitle",
    async(title,thunkApi)=>{
        if(!title){
            alert("please provide title value");
            return;
        }
        let token=thunkApi.getState().user?.user?.accessToken || JSON.parse(sessionStorage.getItem("user"))?.accessToken;
        try {
            const response=await fetch(`${baseUrl}/${version}/skilltitle/add`,{
                method:"POST",
                body:JSON.stringify({title}),
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            })
            const result=await response.json();
            if(!result.ok){
                alert("some error occured, check your network section");
                return thunkApi.rejectWithValue(result);
            }
            return result
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

const tutorialSlice=createSlice({
    name:"tutorialSlice",
    initialState,
    reducers:{
        updateTutorial:(state,action)=>{
            state.SkillTitle=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getSkillTitleById.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.SkillTitle=action.payload
            state.loading=false
            state.error=null
        })
        .addCase(getSkillTitleById.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(getSkillTitleById.rejected,(state,action)=>{
            state.SkillTitle=action.payload
            state.loading=false
            state.error=action.error
        })
        .addCase(getTopicById.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.Topics=action.payload
            state.loading=false
            state.error=null
        })
        .addCase(getTopicById.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(getTopicById.rejected,(state,action)=>{
            state.Topics=action.payload
            state.loading=false
            state.error=action.error
        })
        .addCase(getAllSkillTitle.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.allTitle=action.payload
            state.loading=false
            state.error=null
        })
        .addCase(getAllSkillTitle.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(getAllSkillTitle.rejected,(state,action)=>{
            state.allTitle=action.payload
            state.loading=false
            state.error=action.error
        })
    }
})

export default tutorialSlice.reducer;
export const {updateTutorial} =tutorialSlice.actions