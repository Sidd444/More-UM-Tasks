import { AuthContext } from '../contexts/AuthContext';
import {useContext} from 'react';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white flex flex-col md:flex-row justify-between items-center p-4 shadow-md">
      <img className="h-12 w-12" src="https://png.pngtree.com/png-clipart/20230804/original/pngtree-blog-icon-login-blog-site-vector-picture-image_9569642.png" alt="logo" />
      <h1 className="text-2xl font-bold mb-2 md:mb-0">Blogger</h1>
      {user ? (
        <span className="text-xl font-bold">{user.name}</span>
      ) : (
        <span className="italic">Please log in</span>
      )}
    </nav>
  );
};

export default Navbar;