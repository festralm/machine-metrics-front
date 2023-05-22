<template>
    <div class="equipment-list">
        <h1 class="title">Оборудование</h1>
        <input type="text" v-model="search.name" placeholder="Поиск по наименованию" @input="searchEquipments"/>
        <div v-if="equipmentPage && equipmentPage.numberOfElements > 0">
            <div v-for="equipment in equipmentPage.content" :key="equipment.id">
                <equipment-item :equipment="equipment"/>
            </div>
            <SimplePagination
                    :current-page="currentPage"
                    :total-pages="equipmentPage.totalElements"
                    :items-per-page="itemsPerPage"
                    @page-change="handlePageChange"
            ></SimplePagination>
        </div>
        <div v-else>
            <p class="no-equipment">Нет доступного оборудования</p>
        </div>
        <div v-if="canCreate()">
            <router-link :to="{ name: 'EquipmentCreate' }">
                <button class="create-button">Создать оборудование</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import EquipmentItem from './EquipmentItem.vue';
import {RouterLink} from 'vue-router';
import {mapActions, mapGetters} from 'vuex'
import SimplePagination from '../util/SimplePagination.vue';

export default {
    name: "EquipmentList",
    components: {
        EquipmentItem,
        RouterLink,
        SimplePagination,
    },
    data() {
        return {
            search: {
                name: "",
            },
            currentPage: 1,
            itemsPerPage: 5,
        };
    },
    computed: {
        equipmentPage() {
            if (this.isSearching()) {
                return this.getEquipmentSearchList();
            }
            return this.getEquipmentPage();
        },
        role() {
            return this.getRole();
        },
    },
    created() {
        this.search.name = this.$route.query.name
        if (this.$route.query.page) {
            this.currentPage = this.$route.query.page
        }
        if (this.isSearching()) {
            this.searchWithData();
        } else {
            this.fetchWithData();
        }
    },
    methods: {
        ...mapGetters('equipment', ['getEquipmentPage', 'getEquipmentSearchList']),
        ...mapActions('equipment', ['fetchEquipmentPage', 'searchEquipmentPage']),
        ...mapGetters('auth', ['getRole']),
        canCreate() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
        handlePageChange(page) {
            this.currentPage = page;
            if (this.isSearching()) {
                this.searchWithData();
            } else {
                this.fetchWithData();
            }
        },
        searchWithData: function () {
            this.searchEquipmentPage({
                "name": this.search.name,
                "size": this.itemsPerPage,
                "page": this.currentPage,
            });
            this.$router.push({
                name: "EquipmentList",
                query: {
                    name: this.search.name,
                    page: this.currentPage
                },
            });
        },
        fetchWithData: function () {
            this.fetchEquipmentPage({
                "size": this.itemsPerPage,
                "page": this.currentPage,
            });
            if (this.currentPage !== 1) {
                this.$router.push({
                    name: "EquipmentList",
                    query: {
                        page: this.currentPage
                    },
                });
            }
        },
        searchEquipments() {
            this.searchWithData();
        },
        isSearching() {
            return !!this.search.name
        }
    },
}
</script>

<style scoped>
.equipment-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 5px;
}

.title {
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
    color: #4a4a4a;
    text-shadow: 1px 1px #eee;
}

.no-equipment {
    font-size: 24px;
    margin-top: 20px;
    text-align: center;
    color: #666;
}

.create-button {
    font-size: 18px;
    padding: 10px;
    background-color: #2f2f3e;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: fixed;
    top: 20px;
    right: 20px;
    margin-top: 10px;
    margin-right: 10px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
}

.create-button:hover {
    background-color: #0097a7;
}


</style>