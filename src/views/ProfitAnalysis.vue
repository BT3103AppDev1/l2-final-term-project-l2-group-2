<template>
    <div class="profit-analysis-page">
        <div v-if="user" class="navbar-container">
            <NavBar />
        </div>
        <div class = "content-container">
            <salestable />
            <salestablebad />
        </div>
        <button id = "back" @click="back()"> Back to Analytics </button>
    </div>
  </template>
  
<script>
import salestable from "@/components/SalesTable.vue";
import salestablebad from "@/components/SalesTablesBad.vue";
import NavBar from "@/components/TopNavigationBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
  
export default {
  components: {
    NavBar,
    salestablebad,
    salestable,
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
.profit-analysis-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.navbar-container {
  width: 100%; 
}
</style>
  