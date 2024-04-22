<template>
  <div style="text-align: center" v-if="user">
    <NavBar/>
    <InventoryGrid/>
    <LogOut /> <br /><br />
    <FootBar />
  </div>
  
</template>

<script>
import NavBar from "@/components/TopNavigationBar.vue";
import LogOut from "@/components/LogOut.vue";
import FootBar from "@/components/FooterBar.vue";
import InventoryGrid from "@/components/InventoryGrid.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    InventoryGrid,
    NavBar,
    LogOut,
    FootBar,
  },
  data() {
    return {
      refreshComp: 0,
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

  methods: {
    change() {
      this.refreshComp += 1;
    },
  },
};
</script>

<style scoped>
.inventory-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(300px, 1fr)); /* Adjust the minmax values based on your design */
  grid-gap: 1rem; /* Adjust spacing between cards */
}
</style>
