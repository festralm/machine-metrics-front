<template>
    <div class="countries-list">
        <h1>Список типов использования</h1>
        <ul>
            <div v-if="usageTypeList.length > 0">
                <li v-for="usageType in usageTypeList" :key="usageType.id">
                    <span>{{ usageType.name }}</span>
                    <button v-if="canDelete()" @click="deleteUsageType(usageType.id)">Удалить</button>
                </li>
            </div>
            <div v-else>
                <p>Нет доступных типов использования</p>
            </div>
        </ul>
        <button @click="showOrCloseModal(true)">Добавить тип использования</button>
        <UsageTypeCreateModal v-if="showModal" @close="showOrCloseModal(false)"
                            @save="createUsageType"></UsageTypeCreateModal>
    </div>
</template>

<script>
import UsageTypeCreateModal from '@/components/usageType/UsageTypeCreateModal.vue';
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "UsageTypeList",
    components: {
        UsageTypeCreateModal
    },
    data() {
        return {
            showModal: false,
        }
    },
    computed: {
        usageTypeList() {
            return this.getUsageTypeList();
        },
        role() {
            return this.getRole();
        },
    },
    created() {
        this.fetchUsageTypeList();
    },
    methods: {
        ...mapActions('usageType', ['fetchUsageTypeList', 'deleteUsageType', 'saveUsageType']),
        ...mapGetters('usageType', ['getUsageTypeList']),
        ...mapGetters('auth', ['getRole']),
        async createUsageType(name) {
            const usageTypeData = {
                name: name,
            }
            const response = await this.saveUsageType(usageTypeData)
            if (response.ok) {
                this.showOrCloseModal(false)

                this.$router.push({name: 'UsageTypeList'})
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