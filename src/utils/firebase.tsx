import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD61dDndPMiENEYlLOuzd0ZgTxLjnnqwqc",
  authDomain: "todo-list-b67ed.firebaseapp.com",
  databaseURL:
    "https://todo-list-b67ed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-list-b67ed",
  storageBucket: "todo-list-b67ed.appspot.com",
  messagingSenderId: "771155816965",
  appId: "1:771155816965:web:40c70c1263b90ad0f7226c",
  measurementId: "G-Z3SZWPCBK9"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

export default database;
