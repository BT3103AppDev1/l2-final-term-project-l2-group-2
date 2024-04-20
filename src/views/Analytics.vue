<template>
    <div class="analytics-dashboard">
        <div v-if="user" class="navbar-container">
            <NavBar />
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
      <div class="logout-container">
      <LogOut />
      </div>
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
  margin-top: 150px;
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

.logout-container {
  width: 100%; 
  display: flex;
  justify-content: center; 
  margin-top: auto; 
  padding: 80px 0; 
}

</style>