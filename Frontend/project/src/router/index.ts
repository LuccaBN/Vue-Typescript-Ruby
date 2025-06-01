import LoginPage from "@/pages/LoginPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import Transferencia from "@/pages/TransferenciaPage.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/",
    redirect: "/login",
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/transferencia",
    name: "Transferencia",
    component: Transferencia,
  },
  {
    path: "/extrato",
    name: "ExtratoPage",
    component: () => import("@/pages/ExtratoPage.vue"),
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    component: () => import("@/views/CadastroView.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
