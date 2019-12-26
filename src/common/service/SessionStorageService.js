export default class SessionStorageService {

    static set = (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    };

    static get = (key) => {
        return JSON.parse(sessionStorage.getItem(key));
    };

    static remove = (key) => {
        sessionStorage.removeItem(key);
    };

    static clear = () => {
        sessionStorage.clear();
    };
}
