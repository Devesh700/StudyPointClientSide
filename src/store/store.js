import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import articleSlice from "./slices/articleSlice";
import tutorialSlice from "./slices/tutorialSlice";

const store=configureStore({
    reducer:{
        user:userSlice,
        article:articleSlice,
        tutorials:tutorialSlice,
    }
})
export default store;