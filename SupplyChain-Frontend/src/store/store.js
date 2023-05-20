import { configureStore } from "@reduxjs/toolkit";
import dbSlice from "./dbSlice";
export const store = configureStore({
    reducer: { db: dbSlice.reducer },
});
