<template>
    <div class="equipment-item" @click="goToDetails">
        <img class="photo" :src="photoUrl" alt="Equipment Photo" v-if="photoUrl">
        <div>
            <div class="info-group">
                <label>Инвентарный номер:</label>
                <span>{{ equipment.inventoryNumber }}</span>
            </div>
            <div class="info-group">
                <label>Наименование оборудования:</label>
                <span>{{ equipment.name }}</span>
            </div>
            <div class="info-group">
                <label>Место установки:</label>
                <span>{{ equipment.installationLocation }}</span>
            </div>
            <div class="info-group">
                <label>Стоимость:</label>
                <span>{{ equipment.cost }}</span>
            </div>
            <div class="info-group">
                <label>Источник приобретения:</label>
                <span>{{ equipment.acquisitionSource }}</span>
            </div>
            <div class="info-group">
                <label>Подразделение:</label>
                <span>{{ equipment.unit }}</span>
            </div>
            <div class="info-group">
                <label>Лицо, ответственное за функционирование оборудования:</label>
                <span>{{ equipment.responsiblePerson }}</span>
            </div>
            <div class="info-group">
                <label>Статус оборудования:</label>
                <span>{{ equipment.status }}</span>
            </div>
            <div class="info-group">
                <label>Дата поступления:</label>
                <span>{{ equipment.deliveryDate }}</span>
            </div>
            <div class="info-group">
                <label>Дата последней операции:</label>
                <span>{{ equipment.lastOperationDate }}</span>
            </div>
        </div>
        <button v-if="canDelete()" @click.stop="deleteEquipment(equipment.id)">Удалить</button>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "EquipmentItem",
    props: {
        equipment: {
            type: Object,
            required: true,
        },
    },
    created() {
        this.fetchEquipmentPhoto({id: this.equipment.id, path: this.equipment.photoPath});
    },
    computed: {
        role() {
            return this.getRole();
        },
        photoUrl() {
            return this.getEquipmentPhoto()(this.equipment.id);
        },
    },
    methods: {
        ...mapActions('equipment', ['deleteEquipment']),
        ...mapGetters('auth', ['getRole']),
        ...mapActions('photo', ['fetchEquipmentPhoto']),
        ...mapGetters('photo', ['getEquipmentPhoto']),
        goToDetails() {
            this.$router.push({name: 'EquipmentDetails', params: {id: this.equipment.id}})
        },
        canDelete() {
            return this.role === 'ADMIN'
        },
    },
}
</script>

<style scoped>
.equipment-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
}

.equipment-item:hover {
    background-color: #f5f5f5;
}

.equipment-item h2 {
    text-align: left;
    font-size: 1.5em;
    margin-bottom: 10px;
    color: #333;
    font-weight: bold;
}

.info-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
}

.info-group label {
    font-size: 18px;
    margin-right: 10px;
    color: #444;
}

.info-group span {
    font-size: 16px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #f5f5f5;
    color: #333;
}

.equipment-item button {
    background-color: #f44336;
    color: white;
    padding: 8px 16px;
    font-size: 1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.equipment-item button:hover {
    background-color: #b71c1c;
}

.equipment-item button:focus {
    outline: none;
}

.equipment-item button:active {
    background-color: #ba000d;
}

.photo {
    width: 200px;
    height: 200px;
}
</style>