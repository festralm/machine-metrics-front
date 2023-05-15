<template>
    <div class="modal">
        <div class="modal-content">
            <h2>Добавить подразделение</h2>
            <label for="name">Название:</label>
            <input type="text" v-model="unitData.name" id="name">
            <label for="unit">Подразделение</label>
            <select id="unit" v-model="unitData.parent">
                <option value=""></option>
                <option v-for="unit in units" :key="unit.id" :value="unit.id">{{
                    unit.name
                    }}
                </option>
            </select>
            <div class="modal-buttons">
                <button @click="saveUnit">Сохранить</button>
                <button @click="$emit('close')">Отмена</button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "UnitCreateModal",
    data() {
        return {
            unitData: {
                name: '',
                parent: null,
            }
        }
    },
    computed: {
        units() {
            return this.getUnitList();
        },
    },
    created() {
        this.fetchUnitList();
    },
    methods: {
        ...mapActions('unit', ['fetchUnitList']),
        ...mapGetters('unit', ['getUnitList']),
        saveUnit() {
            this.$emit('save', this.unitData);
            this.unitData = {
                name: '',
                parent: null,
            }
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