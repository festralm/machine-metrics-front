<template>
    <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">&lt;&lt;</button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage * itemsPerPage >= totalPages">>></button>
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
            if (this.currentPage < this.totalPages) {
                this.$emit('page-change', (Number)(this.currentPage) + 1);
            }
        },
    },
}
</script>

<style scoped>

</style>