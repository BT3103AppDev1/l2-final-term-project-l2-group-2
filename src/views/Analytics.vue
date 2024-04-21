<template>
    <div class="analytics-dashboard">
        <div v-if="user" class="navbar-container">
            <NavBar />
        </div>
        <div class = "header">
          <h2> Data Visualisation and Analytics </h2>
        </div>
        <div class="tab-container">
            <div class="analytics-grid">
                <div class="analytics-section" @click="$router.push({ name: 'ProfitAnalysis' })">
                    <img src="@/assets/profit.jpg" alt="Profit Analysis">
                    <p> Profit Analysis </p>
                </div>
                <div class="analytics-section" @click="$router.push({ name: 'Stock' })">
                    <img src="@/assets/stock.jpg" alt="Stock Levels">
                    <p> Stock Levels </p>
                </div>
                <div class="analytics-section" @click="$router.push({ name: 'Movement' })">
                    <img src="@/assets/movement.jpg" alt="Movement Analysis">
                    <p> Movement Analysis </p>
                </div>
            </div>
            <LogOut />
    </div>
  </div>
</template>
  
<script>
import LogOut from "@/components/LogOut.vue";
import NavBar from "@/components/TopNavigationBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
  
  export default {
    name: "AnalyticsDashboard",
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
  }
}

</script>
  
<style scoped>
.page-container {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  min-height: 100vh; 
  width: 100%;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  width: 60%;
  gap: 50px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}

.analytics-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
}

.analytics-section img {
  width: 75%; 
  height: auto;
}

.analytics-section p {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.log-out {
  margin-top: auto; 
  text-align: center; 
  padding-bottom: 1rem; 
}

.header {
  width: 100%;
  background-color: #5a7693;
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight:lighter;
}

.navbar-container {
  width: 100%;
}

</style>