import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';

import CreateJoinGroup from './pages/CreateJoinGroup'

const AppRouter = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path='/'
        element={isAuthenticated ? <App /> : <Navigate to='/login' />}
      />

      <Route
        path='/login'
        element={!isAuthenticated ? <Login /> : <Navigate to='/' />}
      />

      <Route
        path='/register'
        element={!isAuthenticated ? <Register /> : <Navigate to='/' />}
      />

      <Route
        path='/create-join-group'
        element={isAuthenticated ? <CreateJoinGroup /> : <Navigate to='/login' />}
      />
    </Routes>
  );
}

export default AppRouter;
