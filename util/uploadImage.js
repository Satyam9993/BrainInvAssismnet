import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { uuid } from 'uuidv4';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage();

const upLoadImage = async (file) => {
    try {
    const storageRef = ref(storage, uuid());
        const metadata = {
            contentType: file.mimetype
        };
        const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
        const url = await getDownloadURL(snapshot.ref);
        return url;
    } catch (error) {
        return new Error(error.message);
    }
}

export { upLoadImage }