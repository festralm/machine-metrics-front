import {createRouter, createWebHistory} from "vue-router";
import EquipmentList from "./components/equipment/EquipmentList.vue";
import EquipmentCreate from "./components/equipment/EquipmentCreate.vue";
import EquipmentDetails from "./components/equipment/EquipmentDetails.vue";
import EquipmentEdit from "./components/equipment/EquipmentEdit.vue";
import ServiceList from "./components/data-service/ServiceList.vue";
import CronExpressionList from "@/components/cron-expression/CronExpressionList.vue";

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
