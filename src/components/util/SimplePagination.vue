<template>
    <div class="pagination">
        <button @click="previousPage"
                :disabled="currentPage === 1"
                :class="{'button-disabled': currentPage === 1, 'button-active': currentPage !== 1}">&lt;&lt;
        </button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage"
                :disabled="currentPage * itemsPerPage >= totalPages"
                :class="{'button-disabled': currentPage * itemsPerPage >= totalPages, 'button-active': currentPage * itemsPerPage < totalPages}">
            >>
        </button>
    </div>
</template>

<script>
export default {
    name: "SimplePagination",
    props: {
        currentPage: {
            type: Number,
            required: true,
        },
        totalPages: {
            type: Number,
            required: true,
        },
        itemsPerPage: {
            type: Number,
            required: true,
        },
    },
    methods: {
        previousPage() {
            if (this.currentPage > 1) {
                this.$emit('page-change', (Number)(this.currentPage) - 1);
            }
        },
        nextPage() {
            if (this.currentPage * this.itemsPerPage < this.totalPages) {
                this.$emit('page-change', (Number)(this.currentPage) + 1);
            }
        },
    },
}
</script>

<style scoped>
.pagination {
    text-align: center;
    vertical-align: center;
    margin-bottom: 20px;
}

.pagination span {
    font-size: 20px;
    margin: 10px 20px 0 20px;
}

.button-active {
    background-color: rgba(0, 85, 144, 0.69);
    cursor: pointer;
}

.button-disabled {
    background-color: rgba(52, 58, 63, 0.3);
    cursor: auto;
}

.pagination button {
    font-size: 15px;
    width: 50px;
    height: 35px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
}

.button-active:hover {
    border-color: rgba(255, 255, 255, 0.27);
}
</style>