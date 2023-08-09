import React from 'react';

import { ActiveUserInfo, User } from '../types/user';

const initValue: ActiveUserInfo = {
    user: null,
    isLoggedIn: false,
    login: (user: User) => { },
    logout: () => { }
};

const AuthContext = React.createContext<ActiveUserInfo>(initValue);
export const UserProvider = AuthContext.Provider;
export const UserConsumer = AuthContext.Consumer;//TODO neede??
export default AuthContext;



