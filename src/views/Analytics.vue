<template>
    <div class="analytics-dashboard">
        <div v-if="user" class="navbar-container">
            <NavBar />
        </div>
        <div class = "header">
          <h2> Data Visualisation and Analytics </h2>
          <p> Insightful data visualizations that empower you to make informed decisions for your business </p>
        </div>
        <div class="tab-container">
            <div class="analytics-grid">
                <div class="analytics-section" @click="$router.push({ name: 'ProfitAnalysis' })">
                    <img src="@/assets/profit.jpg" alt="Profit Analysis">
                    <h3> Profit Analysis </h3>
                    <p> Identify high-performing products 
                      and pinpoint products with lower margins. </p>
                </div>
                <div class="analytics-section" @click="$router.push({ name: 'Stock' })">
                    <img src="@/assets/stock.jpg" alt="Stock Levels">
                    <h3> Stock Levels </h3>
                    <p> Never miss a beat in supply management; Quick glance into items that require restocking. </p>
                </div>
                <div class="analytics-section" @click="$router.push({ name: 'Movement' })">
                    <img src="@/assets/movement.jpg" alt="Movement Analysis">
                    <h3> Movement Analysis </h3>
                    <p> Comprehensive view of inventory flow, highlighting both fast-moving items and slow-movers. </p>
                </div>
            </div>
            <LogOut />
    </div>
    <FootBar />
  </div>
</template>
  
<script>
import LogOut from "@/components/LogOut.vue";
import FootBar from "@/components/FooterBar.vue";
import NavBar from "@/components/TopNavigationBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
  
  export default {
    name: "AnalyticsDashboard",
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
  }
}

</script>
  
<style scoped>
.analytics-dashboard {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  min-height: 100vh; 
  width: 100%;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  grid-auto-rows: 1fr;
  width: 65%;
  gap: 50px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem 0;
}

.analytics-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  cursor: pointer;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.analytics-section:hover {
  transform: translateY(-5px); 
}

.analytics-section img {
  max-width: 100%; 
}

.analytics-section p {
  margin-top: 10px;
  font-size: 17.5px;
  line-height: 1.6;
  text-align: center;
  letter-spacing: 0.03em;
}

.analytics-section h3 {
  margin-top: 10px;
  font-size: 19.5px;
  text-align: center;
}

.log-out {
  margin-top: auto; 
  text-align: center; 
  padding-bottom: 1rem; 
}

.header {
  width: 99%;
  background-color: #5a7693;
  color: white;
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
  color: rgb(244, 244, 244);
  font-weight:500;
}

.navbar-container {
  width: 100%;
}

</style>