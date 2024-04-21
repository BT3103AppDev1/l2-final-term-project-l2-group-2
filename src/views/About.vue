<template>
  <div class = "page-container">
  <div v-if="user" class="navbar-container">
            <NavBar />
        </div>
    <div class = "about">
      <img class = "img" src = "@/assets/about.jpg">
      <div class = "text-content">
        <h1> About Us </h1>
        <p> Welcome to OnTrack, the inventory companion for growing businesses. 
          Tailored for the needs of small companies, OnTrack offers an intuitive platform where simplicity meets efficiency. 
          Our system empowers you to manage your inventory effortlessly with real-time updates and insightful analytics. 
          Features include at-a-glance inventory viewing, seamless product addition and removal, and analysis tools that highlight 
          low stock levels and track your best and least performing items based on profit and movement. 
          With OnTrack, inventory management is no longer a chore but a strategic asset that keeps your business flowing smoothly. </p>
        </div>
      </div>
    <LogOut /> 
  </div>
</template>

<script>
import LogOut from "@/components/LogOut.vue";
import NavBar from "@/components/TopNavigationBar.vue";
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

<style scoped>

.navbar-container {
  width: 100%; 
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  align-items: stretch;
}

.about {
  flex: 1; 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}


.img {
  width: 43%; /* Adjust as needed */
  height: auto;
  margin-right: 20px;
}

.text-content {
  width: 50%;
  background-color: rgb(196, 217, 224);
  height: 50vh;
}

.text-content h1 {
  font-size: 66px;
  color: #333;
  margin-top: 4rem;
  margin-bottom: 5rem;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.text-content p, li {
  color:  #525151;
  font-size: 25.5px;
  margin-left: 4rem;
  margin-right: 4rem;
  font-family:Arial, Helvetica, sans-serif;
  line-height: 1.75;
  text-align: justify;
}

.log-out {
  margin-top: auto; 
  text-align: center; 
  padding-bottom: 1rem; 
}
</style>

