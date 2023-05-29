<template>
    <div class="modal">
       <p> {{photoUrl}}</p>
        <vue-cropper
            ref="cropper"
            :aspect-ratio="1"
            :src="photoUrl"
            alt="Source Image"
            preview=".preview"
        >
        </vue-cropper>
        <input type="button" value="Сохранить" @click="getCropBoxData">
    </div>
</template>

<script>
export default {
    name: "CronExpressionCreateModal",
    props: {
        photoUrl: String,
    },
    data() {
        return {
            croppedPhoto: null,
        }
    },
    methods: {
        getCropBoxData() {
            this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
                this.$emit('save', blob)
            });
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

button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #4caf50;
    color: #fff;
    cursor: pointer;
}

input[type="text"] {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    width: 100%;
    margin-bottom: 1rem;
}

</style>