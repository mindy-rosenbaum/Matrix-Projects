import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from '../Login';
import MainScreen from '../MainScreen';
import { useActiveUserAuth } from '../AuthContext';
import { User, UserLoginInfo } from '../../Types/User';
import { UsersService } from '../../Services/UsersService';

import './App.css';

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
    </Router>
  );
}

export default App;
