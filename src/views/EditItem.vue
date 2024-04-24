<script>
import Edit from "@/components/Edit.vue";
import FootBar from "@/components/FooterBar.vue";
import LogOut from "@/components/LogOut.vue";
import NavBar from "@/components/TopNavigationBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "EditItem",
  components: {
    Edit,
    LogOut,
    NavBar, 
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

<template>
  <div style="text-align: center" v-if="user">
    <NavBar/>
    <Edit @editted="change" />
    <LogOut />
    <br /><br />
    <FootBar />
  </div>
</template>