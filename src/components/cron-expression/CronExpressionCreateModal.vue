<template>
    <div class="modal">
        <div class="modal-content">
            <p>Добавить cron-выражение</p>
            <table class="equipment-table">
                <tr class="name">
                    <td class="label"><label for="name">Выражение:</label></td>
                    <td class="value"><input type="text" v-model="cron.expression" id="expression"></td>
                </tr>
                <tr class="name">
                    <td class="label"><label for="name">Порядок:</label></td>
                    <td class="value"><input type="text" v-model="cron.order" id="order"></td>
                </tr>
                <tr class="name">
                    <td class="label"><label for="name">Название:</label></td>
                    <td class="value"><input type="text" v-model="cron.name" id="name"></td>
                </tr>
                <tr class="name">
                    <td class="label">
                        <button class="button" @click="saveCron">Сохранить</button>
                    </td>
                    <td class="value">
                        <button class="button delete-button" @click="$emit('close')">Отмена</button>
                    </td>
                </tr>
            </table>
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
    background-color: #fefefe;
    padding: 20px;
    border-radius: 0.5rem;
}

p {
    font-size: 20px;
    padding-top: 0;
    margin-top: 10px;
}

.equipment-table input {
    width: 150px;
    height: 20px;
    border-radius: 0;
    border-width: 1px;
    outline: none;
    font-size: 15px;
}

.equipment-table tr {
    font-size: 15px;
    border-bottom: 1px solid #ccc;
}

.equipment-table td {
    width: 150px;
}

.button {
    background-color: rgba(0, 85, 144, 0.69);
    font-size: 15px;
    width: 120px;
    height: 30px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
}

.button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}

.delete-button {
    margin-left: 10px;
    background-color: rgba(144, 0, 0, 0.69);
}
</style>