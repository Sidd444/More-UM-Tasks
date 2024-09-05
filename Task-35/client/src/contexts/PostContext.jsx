import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import SERVER_URL from "../config";
import {toast} from 'react-hot-toast'

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [posts]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/api/posts`);
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const fetchPostById = async (id) => {
    try {
      const res = await axios.get(`${SERVER_URL}/api/posts/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching post", error);
    }
  };

  const updatePost = async (id, updatedPost, token) => {
    try {
      const res = await axios.put(`${SERVER_URL}/api/posts/${id}`, updatedPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.map(post => post._id === id ? res.data : post));
      toast.success("post eddited")
    } catch (error) {
      toast.error("please Relogin")
      console.error("Error updating post", error);
    }
  };

  const deletePost = async (id, token) => {
    try {
      await axios.delete(`${SERVER_URL}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter(post => post._id !== id));
      toast.success("post deleted");
    } catch (error) {
      toast.error("please relogin")
      console.error("Error deleting post", error);
    }
  };

  return (
    <PostContext.Provider value={{ posts, fetchPostById, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;