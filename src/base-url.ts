import axios from "axios";

// export const baseURL = 'https://dry-forest-56016.herokuapp.com/';

enum BASE_URLS {
    LOCAL = 'http://localhost:7542/2.0/',
    HEROKU = 'https://neko-back.herokuapp.com/2.0'
}

export const instance = axios.create({
    baseURL: BASE_URLS.HEROKU,
    withCredentials: true,
});