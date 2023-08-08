
export class User {
    name: string;
    password: string;
    id: string;

    constructor(name: string, password: string, id: string) {
        this.name = name;
        this.password = password;
        this.id = id;
    }
}

export type ActiveUserInfo = {
    user: User | null,
    isLoggedIn: boolean,
    login: Function;
    logout: Function;
};

export type UserLoginInfo = Pick<User, "name" | "password">;