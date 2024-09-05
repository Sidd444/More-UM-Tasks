import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import routes from '../routes';

const AuthForm = ({ isSignup }) => {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      const result = await register(formData);
      if (result.success) {
        toast.success('Registered successfully!');
        window.location.href = routes.home;
      } else {
        toast.error(result.message);
      }
    } else {
      const result = await login(formData);
      if (result.success) {
        toast.success('Logged in successfully!');
        window.location.href = routes.home;
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSignup && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        {isSignup ? 'Sign Up' : 'Log In'}
      </button>
      <p>
        {isSignup ? (
          <Link to={routes.login}>Already have an account? Log In</Link>
        ) : (
          <Link to={routes.signup}>Don't have an account? Sign Up</Link>
        )}
      </p>
    </form>
  );
};

export default AuthForm;
