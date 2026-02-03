import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';

import CreateJoinGroup from './pages/Group/CreateJoinGroup'
import GroupDashboard from './pages/Group/GroupDashboard';
import LandingPage from './pages/LandingPage';
import GroupDetails from './pages/Group/GroupDetails';
import ErrorPage from './pages/ErrorPage';
import MyGroups from './pages/Group/MyGroups';

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
        element={<LandingPage />}
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

      <Route
        path='/group-dashboard/:groupId'
        element={isAuthenticated ? <GroupDashboard /> : <Navigate to='/login' />}
      />

      <Route
        path='/group-details/:groupId'
        element={isAuthenticated ? <GroupDetails /> : <Navigate to='/login' />}
      />

      <Route
        path='/landing-page'
        element={<LandingPage />}
      />

      <Route
        path='/my-groups'
        element={<MyGroups />}
      />

      <Route
        path='/error'
        element={<ErrorPage />}
      />
    </Routes>
  );
}

export default AppRouter;
