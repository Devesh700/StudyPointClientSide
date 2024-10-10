import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
const baseUrl=import.meta.env.VITE_BASE_URL;
const version=import.meta.env.VITE_VERSION;

const initialState={
    allArticles:[],
    myArticles:[],
    article:[],
    loading:false,
    error:null
}

export const addArticle=createAsyncThunk(
    "addArticle",
    async(article,thunkApi)=>{
        //alert("running")
        let token=thunkApi.getState().user?.user?.accessToken || JSON.parse(sessionStorage.getItem("user"))?.accessToken
        console.log(token);
        console.log(article);
        for(let [key,value] of article.entries())
        console.log(key,value);
        console.log("title",article.title);
        console.log("technology",article.technology);
        console.log("description",article.description);
        try{
            const response=await fetch(`${baseUrl}/${version}/article/addarticle`,{
                method:"POST",
                body:article,
                headers:{
                    // "Content-Type":"multipart/form-data",
                    Authorization:token
                }
            })
            const result=await response.json();
            if(!result.ok){
            alert(result.message)
            return thunkApi.rejectWithValue(result);
            }
            else
            return result;
            
        }   catch(err){
            thunkApi.rejectWithValue(err.message);
        }
        console.log(thunkApi);
        //alert("ran");

    }
)

export const getArticleById=createAsyncThunk(
    "getArticleById",
    async(_id,thunkApi)=>{
        try {
            const response=await fetch(`${baseUrl}/${version}/article/${_id}`,{
                method:"GET"
            })
            const result=await response.json();
            if(!result.ok){
                alert(result.message)
                return thunkApi.rejectWithValue(result);
            }
            //alert(result.message);
            return result.data;
        } catch (error) {
            thunkApi.rejectWithValue(error);
        }
    }
)


export const getAllArticle=createAsyncThunk(
    "getAllArticle",
    async(_,thunkApi)=>{
        try {
            const response=await fetch(`${baseUrl}/${version}/article/get/all`,{
                method:"GET"
            })
            const result=await response.json();
            if(!result.ok){
                alert(result.message)
                return thunkApi.rejectWithValue(result);
            }
            //alert(result.message);
            console.log(result.data);
            return result.data;
        } catch (error) {
            thunkApi.rejectWithValue(error);
        }
    }
)

export const addLike=createAsyncThunk(
    "addlike",
    async (data,thunkApi)=>{
        if(!data?.articleId || !data?.title){
            return alert("Didn't receive article details which you want to like");
        }

        let token=thunkApi.getState().user?.user?.accessToken || JSON.parse(sessionStorage.getItem("user"))?.accessToken;
        if(!token){
            alert("please log in to continue liking articles");
            return;
        }

        try{
            let result=await fetch(`${baseUrl}/${version}/like/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                },
                body:JSON.stringify(data)
            })
            if(!result.ok){
                alert(result?.message);
                return thunkApi.rejectWithValue(result);
            }
            result=await result.json();
            
            console.log(result);
            return result
        }   catch(err){
            alert("error occured please try again")
            return thunkApi.rejectWithValue(err);
        }
    }    
)

export const removeLike=createAsyncThunk(
    "removelike",
    async (data,thunkApi)=>{
        if(!data?.articleId || !data?.title){
            return alert("Didn't receive article details which you want to like");
        }

        let token=thunkApi.getState().user?.user?.accessToken || JSON.parse(sessionStorage.getItem("user"))?.accessToken;
        if(!token){
            alert("please log in to continue liking articles");
            return;
        }

        try{
            let result=await fetch(`${baseUrl}/${version}/like`,{
                method:"delete",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                },
                body:JSON.stringify(data)
            })
            if(!result.ok){
                alert(result?.message);
                return thunkApi.rejectWithValue(result);
            }
            result=await result.json();
            
            console.log(result);
            return result;
        }   catch(err){
            alert("error occured please try again")
            return thunkApi.rejectWithValue(err);
        }
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
            .addCase(addArticle.pending,(state,action)=>{
                state.loading=true;
        })
            .addCase(addArticle.rejected,(state,action)=>{
                state.error=action.error;
                state.loading=false;
        })
            .addCase(getArticleById.fulfilled,(state,action)=>{
                state.article=action.payload;
                state.error=null;
                state.loading=false;
        })
            .addCase(getArticleById.pending,(state,action)=>{
                state.loading=true;
        })
            .addCase(getArticleById.rejected,(state,action)=>{
                state.error=action.error;
                state.loading=false;
        })
            .addCase(getAllArticle.fulfilled,(state,action)=>{
                state.allArticles=action.payload;
                state.error=null;
                state.loading=false;
        })
            .addCase(getAllArticle.pending,(state,action)=>{
                state.loading=true;
        })
            .addCase(getAllArticle.rejected,(state,action)=>{
                state.error=action.error;
                state.loading=false;
        })
            .addCase(addLike.fulfilled,(state,action)=>{
                state.article=action.payload;
                state.error=null;
                state.loading=false;
        })
            .addCase(addLike.pending,(state,action)=>{
                state.loading=true;
        })
            .addCase(addLike.rejected,(state,action)=>{
                state.error=action.error;
                state.loading=false;
        })
            .addCase(removeLike.fulfilled,(state,action)=>{
                state.article=action.payload;
                state.error=null;
                state.loading=false;
        })
            .addCase(removeLike.pending,(state,action)=>{
                state.loading=true;
        })
            .addCase(removeLike.rejected,(state,action)=>{
                state.error=action.error;
                state.loading=false;
        })
        }
    }
)

export default articleSlice.reducer;
export const {UpdateArticle}=articleSlice.actions;