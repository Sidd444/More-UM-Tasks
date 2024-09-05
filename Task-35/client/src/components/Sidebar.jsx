import { Link } from 'react-router-dom';
import routes from '../routes';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    window.location.href = routes.home;
  };

  const handleCreatePost = () => {
    if (!user) {
      toast.error("Must log in first");
    }
  };

  return (
    <aside className="bg-blue-900 text-white font-bold w-64 flex flex-col justify-between p-4">
      <nav>
        <Link to={routes.home} className="block py-2">Home</Link>
        {!user && (
          <>
            <Link to={routes.login} className="block py-2">Log In</Link>
            <Link to={routes.signup} className="block py-2">Join Now</Link>
          </>
        )}
        {user && (
          <>
            <Link to={routes.posts} className="block py-2">My Posts</Link>
            <Link to={routes.create_post} onClick={handleCreatePost} className="block py-2">Create Post</Link>
            <button onClick={handleLogout} className="block py-2">Logout</button>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;