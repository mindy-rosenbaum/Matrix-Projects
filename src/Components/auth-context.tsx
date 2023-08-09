import React, { useState, useContext } from 'react';

import AuthContext, { UserProvider } from '../context/user-cotext';
import { CommonService } from '../services/common-service';
import { LogStatus } from '../types/enums';
import { ActiveUserInfo, User } from '../types/user';
import { Strings } from '../consts';
import { Translation } from '../translation';


export interface AuthProviderProps {
    children: React.ReactNode;
}

export const useActiveUserAuth = () => useContext<ActiveUserInfo>(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeUser, setActiveUser] = useState<User | null>(null);

    const login = (user: User) => {
        if (user) {
            CommonService.log(Translation.massages.USR_LOGGED_IN_MASSAGE(user.name), LogStatus.INFO)
            setIsLoggedIn(true);
            setActiveUser(user);
            localStorage.setItem(Strings.localStorageName.LOGGED_IN_USER, JSON.stringify(user));
        }
        else {
            CommonService.log(Translation.massages.NO_USER_LOGGED_IN, LogStatus.ERROR,)
        }
    };

    const logout = () => {
        if (activeUser) {
            CommonService.log(Translation.massages.USR_LOGGED_OUT_MASSAGE(activeUser.name), LogStatus.INFO)
            setIsLoggedIn(false);
            setActiveUser(null);
            localStorage.removeItem(Strings.localStorageName.LOGGED_IN_USER);
        }
        else {
            CommonService.log(Translation.massages.THERE_IS_NO_AN_ACTIVE_USER_TO_OUT, LogStatus.ERROR)
        }
    };

    return (
        <UserProvider value={{ user: activeUser, isLoggedIn, login, logout }}>
            {children}
        </UserProvider>
    );
};
