<template>
    <div class="services-list">
        <h1>Список сервисов</h1>
        <ul>
            <div v-if="serviceList.length > 0">
                <li v-for="service in serviceList" :key="service.id">
                    <span>{{ service.name }}</span>
                    <button v-if="canDelete()" @click="deleteService(service.id)">Удалить</button>
                </li>
            </div>
            <div v-else>
                <p>Нет доступных сервисов</p>
            </div>
        </ul>
        <button @click="showOrCloseModal(true)">Добавить сервис</button>
        <ServiceCreateModal v-if="showModal" @close="showOrCloseModal(false)"
                            @save="createService"></ServiceCreateModal>
    </div>
</template>

<script>
import ServiceCreateModal from '@/components/data-service/ServiceCreateModal.vue';
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "ServiceList",
    components: {
        ServiceCreateModal
    },
    data() {
        return {
            showModal: false,
        }
    },
    computed: {
        serviceList() {
            return this.getServiceList();
        },
        role() {
            return this.getRole();
        },
    },
    created() {
        this.fetchServiceList();
    },
    methods: {
        ...mapActions('dataService', ['fetchServiceList', 'deleteService', 'saveService']),
        ...mapGetters('dataService', ['getServiceList']),
        ...mapGetters('auth', ['getRole']),
        async createService(name) {
            const serviceData = {
                name: name,
            }
            const response = await this.saveService(serviceData)
            if (response.ok) {
                this.showOrCloseModal(false)

                this.$router.push({name: 'ServiceList'})
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
.services-list {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.services-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.services-list li {
    margin: 0.5rem 0;
    font-size: 1.2rem;
    font-weight: bold;
}

.services-list button {
    margin-left: 1rem;
}
</style>