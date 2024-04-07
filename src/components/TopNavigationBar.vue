<template>
  <div id="logged" v-if="user">
    <div id="nav">
      <div class="navbar-brand">
        <img src = '@/assets/onTrackLogi.jpg' alt="OnTrack Logo">
      </div>
      <router-link to="/about">About</router-link> |
      <router-link to="/inventory">Inventory Management</router-link> |
      <router-link to="/sales">Sales Dashboard</router-link> |
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/addItem">Add Item</router-link>

    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "NavBar",

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
#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4e8de;
  color: black;
  height:5vh;
  width: 100vw;
}

.navbar-brand img {
    height: 5vh;
    width: 6vw;
  }

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #6366f1;
}
</style>

