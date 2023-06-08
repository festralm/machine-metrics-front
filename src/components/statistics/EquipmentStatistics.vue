<template>
    <div class="my-chart">
        <h1 class="title">Статистика оборудования</h1>
        <div class="filters">
            <tr class="name">
                <td class="label"><label for="unit">Подразделение</label></td>
                <td class="value">
                    <select id="unit" v-model="selectedUnit" @change="onUnitChange()">
                        <option value=""></option>
                        <option v-for="unit in units" :key="unit.id" :value="unit.id">{{
                            unit.name
                            }}
                        </option>
                    </select>
                </td>
            </tr>
            <tr class="name">
                <td class="label"><label for="unit">Оборудование</label></td>
                <td class="value">
                    <select id="unit" v-model="selectedEquipment" @change="onEquipmentsChange()">
                        <option value=""></option>
                        <option v-for="equipment in equipments" :key="equipment.id" :value="equipment.id">{{
                            equipment.name
                            }}
                        </option>
                    </select>
                </td>
            </tr>
        </div>
        <div v-if="selectedUnit">
            <EquipmentDataChart :key="componentKey" :equipmentIds="equipmentIds"/>
        </div>
        <div v-else class="choose-unit">
            Выберите подразделение
        </div>
    </div>
</template>

<script>
import EquipmentDataChart from "@/components/chart/EquipmentDataChart.vue";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "EquipmentStatistics",
    components: {EquipmentDataChart},
    data() {
        return {
            selectedUnit: null,
            equipmentIds: [],
            selectedEquipment: null,
            componentKey: 0,
        }
    },
    computed: {
        units() {
            return this.getUnitList();
        },
        equipments() {
            if (this.selectedUnit) {
                return this.getEquipmentSearchList()
            }
            return []
        }
    },
    async created() {
        await this.fetchUnitList();
        const unitId = this.$route.query.unitId;
        if (unitId) {
            this.selectedUnit = unitId
            this.searchEquipmentList({"unit": this.selectedUnit})
        }
        const ids = this.$route.query.ids;
        if (ids) {
            this.equipmentIds = ids;
            this.componentKey++;
        } else {
            this.equipmentIds = this.equipments.map(x => x.id);
            this.componentKey++;
        }
        const equipment = this.$route.query.equipment;
        if (equipment) {
            this.selectedEquipment = equipment
        }
    },
    methods: {
        ...mapActions('unit', ['fetchUnitList']),
        ...mapGetters('unit', ['getUnitList']),
        ...mapGetters('equipment', ['getEquipmentSearchList']),
        ...mapActions('equipment', ['searchEquipmentList']),
        async onUnitChange() {
            this.selectedEquipment = null
            if (!this.selectedUnit) {
                this.equipmentIds = [];
                this.componentKey++;
                let query = this.$route.query;
                this.$router.push({
                    name: "EquipmentStatistics",
                    query: {...query, unitId: null, ids:null, equipment: null},
                });
            } else {
                await this.searchEquipmentList({"unit": this.selectedUnit})
                this.equipmentIds = this.equipments.map(x => x.id);
                this.componentKey++;
                let query = this.$route.query;
                this.$router.push({
                    name: "EquipmentStatistics",
                    query: {...query, unitId: this.selectedUnit, ids: this.equipmentIds},
                });
            }
        },
        async onEquipmentsChange() {
            if (this.selectedEquipment) {
                this.equipmentIds = [this.selectedEquipment];
                this.componentKey++;
                let query = this.$route.query;
                this.$router.push({
                    name: "EquipmentStatistics",
                    query: {...query, ids: this.equipmentIds, equipment: this.selectedEquipment},
                });
            } else {
                await this.searchEquipmentList({"unit": this.selectedUnit})
                this.equipmentIds = this.equipments.map(x => x.id);
                this.componentKey++;
                let query = this.$route.query;
                this.$router.push({
                    name: "EquipmentStatistics",
                    query: {...query, unitId: this.selectedUnit, ids: this.equipmentIds, equipment: null},
                });
            }
        }
    },
}
</script>

<style scoped>

.my-chart {
    width: 85%;
    background-color: white;
    flex: 1;
}

.title {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    margin: 0;
    padding: 20px 0 20px 0;
    color: white;
}

.filters {
    margin: 20px 50px 30px 50px;
    display: flex;
    flex-direction: row;
}

.filters select {
    width: 300px;
    height: 20px;
    border-radius: 0;
    border-width: 1px;
    outline: none;
    font-size: 15px;
    margin-right: 50px;
}

.filters td {
    width: 300px;
}

.choose-unit {
    font-size: 30px;
}
</style>