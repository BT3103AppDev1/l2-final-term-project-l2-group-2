<template>
    <div class="movement-page">
        <div v-if="user" class="navbar-container">
            <NavBar />
        </div>
        <div class = "content-container">
            <highmovement />
            <lowmovement />
        </div>
    </div>
  </template>
  
<script>
import lowmovement from "@/components/LowMovement.vue";
import highmovement from "@/components/HighMovement.vue";
import NavBar from "@/components/TopNavigationBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
  
export default {
  components: {
    NavBar,
    lowmovement,
    highmovement,
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
};  
</script>
  
<style scoped>
.movement-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.navbar-container {
  width: 100%; 
}
</style>
  