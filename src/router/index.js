import { createRouter, createWebHistory } from "vue-router";
import Inventory from "@/views/Inventory.vue";
import AddItem from "@/views/AddItem.vue";
import About from "@/views/About.vue";
import Login from "@/components/Login.vue";
import LogOut from "@/components/LogOut.vue";
import NotFound from "@/views/NotFound.vue";
import Profile from "@/views/Profile.vue";
import Sales from "@/views/Sales.vue";
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: LogOut,
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: Inventory,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/sales",
    name: "Sales",
    component: Sales,
  },
  {
    path: "/addItem",
    name: "AddItem",
    component: AddItem,
  },

  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
