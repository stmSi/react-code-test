import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import postListReducer from "../features/post/postListSlice";
import postDetailsReducer from "../features/post/postDetailsSlice";

export const store = configureStore({
  reducer: {
    posts: postListReducer,
    postDetails: postDetailsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
