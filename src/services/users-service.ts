
import { User, UserLoginInfo } from '../types/user';
import users from '../data/users/users.json';

const getAallUsers = (): User[] => {
    return users.map((user: any) => {
        return new User(
            user.id,
            user.name,
            user.password);
    });
}

const getUserIfExist = (userInfo: UserLoginInfo): User | undefined => {
    // Check if user exists in the data file
    const existedUser: User | undefined = users.find(
        (user) => user.name === userInfo.name && user.password === userInfo.password
    );
    return existedUser ? existedUser : undefined;
}

export const UsersService = {
    getAallUsers, getUserIfExist
}

