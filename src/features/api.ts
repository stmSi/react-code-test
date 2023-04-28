import axiosInstance from "./axiosInstance";

export function fetchPostById(id: number) {
  return axiosInstance.get(`/posts/${id}`);
}

export function fetchAllPosts() {
  return axiosInstance.get("/posts");
}

export function fetchCommentsByPostId(postId: number) {
  return axiosInstance.get(`/comments?postId=${postId}`);
}
