import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home";
import SinglePage from "../components/SinglePage";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/:catchAll(.*)",
    name: "SinglePage",
    component: SinglePage
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;