import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import firebaseApp from "./firebase";

// Set authentication persistence to 'session'
const auth = getAuth(firebaseApp);
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log('Authentication persistence set successfully');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

createApp(App).use(router).mount("#app");
