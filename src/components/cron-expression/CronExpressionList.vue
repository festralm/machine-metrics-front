<template>
    <div class="cron-expressions-list">
        <h1>Список cron-выражений</h1>
        <ul>
            <div v-if="cronList.length > 0">
                <li v-for="cron in cronList" :key="cron.id">
                    <div class="info-group">
                        <label for="name">Название:</label>
                        <span id="name">{{ cron.name }}</span>
                    </div>
                    <div class="info-group">
                        <label for="cron">Cron:</label>
                        <span id="cron">{{ cron.id }}</span>
                    </div>
                    <div class="info-group">
                        <label for="order">Порядок:</label>
                        <span id="order">{{ cron.order }}</span>
                    </div>
                    <button @click="deleteCronExpression(cron.id)">Удалить</button>
                </li>
            </div>
            <div v-else>
                <p>Нет доступных cron-выражений</p>
            </div>
        </ul>
        <button @click="showOrCloseModal(true)">Добавить cron-выражение</button>
        <CronExpressionCreateModal v-if="showModal" @close="showOrCloseModal(false)"
                                   @save="createCron"></CronExpressionCreateModal>
    </div>
</template>

<script>
import CronExpressionCreateModal from '@/components/cron-expression/CronExpressionCreateModal.vue';
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "CronExpressionList",
    components: {
        CronExpressionCreateModal
    },
    data() {
        return {
            showModal: false,
        }
    },
    computed: {
        cronList() {
            return this.getCronList();
        },
    },
    created() {
        this.fetchCronExpressionsList();
    },
    methods: {
        ...mapActions('cronExpression', ['fetchCronExpressionsList', 'deleteCronExpression', 'saveCronExpression']),
        ...mapGetters('cronExpression', ['getCronList']),
        async createCron(name) {
            const cronData = {
                name: name,
            }
            const response = await this.saveCronExpression(cronData)
            if (response.ok) {
                this.showOrCloseModal(false)
                const locationHeader = response.headers.get('location')

                if (locationHeader) {
                    this.$router.push(locationHeader)
                } else {
                    console.warn('Could not find Location header in response:', response)
                }
            }
        },
        showOrCloseModal(show) {
            this.showModal = show
        },
    }
}
</script>

<style scoped>
.cron-expressions-list {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cron-expressions-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.cron-expressions-list li {
    margin: 0.5rem 0;
    font-size: 1.2rem;
    font-weight: bold;
}

.cron-expressions-list button {
    margin-left: 1rem;
}

.info-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
}

.info-group:last-of-type {
    border-bottom: none;
}
</style>