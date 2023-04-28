import nock from "nock";
import { fetchAllPosts, fetchCommentsByPostId, fetchPostById } from "./api";
// import { JsonPlaceHolderURL } from "./axiosInstance";
// import { IComment } from "./comment/IComment";
//
// import { IPost } from "./post/IPost";

describe("Testing External JsonPlaceHolder API functions", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("fetches a post by ID", async () => {
    const postId = 1;
    // const mockPost: IPost = {
    //   id: 1,
    //   userId: 1,
    //   title: "This is title",
    //   body: "this is loooong body",
    // };

    // nock(JsonPlaceHolderURL).get(`/posts/${postId}`).reply(200, mockPost);

    const response = await fetchPostById(postId);
    // expect(response.data).toEqual(mockPost);
    expect(response.data.id).toEqual(postId);
  });

  it("fetches all posts", async () => {
    // const mockPosts: IPost[] = [
    //   {
    //     id: 1,
    //     userId: 1,
    //     title: "This is title",
    //     body: "this is loooong body",
    //   },
    //   {
    //     id: 2,
    //     userId: 1,
    //     title: "This is title #2",
    //     body: "this is loooong body #2",
    //   },
    // ];
    // nock(JsonPlaceHolderURL).get("/posts").reply(200, mockPosts);

    const response = await fetchAllPosts();
    // expect(response.data).toBe(mockPosts);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

  it("fetches comments by post ID", async () => {
    const postId = 1;
    // const mockComments: IComment[] = [
    //   {
    //     postId: 1,
    //     id: 1,
    //     name: "id labore ex et quam laborum",
    //     email: "Eliseo@gardner.biz",
    //     body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
    //   },
    //   {
    //     postId: 1,
    //     id: 2,
    //     name: "quo vero reiciendis velit similique earum",
    //     email: "Jayne_Kuhic@sydney.com",
    //     body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
    //   },
    // ];
    //
    // nock(JsonPlaceHolderURL).get(`/comments?postId=${postId}`).reply(200);

    const response = await fetchCommentsByPostId(postId);
    // expect(response.data).toBe(mockComments);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });
});
