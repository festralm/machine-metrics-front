import {createRouter, createWebHistory} from "vue-router";
import EquipmentList from "./components/equipment/EquipmentList.vue";
import EquipmentCreate from "./components/equipment/EquipmentCreate.vue";
import EquipmentDetails from "./components/equipment/EquipmentDetails.vue";
import EquipmentEdit from "./components/equipment/EquipmentEdit.vue";
import ServiceList from "./components/data-service/ServiceList.vue";
import CronExpressionList from "@/components/cron-expression/CronExpressionList.vue";
import UserList from "@/components/user/UserList.vue";
import UserCreate from "@/components/user/UserCreate.vue";
import UserDetails from "./components/user/UserDetails.vue";
import UserEdit from "./components/user/UserEdit.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: EquipmentList,
    },
    {
        path: "/",
        name: "EquipmentList",
        component: EquipmentList,
    },
    {
        path: "/data-service",
        name: "ServiceList",
        component: ServiceList,
    },
    {
        path: "/cron",
        name: "CronExpressionList",
        component: CronExpressionList,
    },
    {
        path: "/create",
        name: "EquipmentCreate",
        component: EquipmentCreate,
    },
    {
        path: "/edit/:id",
        name: "EquipmentEdit",
        component: EquipmentEdit,
    },
    {
        path: "/equipment/:id",
        name: "EquipmentDetails",
        component: EquipmentDetails,
    },
    {
        path: "/user",
        name: "UserList",
        component: UserList,
    },
    {
        path: "/user/create",
        name: "UserCreate",
        component: UserCreate,
    },
    {
        path: "/user/edit/:id",
        name: "UserEdit",
        component: UserEdit,
    },
    {
        path: "/user/:id",
        name: "UserDetails",
        component: UserDetails,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
