import CryptoJS from 'crypto-js';
import {useEffect, useState} from "react";

const SECRET_KEY: string = process.env.NEXT_PUBLIC_SECRET_KEY || '';

const encryptData = (data: string) => {
  const dataString: string = JSON.stringify(data);
  return CryptoJS.AES.encrypt(dataString, SECRET_KEY).toString();
};

const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const useLocalStorageService = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const SetItemToLStorage = (key: string, data: string) => {
    const encryptedData = encryptData(data);
    if (isClient) localStorage.setItem(key, encryptedData);
  }

  const GetItemFromLStorage = (key: string) => {
    if (isClient) {
      const encryptedData = localStorage.getItem(key);
      if (encryptedData) {
        return decryptData(encryptedData);
      }
    }
    return null;
  }

  const RemoveItemFromLStorage = (key: string) => {
    if (isClient) localStorage.removeItem(key);
  }
  return {SetItemToLStorage, GetItemFromLStorage, RemoveItemFromLStorage};
};

export default useLocalStorageService
