import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import routes from './routes';
import AuthProvider from './contexts/AuthContext';
import PostProvider from './contexts/PostContext';
import PostsList from './components/PostsList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import Footer from './components/Footer';
import './App.css'

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
        <div className="flex flex-col min-h-screen bg-gray-900">
          <div className="flex bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Navbar />
              <div className="p-4">
                <Routes>
                  <Route path={routes.home} element={<Home />} />
                  <Route path={routes.login} element={<Login />} />
                  <Route path={routes.signup} element={<Signup />} />
                  <Route path={routes.posts} element={<PostsList />} />
                  <Route path={routes.posts_id} element={<PostDetail />} />
                  <Route path={routes.create_post} element={<CreatePost />} />
                </Routes>
              </div>
            </div>
          </div>
          <Footer/>
          </div>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;