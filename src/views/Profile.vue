<template> 
<div v-if="user" class = "profile">
  <div class = "navbar-container">
    <NavBar/>
  </div>
  <div class = "header">
    <h2> Profile </h2>
    <p> View profile details </p>
  </div>
  <div class = "content">
    <div class = "text-content">
    Name: {{ user.displayName }}
    <br/>
    Email: {{ user.email }}
    <br/>
    User ID: {{ user.uid }}
    <br/>
    Provider: {{ user.providerData?.[0].providerId }}
  </div>
    <img class="img" src="@/assets/profile.jpg">
  </div>
  </div>
  <LogOut />
  <FootBar />
</template>



<script>
import LogOut from "@/components/LogOut.vue";
import NavBar from "@/components/TopNavigationBar.vue";
import FootBar from "@/components/FooterBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: "Profile",
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
  },
};
</script>

<style scoped> 
.profile {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  width: 100%;
  align-items: center;
}


.header {
  background-color: #526c87;
  color: rgb(255, 255, 255);
  padding: 1rem;
  text-align: center;
  font-weight:lighter;
  border-radius: 8px;
  width: 99%;
  margin-top: -1px;
}

.header h2 {
  font-size: 1.4rem;
  margin-bottom: 2rem;
}

.header p {
  font-size: 1.2rem;
  color: rgb(249, 247, 247);
  font-weight:500;
}

.navbar-container {
  width: 100%;
}

.content {
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

.img {
  flex: 1;
  max-width: 50%; 
  max-height: 40vh;
}

.text-content {
  flex: 1;
  max-width: 50%;
  box-sizing: border-box; /* Includes padding in width calculation */
  font-size: 1.3rem;
  line-height: 1.5;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

</style>
