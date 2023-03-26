import {createRouter, createWebHistory} from "vue-router";
import EquipmentList from "./components/equipment/EquipmentList.vue";
import EquipmentCreate from "./components/equipment/EquipmentCreate.vue";

const routes = [
    {
        path: "/",
        name: "EquipmentList",
        component: EquipmentList,
    },
    {
        path: "/create",
        name: "EquipmentCreate",
        component: EquipmentCreate,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
