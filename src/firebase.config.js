import {getApp, getApps, initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyAYgxXMrgq4hv0LQZYYFZ9DUPf1sM33r7Q",
    authDomain: "food-delivery-d1d57.firebaseapp.com",
    databaseURL: "https://food-delivery-d1d57-default-rtdb.firebaseio.com",
    projectId: "food-delivery-d1d57",
    storageBucket: "food-delivery-d1d57.appspot.com",
    messagingSenderId: "781948897201",
    appId: "1:781948897201:web:71b2310fa035f4d8be5f90"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app)
  const storage = getStorage(app)

  export { app , firestore, storage};
