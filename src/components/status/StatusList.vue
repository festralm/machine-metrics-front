<template>
    <div class="countries-list">
        <h1>Список статус</h1>
        <ul>
            <div v-if="statusList.length > 0">
                <li v-for="status in statusList" :key="status.id">
                    <span>{{ status.name }}</span>
                    <button v-if="canDelete()" @click="deleteStatus(status.id)">Удалить</button>
                </li>
            </div>
            <div v-else>
                <p>Нет доступных статусов</p>
            </div>
        </ul>
        <button @click="showOrCloseModal(true)">Добавить статус</button>
        <StatusCreateModal v-if="showModal" @close="showOrCloseModal(false)"
                            @save="createStatus"></StatusCreateModal>
    </div>
</template>

<script>
import StatusCreateModal from '@/components/status/StatusCreateModal.vue';
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "StatusList",
    components: {
        StatusCreateModal
    },
    data() {
        return {
            showModal: false,
        }
    },
    computed: {
        statusList() {
            return this.getStatusList();
        },
        role() {
            return this.getRole();
        },
    },
    created() {
        this.fetchStatusList();
    },
    methods: {
        ...mapActions('status', ['fetchStatusList', 'deleteStatus', 'saveStatus']),
        ...mapGetters('status', ['getStatusList']),
        ...mapGetters('auth', ['getRole']),
        async createStatus(name) {
            const statusData = {
                name: name,
            }
            const response = await this.saveStatus(statusData)
            if (response.ok) {
                this.showOrCloseModal(false)

                this.$router.push({name: 'StatusList'})
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