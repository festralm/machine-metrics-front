<template>
    <div class="equipment-list">
        <h1 class="title">Список оборудования</h1>
        <input class="name-search" type="text" v-model="search.name" placeholder="Поиск по наименованию"
               @input="searchEquipments"/>
        <div v-if="canCreate()" class="create-div">
            <router-link :to="{ name: 'EquipmentCreate' }">
                <button class="create-button">Создать оборудование</button>
            </router-link>
        </div>
        <div v-if="equipmentPage && equipmentPage.numberOfElements > 0">
            <div v-for="equipment in equipmentPage.content" :key="equipment.id">
                <equipment-item :equipment="equipment" @delete="onDelete"/>
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
        ...mapActions('equipment', ['fetchEquipmentPage', 'searchEquipmentPage', 'deleteEquipment']),
        ...mapGetters('auth', ['getRole']),
        canCreate() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
        getEquipments: function () {
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
        async onDelete(id) {
            await this.deleteEquipment(id)
            this.getEquipments();
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
            if (this.currentPage !== 0) {
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

.name-search {
    margin-top: 20px;
    width: 90%;
    height: 30px;
    border-radius: 0;
    border-width: 1px;
    padding: 1px 5px 1px 5px;
}

.name-search:focus {
    outline: none;
}

.name-search::placeholder {
    font-size: 15px;
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
</style>