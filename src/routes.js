import {createRouter, createWebHistory} from "vue-router";
import EquipmentList from "./components/equipment/EquipmentList.vue";
import EquipmentCreate from "./components/equipment/EquipmentCreate.vue";
import EquipmentDetails from "./components/equipment/EquipmentDetails.vue";
import EquipmentEdit from "./components/equipment/EquipmentEdit.vue";

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
