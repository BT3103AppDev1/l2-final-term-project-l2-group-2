<template>
    <div class="stock-page">
        <div v-if="user" class="navbar-container">
            <NavBar />
        </div>
        <div class = "content-container">
            <lowstock />
        </div>
        <button id = "back" @click="back()"> Back to Analytics </button>
        <FootBar />
    </div>
  </template>
  
<script>
import lowstock from "@/components/LowStock.vue";
import NavBar from "@/components/TopNavigationBar.vue";
import FootBar from "@/components/FooterBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
  
export default {
  components: {
    NavBar,
    lowstock,
    FootBar,
  },
  methods: {
    back() {
        this.$router.push({ name: 'Analytics' });
    }
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
.stock-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.navbar-container {
  width: 100%; 
}



</style>
  