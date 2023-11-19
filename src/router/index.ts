import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw, Router } from "vue-router";
import Components from '@/components/pages/components/Components.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/components",
    name: "components",
    component: Components,
    children: [
      {
        path: "notification",
        name: "notification",
        component: Notification,
      },
    ],
  },
];

const router: Router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;