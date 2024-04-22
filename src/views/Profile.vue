<template> 
<div v-if="user" class = "profile">
  <div class = "navbar-container">
    <NavBar/>
  </div>
<<<<<<< HEAD
  <div class = "header">
    <h2> Profile </h2>
    <p> Check profile details </p>
  </div>
  <div class = "content">
    Name: {{ user.displayName }}
    <br/>
    Email: {{ user.email }}
    <br/>
    User ID: {{ user.uid }}
    <br/>
    Provider: {{ user.providerData?.[0].providerId }}
  </div>
  </div>
  <LogOut/>
=======
  <LogOut />
  <FootBar />
>>>>>>> dc23eb12be807a0ebb588fd3b934337db5f9bad7
</template>



<script>
import LogOut from "@/components/LogOut.vue";
import NavBar from "@/components/TopNavigationBar.vue";
import FootBar from "@/components/FooterBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: "Profile",
  components: {
    LogOut,
    NavBar,
    FootBar,
  },
  data() {
    return {
      user: false,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
};
</script>

<style scoped> 
.profile {
  align-items: center; 
  min-height: 100vh; 
  width: 100%;
}

.header {
  background-color: #526c87;
  color: rgb(255, 255, 255);
  padding: 1rem;
  text-align: center;
  font-weight:lighter;
  border-radius: 8px;
}

.header h2 {
  font-size: 27.5px;
  margin-bottom: 2rem;
}

.header p {
  font-size: 18.5px;
  color: rgb(249, 247, 247);
  font-weight:500;
}

.navbar-container {
  width: 100%;
}

.content {
  margin-top: 3rem;
}

</style>
