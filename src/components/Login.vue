<template>
  <div id = "main">
    <div id = "content">
      <h2> Welcome to </h2>
      <h1> OnTrack </h1>
      <br/><br/>
      <div id="firebaseui-auth-container"></div>
      <br/><br/>
      <h3> Manage your inventory with ease </h3>
    </div>
    <div id="image" >
      <img src = "@/assets/bg.jpg">
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

#main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

#image {
  float: right;
  width: 60%;
  height: 100vh;
  overflow: hidden;
}

#image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}


h1 {
  color:rgb(223, 36, 36);
  text-align:center;
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
  font-size: 28px;
  color: grey;
}

#content {
  float: left;
  width: 60%;
  padding-top: 10%;
  box-sizing: border-box;
}

#btn {
  font-size: 18px;
  padding: 12px 20px;
  min-height: 50px;
  width: auto;
  border-radius: 5px;
  text-align: center;
}

</style>
