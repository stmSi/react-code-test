import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IPost } from "./IPost";
import { fetchAllPosts } from "../api";

export interface postsListState {
  data: IPost[];
  search: string;
  status: "idle" | "loading" | "failed";
}

const initialState: postsListState = {
  data: [],
  search: "",
  status: "idle",
};

export const fetchAllPostsAsync = createAsyncThunk(
  "posts/fetchAll",
  async () => {
    const response = await fetchAllPosts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);

export const postListSlice = createSlice({
  name: "posts",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllPostsAsync.pending, state => {
        state.status = "loading";
      })
      .addCase(
        fetchAllPostsAsync.fulfilled,
        (state, action: PayloadAction<IPost[]>) => {
          state.status = "idle";
          state.data = action.payload;
        },
      )
      .addCase(fetchAllPostsAsync.rejected, state => {
        state.status = "failed";
      });
  },
});

export const selectPosts = (state: RootState) => state.posts;

// export const selectFilteredPosts = (state: RootState) => {
//   const {data, search} = state.posts;
//
//   if(search){
//     return data.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
//   }
//   return data;
// }

export default postListSlice.reducer;
