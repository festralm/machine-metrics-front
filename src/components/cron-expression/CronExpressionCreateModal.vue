<template>
    <div class="modal">
        <div class="modal-content">
            <h2>Добавить cron-выражение</h2>
            <div>
                <label for="name">Выражение:</label>
                <input type="text" v-model="cron.expression" id="expression">
            </div>
            <div>
                <label for="name">Порядок:</label>
                <input type="text" v-model="cron.order" id="order">
            </div>
            <div>
                <label for="name">Название:</label>
                <input type="text" v-model="cron.name" id="name">
            </div>
            <div class="modal-buttons">
                <button @click="saveCron">Сохранить</button>
                <button @click="$emit('close')">Отмена</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CronExpressionCreateModal",
    props: {
        editingCron: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            cron: {
                expression: '',
                order: null,
                name: '',
            },
        }
    },
    created() {
        if (this.editingCron) {
            this.cron = {
                id: this.editingCron.id,
                expression: this.editingCron.expression,
                order: this.editingCron.order,
                name: this.editingCron.name,
            };
        } else {
            this.cron = {
                id: null,
                expression: '',
                order: null,
                name: '',
            };
        }
    },
    methods: {
        saveCron() {
            this.$emit('save', this.cron);
        },
    },
}
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
}

.modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #4caf50;
    color: #fff;
    cursor: pointer;
}

input[type="text"] {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    width: 100%;
    margin-bottom: 1rem;
}

</style>