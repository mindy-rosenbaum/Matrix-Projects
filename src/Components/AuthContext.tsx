import React, { useState, useContext } from 'react';
import { ActiveUserInfo, User } from '../Types/User';
import AuthContext, { UserProvider } from '../Cotext/UserContext';
import { Strings } from '../Const';
import { LogStatus } from '../Types/enums';
import { CommonService } from '../Services/CommonService';
export interface AuthProviderProps {
    children: React.ReactNode;
}

export const useActiveUserAuth = () => useContext<ActiveUserInfo>(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeUser, setActiveUser] = useState<User | null>(null);

    const login = (user: User) => {
        if (user) {
            CommonService.log(Strings.massages.USR_LOGGED_IN_MASSAGE(user.name), LogStatus.info,)
            setIsLoggedIn(true);
            setActiveUser(user);
            localStorage.setItem(Strings.localStorageName.LOGGED_IN_USER, JSON.stringify(user));
        }
        else {
            CommonService.log(Strings.massages.NO_USER_LOGGED_IN, LogStatus.error,)
        }
    };

    const logout = () => {
        if (activeUser) {
            CommonService.log(Strings.massages.USR_LOGGED_OUT_MASSAGE(activeUser.name), LogStatus.info,)
            setIsLoggedIn(false);
            setActiveUser(null);
            localStorage.removeItem(Strings.localStorageName.LOGGED_IN_USER);
        }
        else {
            CommonService.log(Strings.massages.THERE_IS_NO_AN_ACTIVE_USER_TO_OUT, LogStatus.error,)
        }
    };

    return (
        <UserProvider value={{ user: activeUser, isLoggedIn, login, logout }}>
            {children}
        </UserProvider>
    );
};