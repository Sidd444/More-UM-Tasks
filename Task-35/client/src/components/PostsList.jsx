import React, { useContext, useState } from 'react';
import { PostContext } from '../contexts/PostContext';
import { AuthContext } from '../contexts/AuthContext';
import {toast} from 'react-hot-toast'

const PostList = () => {
  const { posts, deletePost, updatePost } = useContext(PostContext);
  const { user, token } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const handleDelete = (id) => {
    if (!user) return;
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(id, token);
      
    }
  };

  const handleEdit = (post) => {
    setIsEditing(true);
    setCurrentPost(post);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!currentPost || !token) return;
  
    updatePost(currentPost._id, currentPost, token).then(() => {
      setIsEditing(false);
      setCurrentPost(null);
    });
  };
  

  const handleChange = (e) => {
    setCurrentPost({ ...currentPost, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">My Posts</h2>
      {isEditing ? (
        <form onSubmit={handleUpdate} className="mb-6 p-4 border border-gray-300 rounded-lg shadow-md">
          <input
            type="text"
            name="title"
            value={currentPost.title}
            onChange={handleChange}
            className="w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <textarea
            name="content"
            value={currentPost.content}
            onChange={handleChange}
            className="w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <textarea
            name="excerpt"
            value={currentPost.excerpt}
            onChange={handleChange}
            className="w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <div className="flex space-x-4">
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        posts.filter(post => post.author._id === user._id).map((post) => (
          <div key={post._id} className="mb-6 p-4 border border-gray-300 rounded-lg shadow-md bg-gradient-to-r from-violet-600 via-pink-600 to-yellow-600">
            <h3 className="text-xl font-semibold mb-2 text-white">{post.title}</h3>
            <p className="text-white mb-2">{post.content}</p>
            <p className="text-White mb-4">{post.excerpt}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEdit(post)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 border-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 border-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;