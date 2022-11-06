import axios from 'axios';

const API = axios.create({ baseURL: 'https://travelogue.adaptable.app/' });
API.interceptors.request.use((req) => {
   if(localStorage.getItem('profile')) {
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
   } 
   return req;
});
const user=JSON.parse(localStorage.getItem('profile'));

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search10?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const fetchPostsByName = (searchQuery) => API.get(`/posts/search?searchQuery=${user.result.name||'none'}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData); 