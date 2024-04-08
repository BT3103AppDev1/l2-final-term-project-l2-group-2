<template>
  <div>
    <div style="text-align: center" v-if="user">
      <NavBar />
    </div>
    <salestable />
    <salestablebad />
    <LogOut />
  </div>
</template>

<script>
import LogOut from "@/components/LogOut.vue";
import NavBar from "@/components/TopNavigationBar.vue";
import salestable from "@/components/SalesTable.vue";
import salestablebad from "@/components/SalesTablesBad.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "Profile",
  components: {
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
