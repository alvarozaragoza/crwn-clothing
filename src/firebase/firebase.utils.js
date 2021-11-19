import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyCLTBbtR22PkTcTjn5M_BoOYCFc2SZG1do",
    authDomain: "crwn-db-ec80d.firebaseapp.com",
    projectId: "crwn-db-ec80d",
    storageBucket: "crwn-db-ec80d.appspot.com",
    messagingSenderId: "751708897337",
    appId: "1:751708897337:web:d3a4b0efd1478259ff0de8",
    measurementId: "G-QG0XGTJY7L"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;