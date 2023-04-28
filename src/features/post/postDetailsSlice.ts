import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchCommentsByPostId, fetchPostById } from "../api";
import { IComment } from "../comment/IComment";
import { IPost } from "./IPost";

interface PostDetailsState {
  post: IPost | null;
  postStatus: "idle" | "loading" | "failed";

  comments: IComment[];
  commentsStatus: "idle" | "loading" | "failed";
}

const initialState: PostDetailsState = {
  post: null,
  comments: [],
  commentsStatus: "idle",
  postStatus: "idle",
};

export const fetchPostByIdAsync = createAsyncThunk(
  "postDetails/fetchPostById",
  async (postId: number) => {
    const response = await fetchPostById(postId);
    return response.data;
  },
);

export const fetchCommentsByPostIdAsync = createAsyncThunk(
  "postDetails/fetchCommentsByPostId",
  async (postId: number) => {
    const response = await fetchCommentsByPostId(postId);
    return response.data;
  },
);

const postDetailsSlice = createSlice({
  name: "postDetails",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Single post stuffs
      .addCase(fetchPostByIdAsync.pending, state => {
        state.postStatus = "loading";
      })
      .addCase(
        fetchPostByIdAsync.fulfilled,
        (state, action: PayloadAction<IPost>) => {
          state.postStatus = "idle";
          state.post = action.payload;
        },
      )
      .addCase(fetchPostByIdAsync.rejected, state => {
        state.postStatus = "failed";
      })

      // Comment stuffs
      .addCase(fetchCommentsByPostIdAsync.pending, state => {
        state.commentsStatus = "loading";
      })
      .addCase(
        fetchCommentsByPostIdAsync.fulfilled,
        (state, action: PayloadAction<IComment[]>) => {
          state.commentsStatus = "idle";
          state.comments = action.payload;
        },
      )
      .addCase(fetchCommentsByPostIdAsync.rejected, state => {
        state.commentsStatus = "failed";
      });
  },
});

export const selectPostDetails = (state: RootState) => state.postDetails;

export default postDetailsSlice.reducer;
