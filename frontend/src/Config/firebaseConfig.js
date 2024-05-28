import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCuCVq9RSw7jMNZvkFnX843gnKZvC9NQgk",
    authDomain: "the-fish-diary-99.firebaseapp.com",
    projectId: "the-fish-diary-99",
    storageBucket: "the-fish-diary-99.appspot.com",
    messagingSenderId: "281153425706",
    appId: "1:281153425706:web:7ee5e997f28b238d87ce53",
    measurementId: "G-S6CVC7Z4S3",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };
