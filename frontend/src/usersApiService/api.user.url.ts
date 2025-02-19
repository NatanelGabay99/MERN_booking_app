export const apiURL= 'http://localhost:8080';

export type USER_API = {
    register: string,
    login: string,
    logout: string,
    validateToken: string,
};


const UserAPI: USER_API = {
    register: `${apiURL}/users/register`,
    login: `${apiURL}/auth/login`,
    logout: `${apiURL}/auth/logout`,
    validateToken: `${apiURL}/auth/validate-token`,
};

export default UserAPI;