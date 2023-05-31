<template>
    <div class="cron-expressions-list">
        <h1 class="title">Список cron-выражений</h1>
        <div class="create-div">
            <button class="create-button" @click="showOrCloseModal(true)">Добавить cron-выражение</button>
        </div>
        <div v-if="cronList.length > 0">
            <div class="equipment-item" v-for="cron in cronList" :key="cron.id">
                <table class="equipment-table">
                    <tr class="name">
                        <td class="label"><label for="name">Название:</label></td>
                        <td class="value">{{ cron.name }}</td>
                    </tr>
                    <tr class="name">
                        <td class="label"><label for="cron">Cron:</label></td>
                        <td class="value">{{ cron.expression }}</td>
                    </tr>
                    <tr class="name">
                        <td class="label"><label for="order">Порядок:</label></td>
                        <td class="value">{{ cron.order }}</td>
                    </tr>
                </table>
                <div class="buttons">
                    <button class="edit-button" @click="showOrCloseModal(true, cron.id)">Редактировать</button>
                    <button class="delete-button edit-button " v-if="canDelete()"
                            @click="deleteCronExpression(cron.id)">
                        Удалить
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="no-equipment">Нет доступных cron-выражений</p>
        </div>
        <CronExpressionCreateModal v-if="showModal" :editingCron="editingCron" @close="showOrCloseModal(false)"
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
            editingCron: null,
        }
    },
    computed: {
        cronList() {
            return this.getCronList();
        },
        role() {
            return this.getRole();
        },
    },
    created() {
        this.fetchCronExpressionsList();
    },
    methods: {
        ...mapActions('cronExpression', ['fetchCronExpressionsList', 'deleteCronExpression', 'saveCronExpression']),
        ...mapGetters('cronExpression', ['getCronList']),
        ...mapGetters('auth', ['getRole']),
        async createCron(cronData) {
            const response = await this.saveCronExpression(cronData)
            if (response.ok) {
                this.showOrCloseModal(false)
                this.$router.push({name: 'CronExpressionList'})
            }
        },
        showOrCloseModal(show, id) {
            this.showModal = show
            if (id) {
                this.editingCron = this.cronList.filter(x => x.id === id)[0]
            } else {
                this.editingCron = null
            }
        },
        canDelete() {
            return this.role === 'ADMIN'
        },
    }
}
</script>

<style scoped>
.cron-expressions-list {
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
    width: 250px;
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
    align-items: center;
    margin: 20px 20px 20px 20px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.04);
    flex-direction: column;
    justify-content: center;
}


.edit-button {
    background-color: rgba(0, 85, 144, 0.69);
    font-size: 15px;
    width: 150px;
    height: 35px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
}

.edit-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}

.delete-button {
    background-color: rgba(144, 0, 0, 0.69);
    width: 100px;
    margin-left: 10px;
}
.buttons {
    margin-top: 10px;
}

.equipment-table {
    width: 100%;
    border-collapse: collapse;
}

.equipment-table tr {
    font-size: 15px;
    border-bottom: 1px solid rgba(0, 85, 144, 0.69);
}

.equipment-table td {
    padding: 5px;
    width: auto;
}

.equipment-table .label {
    font-weight: bold;
    text-align: right;
    padding-right: 30px;
    width: 350px;
}

.equipment-table .value {
    padding-left: 0;
    text-align: left;
    width: 250px;
}

</style>