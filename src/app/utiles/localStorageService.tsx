import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key';

const encryptData = (data) => {
    const dataString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(dataString, SECRET_KEY).toString();
};

const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const LocalStorageService = {
    setItem: (key, data) => {
        const encryptedData = encryptData(data);
        localStorage.setItem(key, encryptedData);
    },
    getItem: (key) => {
        const encryptedData = localStorage.getItem(key);
        if (encryptedData) {
            return decryptData(encryptedData);
        }
        return null;
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
    },
};
