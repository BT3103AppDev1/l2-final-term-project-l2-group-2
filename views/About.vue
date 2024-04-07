<template>
  <div style="text-align: center" v-if="user">
    <NavBar/>
    <h3>This is the About Page</h3>
    <h2>Welcome to OnTrack</h2>
    <h3>
      OnTrack is a real-time inventory management system for you to keep track of all product movements.
    </h3>
    <LogOut /> <br /><br />
  </div>
</template>

<script>
import LogOut from "@/components/LogOut.vue";
import NavBar from "@/components/NavBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: "About",
  components: {
    LogOut,
    NavBar,
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
