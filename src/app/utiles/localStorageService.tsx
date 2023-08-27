import CryptoJS from 'crypto-js';
import {useEffect, useState} from "react";

const SECRET_KEY = 'WhisperJade9$';

const encryptData = (data) => {
  const dataString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(dataString, SECRET_KEY).toString();
};

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const localStorageService = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const SetItemToLStorage = (key, data) => {
    const encryptedData = encryptData(data);
    if (isClient) localStorage.setItem(key, encryptedData);
  }

  const GetItemFromLStorage = (key) => {
    if (isClient) {
      const encryptedData = localStorage.getItem(key);
      if (encryptedData) {
        return decryptData(encryptedData);
      }
    }
    return null;
  }

  const RemoveItemFromLStorage = (key) => {
    if (isClient) localStorage.removeItem(key);
  }
  return {SetItemToLStorage, GetItemFromLStorage, RemoveItemFromLStorage};
};

export default localStorageService
