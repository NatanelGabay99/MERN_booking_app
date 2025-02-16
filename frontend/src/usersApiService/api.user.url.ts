export const apiURL= 'http://localhost:8080';

export type USER_API = {
    register: string,
    login: string,
};

const UserAPI: USER_API = {
    register: `${apiURL}/users/register`,
    login: `${apiURL}/auth/login`,
};

export default UserAPI;