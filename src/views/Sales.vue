<template>
  <div>
    <div style="text-align: center" v-if="user">
      <NavBar />
    </div>
    <salestable />
    <salestablebad />
    <lowstock />
    <highmovement />
    <lowmovement />
    <LogOut />
  </div>
</template>

<script>
import LogOut from "@/components/LogOut.vue";
import NavBar from "@/components/TopNavigationBar.vue";
import salestable from "@/components/SalesTable.vue";
import salestablebad from "@/components/SalesTablesBad.vue";
import lowmovement from "@/components/LowMovement.vue";
import highmovement from "@/components/HighMovement.vue";
import lowstock from "@/components/LowStock.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "Profile",
  components: {
    lowmovement,
    highmovement,
    lowstock,
    salestablebad,
    salestable,
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
};
</script>
