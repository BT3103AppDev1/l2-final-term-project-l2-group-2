import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAIczcgTq0wBzrQPcETpDPAFVn7Y6-vgiA",
  authDomain: "l2g2-project.firebaseapp.com",
  projectId: "l2g2-project",
  storageBucket: "l2g2-project.appspot.com",
  messagingSenderId: "327642530633",
  appId: "1:327642530633:web:10a0725a4e900c4f371098"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
