<template>
    <div class="countries-list">
        <h1>Список стран</h1>
        <ul>
            <div v-if="countryList.length > 0">
                <li v-for="country in countryList" :key="country.id">
                    <span>{{ country.name }}</span>
                    <button v-if="canDelete()" @click="deleteCountry(country.id)">Удалить</button>
                </li>
            </div>
            <div v-else>
                <p>Нет доступных стран</p>
            </div>
        </ul>
        <button @click="showOrCloseModal(true)">Добавить страну</button>
        <CountryCreateModal v-if="showModal" @close="showOrCloseModal(false)"
                            @save="createCountry"></CountryCreateModal>
    </div>
</template>

<script>
import CountryCreateModal from '@/components/country/CountryCreateModal.vue';
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "CountryList",
    components: {
        CountryCreateModal
    },
    data() {
        return {
            showModal: false,
        }
    },
    computed: {
        countryList() {
            return this.getCountryList();
        },
        role() {
            return this.getRole();
        },
    },
    created() {
        this.fetchCountryList();
    },
    methods: {
        ...mapActions('country', ['fetchCountryList', 'deleteCountry', 'saveCountry']),
        ...mapGetters('country', ['getCountryList']),
        ...mapGetters('auth', ['getRole']),
        async createCountry(name) {
            const countryData = {
                name: name,
            }
            const response = await this.saveCountry(countryData)
            if (response.ok) {
                this.showOrCloseModal(false)

                this.$router.push({name: 'CountryList'})
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