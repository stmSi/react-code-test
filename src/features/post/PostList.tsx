import { CircularProgress, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchAllPostsAsync, selectPosts } from "../post/postListSlice";

import './PostList.css';

export function PostList() {
  const postsState = useAppSelector(selectPosts);
  const [searchString, setSearchString] = useState("");
  const dispatch = useAppDispatch();

  const handleSearchTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value.toLowerCase());
  };

  useEffect(() => {
    dispatch(fetchAllPostsAsync());
  }, [dispatch]);

  return (
    <Grid container direction="column" alignItems="center" spacing={4}>
      <Grid item>
        <TextField
          onChange={handleSearchTextField}
          id="search-text-field"
          label="Search Title"
          variant="filled"
          focused
        />
      </Grid>
      {postsState.status === "loading" ? (
        <Grid item>
          <CircularProgress />
        </Grid>
      ) : (
        postsState.data
          .filter(post => post.title.toLowerCase().includes(searchString))
          .map(post => (
            <Grid
              item
              key={post.id}
              className="post-item" 
            >
              <Link
                to={`/post/${post.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                  <Typography variant="h5" justifyContent="center" className="post-title">
                    {post.title}
                  </Typography>
                  <Typography textAlign="left" className="post-body">{post.body}</Typography>
              </Link>
            </Grid>
          ))
      )}
    </Grid>
  );
}

