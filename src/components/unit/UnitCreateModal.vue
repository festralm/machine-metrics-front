<template>
    <div class="modal">
        <div class="modal-content">
            <p>Добавить подразделение</p>
            <table class="equipment-table">
                <tr class="name">
                    <td class="label"><label for="name">Название:</label></td>
                    <td class="value"><input type="text" v-model="unitData.name" id="name"></td>
                </tr>
                <tr class="name">
                    <td class="label"><label for="unit">Подразделение</label></td>
                    <td class="value">
                        <select id="unit" v-model="unitData.parent">
                            <option value=""></option>
                            <option v-for="unit in units" :key="unit.id" :value="unit.id">{{
                                    unit.name
                                }}
                            </option>
                        </select>
                    </td>
                </tr>
                <tr class="name">
                    <td class="label">
                        <button class="button" @click="saveUnit">Сохранить</button>
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
    background-color: #fefefe;
    padding: 20px;
    border-radius: 0.5rem;
}


p {
    font-size: 20px;
    padding-top: 0;
    margin-top: 10px;
}

.equipment-table input, .equipment-table select {
    width: 150px;
    height: 20px;
    border-radius: 0;
    border-width: 1px;
    outline: none;
    font-size: 15px;
}

.equipment-table select {
    width: 155px;
    height: 23px;
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