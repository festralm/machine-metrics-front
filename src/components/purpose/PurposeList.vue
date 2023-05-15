<template>
    <div class="countries-list">
        <h1>Список назначений</h1>
        <ul>
            <div v-if="purposeList.length > 0">
                <li v-for="purpose in purposeList" :key="purpose.id">
                    <span>{{ purpose.name }}</span>
                    <button v-if="canDelete()" @click="deletePurpose(purpose.id)">Удалить</button>
                </li>
            </div>
            <div v-else>
                <p>Нет доступных назначений</p>
            </div>
        </ul>
        <button @click="showOrCloseModal(true)">Добавить назначение</button>
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
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.countries-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.countries-list li {
    margin: 0.5rem 0;
    font-size: 1.2rem;
    font-weight: bold;
}

.countries-list button {
    margin-left: 1rem;
}
</style>