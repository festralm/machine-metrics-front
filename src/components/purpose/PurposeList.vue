<template>
    <div class="countries-list">
        <h1 class="title">Список назначений</h1>
        <div class="create-div">
            <button class="create-button" @click="showOrCloseModal(true)">Добавить назначение</button>
        </div>
        <div v-if="purposeList.length > 0">
            <div class="equipment-item" v-for="purpose in purposeList" :key="purpose.id">
                <h2>{{ purpose.name }}</h2>
                <button class="delete-button" v-if="canDelete()" @click="deletePurpose(purpose.id)">Удалить</button>
            </div>
        </div>
        <div v-else>
            <p class="no-equipment">Нет доступных назначений</p>
        </div>
        <PurposeCreateModal v-if="showModal" @close="showOrCloseModal(false)"
                            @save="createPurpose"></PurposeCreateModal>
    </div>
</template>

<script>
import PurposeCreateModal from '@/components/purpose/PurposeCreateModal.vue';
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "PurposeList",
    components: {
        PurposeCreateModal
    },
    data() {
        return {
            showModal: false,
        }
    },
    computed: {
        purposeList() {
            return this.getPurposeList();
        },
        role() {
            return this.getRole();
        },
    },
    created() {
        this.fetchPurposeList();
    },
    methods: {
        ...mapActions('purpose', ['fetchPurposeList', 'deletePurpose', 'savePurpose']),
        ...mapGetters('purpose', ['getPurposeList']),
        ...mapGetters('auth', ['getRole']),
        async createPurpose(name) {
            const purposeData = {
                name: name,
            }
            const response = await this.savePurpose(purposeData)
            if (response.ok) {
                this.showOrCloseModal(false)

                this.$router.push({name: 'PurposeList'})
            }
        },
        showOrCloseModal(show) {
            this.showModal = show
        },
        canDelete() {
            return this.role === 'ADMIN'
        },
    }
}
</script>

<style scoped>
.countries-list {
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
    width: 200px;
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
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px 20px 20px 20px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.04);
}

.equipment-item h2 {
    font-size: 22px;
    color: #333;
    font-weight: bold;
    margin: 10px 20px 10px 20px;
}


.delete-button {
    background-color: rgba(144, 0, 0, 0.69);
    font-size: 15px;
    width: 100px;
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