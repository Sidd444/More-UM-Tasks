import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/protected">Protected</Link>
      </div>
    </nav>
  );
};

export default Navbar;
