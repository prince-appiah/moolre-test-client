import { initializeApp } from "firebase/app";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAo6gMEPG7AgCSiMiXRbIaI7_yAkvMJCOw",
  authDomain: "moolre-test.firebaseapp.com",
  projectId: "moolre-test",
  storageBucket: "moolre-test.appspot.com",
  messagingSenderId: "182049469650",
  appId: "1:182049469650:web:96368318dd69dd06a6a90b",
  measurementId: "G-919WVN639H",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);

export const uploadFile = async (file) => {
  try {
    const contractRef = ref(storage, `images/${file.name}`);
    await uploadBytes(contractRef, file);

    const downloadURL = await getDownloadURL(contractRef);

    return downloadURL;
  } catch (error) {
    console.log("Error uploading image to firebase: ", error);
    return false;
  }
};
