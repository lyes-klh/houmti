import { useEffect } from 'react';
import Navbar from './layout/Navbar/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import PostFull from './pages/PostFull';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './features/authentication/authSlice';

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('effect started');

  //   const user = JSON.parse(localStorage.getItem('currentUser'));
  //   if (user) dispatch(login(user));
  //   console.log('effect completed');
  // }, [dispatch]);

  // console.log('after effect ');

  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user) dispatch(login(user));

  const PrivateRoutes = () => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    return currentUser ? (
      <>
        <Navbar />
        <Outlet />
      </>
    ) : (
      <Navigate to='/login' />
    );
  };

  const RedirectRoutes = () => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    return currentUser ? <Navigate to='/' /> : <Outlet />;
  };

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/posts/:postId' element={<PostFull />} />
        </Route>
        <Route element={<RedirectRoutes />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>

        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
