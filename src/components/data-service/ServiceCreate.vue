<template>
    <div class="modal">
        <div class="modal-content">
            <h2>Добавить оборудование</h2>
            <label for="name">Название:</label>
            <input type="text" v-model="name" id="name">
            <div class="modal-buttons">
                <button @click="saveService">Сохранить</button>
                <button @click="$emit('close')">Отмена</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ServiceCreate",
    data() {
        return {
            name: '',
        }
    },
    methods: {
        saveService() {
            this.$emit('save', this.name);
            this.name = '';
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