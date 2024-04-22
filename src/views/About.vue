<template>
  <div class="page-container">
    <div v-if="user" class="navbar-container">
      <NavBar />
    </div>
    <div class="about">
      <img class="img" src="@/assets/about.jpg">
      <div class="text-content">
        <h1>About Us</h1>
        <p>Welcome to OnTrack, the inventory companion for growing businesses. Tailored for the needs of small companies, OnTrack offers an intuitive platform where simplicity meets efficiency. Our system empowers you to manage your inventory effortlessly with real-time updates and insightful analytics. Features include at-a-glance inventory viewing, seamless product addition and removal, and analysis tools that highlight low stock levels and track your best and least performing items based on profit and movement. With OnTrack, inventory management is no longer a chore but a strategic asset that keeps your business flowing smoothly.</p>
      </div>
    </div>
    <div class="features-list">
      <div class="feature">
        <img src="@/assets/inventory-icon.png" alt="Inventory Icon">
        <h3>Manage your virtual inventory</h3>
        <p>View your products, prices, costs, and stocks</p>
      </div>
      <div class="feature">
        <img src="@/assets/sell-icon.png" alt="Sell Icon">
        <h3>Sell your stocked products</h3>
        <p>Sell your products and calculate profits</p>
      </div>
      <div class="feature">
        <img src="@/assets/edit-icon.png" alt="Edit Icon">
        <h3>Edit your product details</h3>
        <p>Freely edit product details on the go</p>
      </div>
      <div class="feature">
        <img src="@/assets/analysis-icon.png" alt="Analysis Icon">
        <h3>Analyse your business statistics</h3>
        <p>View statistics that will help you grow</p>
      </div>
    </div>
    <div class="logout-container">
      <LogOut />
    </div>
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
  align-items: center;
}

.about {
  flex: 1; 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-height: 70%;
}

.img {
  width: 40%; 
  height: auto;
  margin-right: 2rem;
}

.text-content {
  max-width: 60%;
  background-color: #dbf2fd;
  padding: 1rem;
  overflow: hidden; /* Prevents content from overflowing */
  box-sizing: border-box; /* Includes padding in width calculation */
  max-height: 45vh;
}

.text-content h1 {
  font-size: 1.45rem; /* More responsive font size */
  color: #333;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.text-content p {
  color:  #4b4a4a;
  font-size: 1.05rem; /* More appropriate text size */
  line-height: 1.75;
  text-align: justify;
  margin-left: 2rem;
  margin-right: 2rem;
}

.logout-container {
  width: 100%;
  text-align: center; 
  padding: 1rem 0; 
}

.features-list {
  display: flex;
  justify-content: space-around; /* This will space out the feature blocks equally */
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  background-color: white;
  width: 80%; /* Sets the width to be the full width of the viewport */
  box-sizing: border-box; /* Ensures padding does not affect the total width */
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-basis: 200px; /* Base width for each feature, will shrink and grow as needed */
  max-width: 200px; /* Maximum width for each feature block */
}

.feature img {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
}

.feature h3 {
  font-size: 1.2rem; /* Slightly larger heading */
  color: #333;
  margin-bottom: 0.5rem;
}

.feature p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem; /* Add space below the paragraph */
}

</style>
