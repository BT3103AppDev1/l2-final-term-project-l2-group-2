<template>
    <div style="text-align: center" v-if="user">
      <NavBar />
    </div>
    <LogOut />
  </template>
  
  <script>
  import LogOut from "@/components/LogOut.vue";
  import NavBar from "@/components/TopNavigationBar.vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  export default {
    name: "Profile",
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