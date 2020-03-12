import * as firebase from 'firebase';

const config = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  databaseURL: "DATABASE_URL",
  projectId: "PROJECT_ID",
  storageBucket: "",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID"
}

firebase.initializeApp(config);
const database = firebase.database();

export { firebase, database as default };
