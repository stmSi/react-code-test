import { styled } from "@mui/material/styles";
import { CircularProgress, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchAllPostsAsync, selectPosts } from "../post/postListSlice";
import {Link} from "react-router-dom";

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
        <TextField onChange={handleSearchTextField} id="search-text-field" label="Search Title" variant="filled" focused />
      </Grid>
      {postsState.status === 'loading' ? (
        <Grid item>
          <CircularProgress />
        </Grid>
      ) : (
      postsState.data
      .filter((post) => post.title.toLowerCase().includes(searchString))
      .map((post) => (
        <Grid item key={post.id}>
        <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Item>
            <Typography variant="h5" justifyContent="center" color="#000">{post.title}</Typography>
            <Typography textAlign="left">{post.body}</Typography>
          </Item>
          </Link>
        </Grid>
      )))}
    </Grid>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));
