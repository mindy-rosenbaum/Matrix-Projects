export const Strings = {
    massages: {
        GRID_READY: "The Grid is ready",
        INVALID_USER_NAME_OR_PASSWORD: 'Invalid username or password. Please try again.',
        NO_USER_LOGGED_IN: "No user is logged in.",
        LOG_IN_SUCCESSFULL: 'Login successful',
        USER_NAME_REQUIRED: 'Username is required',
        USER_NAME_MUST_BE_LONG: 'Username must be at least 4 characters long',
        PASSWORD_REQUIRED: 'Password is required',
        PASSWORD_MUST_BE_LONG: 'Password must be at least 6 characters long',
        THERE_IS_NO_AN_ACTIVE_USER_TO_OUT: "There is no an Active user now to log out.",
        USR_LOGGED_OUT_MASSAGE: (userName: string): string => { return `User ${userName} is logged out.` },
        USR_LOGGED_IN_MASSAGE: (userName: string): string => { return `User ${userName} is logged in.` },
        WELLCOME_MASSAGE: (userName?: string): string => { return `Wellcom ${userName || ''} To Matrix Projects ` },
        SELECTED_PROJECT: (projectName: string): string => { return `Project ${projectName} is selected to view` }
    }
    ,
    localStorageName: {
        LOGGED_IN_USER: 'loggedInUser'
    },
    fieldNames: {
        PASSWORD: 'password',
        NAME: 'name'
    },
    titles: {
        MATRIX_PROJECTS: 'Matrix Projects'
    }

}