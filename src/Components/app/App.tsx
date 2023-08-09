import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from '../login';
import MainScreen from '../main-screen';
import { useActiveUserAuth } from '../auth-context';
import { User, UserLoginInfo } from '../../types/user';
import { UsersService } from '../../services/users-service';
import { Strings } from '../../consts';

import './app.css';

const App: React.FC = () => {

  useEffect(() => {
    const userString = localStorage.getItem(Strings.localStorageName.LOGGED_IN_USER);
    if (userString) {
      const user = JSON.parse(userString) as UserLoginInfo;
      const existedUser: User | undefined = UsersService.getUserIfExist(user);
      if (existedUser) {
        login(user);
      }
    }
  }, []);

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

