import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCglhxPlUy404O_pmZMKnLkW8yjMPc3yZE",
  authDomain: "crumb-999d2.firebaseapp.com",
  databaseURL: "https://crumb-999d2.firebaseio.com",
  projectId: "crumb-999d2",
  storageBucket: "",
  messagingSenderId: "583760081023",
  appId: "1:583760081023:web:bc987924d2cff273"
}

firebase.initializeApp(config);
const data = firebase.database();

export { firebase, data as default };
