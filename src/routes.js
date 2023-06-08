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
import ResourceForbidden from "@/components/util/ResourceForbidden.vue";
import NotFound from "@/components/util/NotFound.vue";
import CountryList from "@/components/country/CountryList.vue";
import PurposeList from "@/components/purpose/PurposeList.vue";
import StatusList from "@/components/status/StatusList.vue";
import UnitList from "@/components/unit/UnitList.vue";
import AddressList from "@/components/address/AddressList.vue";
import UsageTypeList from "@/components/usage-type/UsageTypeList.vue";
import ScheduleList from "@/components/schedule/ScheduleList.vue";
import EquipmentStatistics from "@/components/statistics/EquipmentStatistics.vue";

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
        path: "/statistics",
        name: "EquipmentStatistics",
        component: EquipmentStatistics,
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
    {
        path: "/not-found",
        name: "NotFound",
        component: NotFound,
    },
    {
        path: "/forbidden",
        name: "ResourceForbidden",
        component: ResourceForbidden,
    },
    {
        path: "/country",
        name: "CountryList",
        component: CountryList,
    },
    {
        path: "/purpose",
        name: "PurposeList",
        component: PurposeList,
    },
    {
        path: "/status",
        name: "StatusList",
        component: StatusList,
    },
    {
        path: "/unit",
        name: "UnitList",
        component: UnitList,
    },
    {
        path: "/address",
        name: "AddressList",
        component: AddressList,
    },
    {
        path: "/usage-type",
        name: "UsageTypeList",
        component: UsageTypeList,
    },
    {
        path: "/schedule",
        name: "ScheduleList",
        component: ScheduleList,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
