<template>
  <div id="logged" v-if="user">
    <nav id="navbar">
      <div class="navbar-brand">
        <img src="@/assets/onTrackLogi.jpg" alt="OnTrack Logo">
      </div>
      <ul class="nav-links">
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/inventory">Inventory</router-link></li>
        <li><router-link to="/analytics">Analytics</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <li><router-link to="/addItem">Add Item</router-link></li>
        <li><router-link to="/editItem">Edit Item / Restock</router-link></li>
      </ul>
    </nav>
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
#navbar {
  background-color: #2c3e50; /* Dark background color */
  color: white; /* Text color */
  padding: 10px 20px; /* Padding around navbar */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
  border-radius: 8px; /* Rounded corners for the navbar */
}

.navbar-brand img {
  height: 50px; /* Adjust logo size */
  vertical-align: middle; /* Center logo vertically */
}

.nav-links {
  list-style: none; /* Remove bullet points */
  margin: 0;
  padding: 0;
  display: flex;
}

.nav-links li {
  margin-left: 20px; /* Spacing between links */
}

.nav-links li:first-child {
  margin-left: 0; /* No margin for first link */
}

.nav-links a {
  color: white; /* Link color */
  text-decoration: none; /* Remove underline */
  transition: color 0.3s; /* Smooth transition for color change */
  padding: 10px; /* Add padding around links */
  border-radius: 5px; /* Round the corners of links */
  font-weight: 500; /* Bold font weight */
}

.nav-links a:hover {
  background-color: #34495e; /* Darker background color on hover */
}

.nav-links a.router-link-active {
  background-color: #34495e; /* Highlight background color for active link */
}
</style>
