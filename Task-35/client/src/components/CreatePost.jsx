import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import SERVER_URL from '../config';
import { AuthContext } from '../contexts/AuthContext';
import { PostContext } from '../contexts/PostContext';
import {toast} from 'react-hot-toast'

const CreatePost = () => {
  const { user,token } = useContext(AuthContext);
  const {posts}=useContext(PostContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt]=useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let author=user._id; 
    try {
      const newPost = { title, content, excerpt, author };
      await axios.post(`${SERVER_URL}/api/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Post created successfully by '+user.name);
      posts.push(newPost);
      setTitle('');
      setContent('');
      setExcerpt('');
    } catch (err) {
      toast.error("Please Login again");
      console.error("client error "+err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6 h-screen">
      <p className="text-center font-bold text-2xl">Create Your Post</p>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        placeholder="Excerpt"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
      >
        Create Post
      </button>
    </form>
  );
  
};

export default CreatePost;