<template>
    <div class="countries-list">
        <h1>Список подразделений</h1>
        <ul>
            <div v-if="unitList.length > 0">
                <li v-for="unit in unitList" :key="unit.id">
                    <span>{{ unit.name }}</span>
                    <button v-if="canDelete()" @click="deleteUnit(unit.id)">Удалить</button>
                </li>
            </div>
            <div v-else>
                <p>Нет доступных подразделений</p>
            </div>
        </ul>
        <button @click="showOrCloseModal(true)">Добавить подразделение</button>
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
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.countries-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.countries-list li {
    margin: 0.5rem 0;
    font-size: 1.2rem;
    font-weight: bold;
}

.countries-list button {
    margin-left: 1rem;
}
</style>