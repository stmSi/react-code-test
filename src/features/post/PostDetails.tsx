import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

import { Button, Card, CardContent, Divider, Typography } from "@mui/material";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchCommentsByPostIdAsync,
  fetchPostByIdAsync,
  selectPostDetails,
} from "./postDetailsSlice";
import { ArrowBack } from "@mui/icons-material";

export const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id as string, 10);

  const postDetailsState = useAppSelector(selectPostDetails);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCommentsByPostIdAsync(postId));
    dispatch(fetchPostByIdAsync(postId));
  }, [dispatch, postId]);

  return (
    <div>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="outlined" color="primary" startIcon={<ArrowBack />}>
          Return to Post List
        </Button>
      </Link>

      {postDetailsState.postStatus === "loading" && (
        <h4>Loading Post Info...</h4>
      )}
      {postDetailsState.postStatus === "idle" && (
        <>
          <Typography variant="h4">
            Title: {postDetailsState.post?.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ID: {postId}
          </Typography>
          <Typography>{postDetailsState.post?.body}</Typography>
        </>
      )}
      <Divider />
      <Divider />
      <Typography variant="h6">Comments:</Typography>
      {postDetailsState.commentsStatus === "loading" && (
        <p>Loading comments...</p>
      )}
      {postDetailsState.commentsStatus === "idle" &&
        postDetailsState.comments.map(comment => (
          <Card key={comment.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {comment.name}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {comment.email}
              </Typography>
              <Typography variant="body2">{comment.body}</Typography>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};
