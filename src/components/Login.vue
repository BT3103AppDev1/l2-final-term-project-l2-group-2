<template>
  <div class = "main">
    <div class = "content">
      <h2> Welcome to </h2>
      <h1> OnTrack </h1>
      <div id="firebaseui-auth-container"></div>
      <br/><br/>
    <h3> OnTrack is a real-time Inventory Management System </h3>
      <h4> Keep track of product movements </h4>
      <h4> Manage item inflow and outflow in real time </h4>
    </div>
  <div id = "image">
    <img src ="@/assets/bg.jpg">
  </div>
</div>
</template>


<script>
import {
  getAuth,
  onAuthStateChanged,
  EmailAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "Login",

  data() {
    return {
      user: false,
    };
  },

  mounted() {
    const auth = getAuth();
    var ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) ui = new firebaseui.auth.AuthUI(auth);
    const uiConfig = {
      signInSuccessUrl: "/home",
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
      ],
    };
    ui.start("#firebaseui-auth-container", uiConfig);
    onAuthStateChanged(auth, (user) => {
      if (user) this.user = user;
    });
  },
};
</script>

<style scoped>

.main {
  height: 100vw;
  width: 100vw;
  min-width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.image {
  float: right;
  max-width: 10px;
  max-height: 20%;
}


h1 {
  color:rgb(223, 36, 36);
  text-align: center;
  font-size: 100px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  margin-top: 20px;
  margin-bottom: 20px;
}

h2 {
  font-size: 40px;
  font-weight: normal;
}

h3 {
  font-size: 35px;
  font-weight: normal;
  margin-top:0px;
}

h4 {
  font-size: 30px;
  font-weight: normal;
  margin-top: 20px;
  margin-bottom: 30px;
  text-align: 1px;
}

.content {
  float: left;
  width: 60%;
  padding-top: 10%;
}

#btn {
  text-align: center;
}
</style>
