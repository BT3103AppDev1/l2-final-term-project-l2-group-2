<script>
import Add from "@/components/Add.vue";
import LogOut from "@/components/LogOut.vue";
import NavBar from "@/components/TopNavigationBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "AddItem",
  components: {
    Add,
    LogOut,
    NavBar, 
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
    <Add @added="change" />
    <LogOut />
    <br /><br />
  </div>
</template>