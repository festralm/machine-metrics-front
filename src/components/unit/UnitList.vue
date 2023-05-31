<template>
    <div class="countries-list">
        <h1 class="title">Список подразделений</h1>
        <div class="create-div">
            <button class="create-button" @click="showOrCloseModal(true)">Добавить подразделение</button>
        </div>
        <div v-if="unitList.length > 0">
            <div class="equipment-item" v-for="unit in unitList" :key="unit.id">
                <h2>{{ unit.name }}</h2>
                <button class="delete-button" v-if="canDelete()" @click="deleteUnit(unit.id)">Удалить</button>
            </div>
        </div>
        <div v-else>
            <p class="no-equipment">Нет доступных подразделений</p>
        </div>
        <UnitCreateModal v-if="showModal" @close="showOrCloseModal(false)"
                         @save="createUnit"></UnitCreateModal>
    </div>
</template>

<script>
import UnitCreateModal from '@/components/unit/UnitCreateModal.vue';
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "UnitList",
    components: {
        UnitCreateModal
    },
    data() {
        return {
            showModal: false,
        }
    },
    computed: {
        unitList() {
            return this.getUnitList();
        },
        role() {
            return this.getRole();
        },
    },
    created() {
        this.fetchUnitList();
    },
    methods: {
        ...mapActions('unit', ['fetchUnitList', 'deleteUnit', 'saveUnit']),
        ...mapGetters('unit', ['getUnitList']),
        ...mapGetters('auth', ['getRole']),
        async createUnit(unitData) {
            const response = await this.saveUnit(unitData)
            if (response.ok) {
                this.showOrCloseModal(false)

                this.$router.push({name: 'UnitList'})
            }
        },
        showOrCloseModal(show) {
            this.showModal = show
        },
        canDelete() {
            return this.role === 'ADMIN'
        },
    }
}
</script>

<style scoped>
.countries-list {
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

.create-div {
    margin: 30px 20px 0 0;
    display: flex;
    justify-content: flex-end;
}

.create-button {
    background-color: rgb(0, 85, 144);
    font-size: 15px;
    width: 240px;
    height: 35px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
}

.create-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}
.no-equipment {
    font-size: 30px;
}

.equipment-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px 20px 20px 20px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.04);
}

.equipment-item h2 {
    font-size: 22px;
    color: #333;
    font-weight: bold;
    margin: 10px 20px 10px 20px;
}


.delete-button {
    background-color: rgba(144, 0, 0, 0.69);
    font-size: 15px;
    width: 100px;
    height: 35px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
}

.delete-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}
</style>