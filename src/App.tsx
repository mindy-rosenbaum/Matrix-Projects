import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import './App.css';
import MainScreen from './Components/MainScreen';
import { useActiveUserAuth } from './Components/AuthContext';
import { User, UserLoginInfo } from './Types/User';
import { UsersService } from './Services/UsersService';
import ProtectedRoute from './Components/ProtectedRoute';

const App: React.FC = () => {

  useEffect(() => {
    const userString = localStorage.getItem('loggedInUser');
    if (userString) {
      const user = JSON.parse(userString) as UserLoginInfo;
      const existedUser: User | undefined = UsersService.getUserIfExist(user);
      if (existedUser) {
        login(user);
      }
    }
  }, [])
  const { isLoggedIn, login } = useActiveUserAuth();

  return (
    <Router>
       <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/mainScreen" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainScreen" element={isLoggedIn ? <MainScreen /> : <Navigate to="/" />} />
      </Routes>
      {/* <Routes>
        <Route path="/" element={<ProtectedRoute path='/mainScreen'><Login /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainScreen" element={<ProtectedRoute path='/'><MainScreen /></ProtectedRoute>} />
      </Routes> */}
    </Router>
  );
}

export default App;
