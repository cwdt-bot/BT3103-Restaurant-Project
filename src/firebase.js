import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCL6B8whCc0tXUn_iyqZE5IFlCnb4jVvIc",
    authDomain: "bt3103-week-6-eb83e.firebaseapp.com",
    projectId: "bt3103-week-6-eb83e",
    storageBucket: "bt3103-week-6-eb83e.appspot.com",
    messagingSenderId: "952177322860",
    appId: "1:952177322860:web:402277b6512fe4ab2fa149",
    measurementId: "G-ZPDCDBZXF3"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;