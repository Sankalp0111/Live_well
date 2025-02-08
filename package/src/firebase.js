import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDxBaSlOPsLLlGWCliDySMgS5TexdkiGyU",
    authDomain: "health-9fa08.firebaseapp.com",
    projectId: "health-9fa08",
    storageBucket: "health-9fa08.firebasestorage.app",
    messagingSenderId: "417692012552",
    appId: "1:417692012552:web:33a8aa58ac72afa11701bd",
    measurementId: "G-CQ2SWTDR1C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
