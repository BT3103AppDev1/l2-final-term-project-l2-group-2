import { createRouter, createWebHistory } from "vue-router";
import Inventory from "@/views/Inventory.vue";
import AddItem from "@/views/AddItem.vue";
import EditItem from "@/views/EditItem.vue";
import About from "@/views/About.vue";
import Login from "@/components/Login.vue";
import LogOut from "@/components/LogOut.vue";
import NotFound from "@/views/NotFound.vue";
import Profile from "@/views/Profile.vue";
import Analytics from "@/views/Analytics.vue";
import ProfitAnalysis from "@/views/ProfitAnalysis.vue";
import Stock from "@/views/Stock.vue";
import Movement from "@/views/Movement.vue";

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
    path: "/addItem",
    name: "AddItem",
    component: AddItem,
  },
  {
    path: "/editItem",
    name: "EditItem",
    component: EditItem,
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
  {
    path: "/analytics",
    name: "Analytics",
    component: Analytics,
  },
  {
    path: "/analytics-profit",
    name: "ProfitAnalysis",
    component: ProfitAnalysis,
  },
  {
    path: "/analytics-stock",
    name: "Stock",
    component: Stock,
  },
  {
    path: "/analytics-movement",
    name: "Movement",
    component: Movement,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
