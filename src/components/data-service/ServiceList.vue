<template>
    <div class="services-list">
        <h1>Список сервисов</h1>
        <ul>
            <div v-if="serviceList.length > 0">
                <li v-for="service in serviceList" :key="service.id">
                    <span>{{ service.name }}</span>
                    <button @click="deleteService(service.id)">Удалить</button>
                </li>
            </div>
            <div v-else>
                <p>Нет доступных сервисов</p>
            </div>
        </ul>
        <button @click="showOrCloseModal(true)">Добавить оборудование</button>
        <ServiceCreate v-if="showModal" @close="showOrCloseModal(false)" @save="saveService"></ServiceCreate>
    </div>
</template>

<script>
import DataServiceStore from "@/store/data-service";
import dataServiceStore from "@/store/data-service";
import ServiceCreate from '@/components/data-service/ServiceCreate.vue';

export default {
    name: "ServiceList",
    components: {
        ServiceCreate
    },
    data() {
        return {
            showModal: false,
        }
    },
    computed: {
        serviceList() {
            return this.$store.getters.getServiceList;
        },
    },
    created() {
        this.$store.dispatch("fetchServiceList");
    },
    methods: {
        async deleteService(id) {
            try {
                await DataServiceStore.dispatch('deleteService', id);
            } catch (error) {
                console.error(error);
            }
        },
        async saveService(name) {
            const serviceData = {
                name: name,
            }
            try {
                const response = await dataServiceStore.dispatch('saveService', serviceData)
                this.showOrCloseModal(false)
                const locationHeader = response.headers.get('location')

                if (locationHeader) {
                    this.$router.push(locationHeader)
                } else {
                    console.warn('Could not find Location header in response:', response)
                }

            } catch (error) {
                console.error(error)
            }
        },
        showOrCloseModal(show) {
            this.showModal = show
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