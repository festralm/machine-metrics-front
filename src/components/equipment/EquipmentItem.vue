<template>
    <div class="equipment-item" @click="goToDetails">
        <div class="block">
            <div class="block-item">
                <div class="left-block">
                    <div class="left-block-item" >
                        <img class="photo" :src="photoUrl" alt="Equipment Photo" v-if="photoUrl" @click.stop="">
                    </div>
                    <div class="left-block-item">
                        <button class="delete-button" v-if="canDelete()" @click.stop="deleteAndReload(equipment.id)">
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
            <div class="block-item">
                <table class="equipment-table">
                    <tr class="name">
                        <td class="label">Наименование оборудования:</td>
                        <td class="value">{{ equipment.name }}</td>
                    </tr>
                    <tr v-for="info in equipmentInfo" :key="info.label">
                        <td class="label">{{ info.label }}</td>
                        <td class="value">{{ info.value }}</td>
                    </tr>
                </table>
            </div>
        </div>
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
        }, equipmentInfo() {
            return [
                {label: 'Инвентарный номер:', value: this.equipment.inventoryNumber},
                {label: 'Место установки:', value: this.equipment.installationLocation},
                {label: 'Стоимость:', value: this.equipment.cost},
                {label: 'Источник приобретения:', value: this.equipment.acquisitionSource},
                {label: 'Подразделение:', value: this.equipment.unit ? this.equipment.unit.name:null},
                {
                    label: 'Лицо, ответственное за функционирование оборудования:',
                    value: this.equipment.responsiblePerson
                },
                {label: 'Статус оборудования:', value: this.equipment.status},
                {label: 'Дата поступления:', value: this.formatDate(this.equipment.deliveryDate)},
                {label: 'Дата последней операции:', value: this.formatDate(this.equipment.lastOperationDate)}
            ];
        }
    },
    methods: {
        ...mapGetters('auth', ['getRole']),
        ...mapActions('photo', ['fetchEquipmentPhoto']),
        ...mapGetters('photo', ['getEquipmentPhoto']),
        goToDetails() {
            this.$router.push({name: 'EquipmentDetails', params: {id: this.equipment.id}})
        },
        canDelete() {
            return this.role === 'ADMIN'
        },
        deleteAndReload(id) {
            this.$emit('delete', id)
        },
        formatDate(dateString) {
            if (!dateString) return ''
            const date = new Date(dateString)
            const day = date.getDate().toString().padStart(2, '0')
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const year = date.getFullYear()
            return `${day}.${month}.${year}`
        },
    },
}
</script>

<style scoped>

.block {
    display: flex;
}

.block-item:first-child {
    align-self: center;
    flex-grow: 1;
}

.block-item:last-child {
    width: 700px;
}

.left-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.photo {
    height: 220px;
    cursor: auto;
}

.equipment-item {
    background-color: rgba(0, 0, 0, 0.02);
    padding: 10px;
    margin: 50px 20px 30px 20px;
    cursor: pointer;
}

.equipment-item:first-child {
    margin-top: 30px;;
}
.equipment-item:hover {
    background-color: rgba(0, 0, 0, 0.04);
}

.equipment-table {
    width: 100%;
    border-collapse: collapse;
}

.equipment-table tr {
    font-size: 13px;
    border-bottom: 1px solid rgba(0, 85, 144, 0.69);
}

.equipment-table .name {
    font-size: 15px;
    border-bottom: 2px solid rgba(0, 85, 144, 0.69);
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

.delete-button {
    background-color: rgba(144, 0, 0, 0.69);
    font-size: 15px;
    width: 80px;
    height: 35px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
}

.delete-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}
</style>