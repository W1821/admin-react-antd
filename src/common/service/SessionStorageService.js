export default class SessionStorageService {

    static set = (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    };

    static get = (key) => {
        const value = sessionStorage.getItem(key);
        if (!value) {
            return null;
        }
        return JSON.parse(value);
    };

    static remove = (key) => {
        sessionStorage.removeItem(key);
    };

    static clear = () => {
        sessionStorage.clear();
    };
}
