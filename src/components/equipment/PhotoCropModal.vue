<template>
    <div class="modal">
        <div class="modal-content">
            <p>Выберите область</p>
            <vue-cropper
                    ref="cropper"
                    :aspect-ratio="1"
                    :src="photoUrl"
                    alt="Source Image"
                    preview=".preview"
                    :rotatable="false"
                    :scalable="false"
                    :zoomable="false"
                    :minCropBoxWidth="200"
                    :minCropBoxHeight="200"
                    :img-style="{ height: '400px' }"
                    :background="false"
            >
            </vue-cropper>
            <input class="save-button" type="button" value="Сохранить" @click="getCropBoxData">
            <input class="cancel-button"  type="button" value="Отмена" @click="$emit('cancel')">
        </div>
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
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 10px 20px 0 20px;
    width: 80%;
    max-width: 400px;
    height: 510px;
    border-radius: 0.5rem;
}

.save-button {
    margin-top: 10px;
    margin-right: 10px;
    background-color: rgb(0, 85, 144);
    font-size: 15px;
    width: 190px;
    height: 35px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
}

.save-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}

.cancel-button {
    margin-top: 10px;
    background-color: rgb(144, 0, 0);
    font-size: 15px;
    width: 190px;
    height: 35px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
}

.cancel-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}

p {
    font-size: 20px;
    padding-top: 0;
    margin-top: 5px;
}

</style>