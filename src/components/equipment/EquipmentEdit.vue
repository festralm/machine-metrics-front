<template>
    <div class="equipment-edit" v-if="formData">
        <h1 class="title">Изменить оборудование</h1>
        <form @submit.prevent="updateEquipment">
            <div class="form-group">
                <img class="photo" :src="photoUrl" alt="Equipment Photo" v-if="photoUrl">
                <input id="photo" type="file" ref="photoInput" accept="image/*" @change="onPhotoChange()"/>
                <input v-if="formData.photoPath" id="photo-delete" type="button" @click="clearPhoto()" value="Удалить фото"/>
            </div>
            <div class="form-group">
                <label for="name">Наименование оборудования*</label>
                <input id="name" type="text" v-model="formData.name" required/>
            </div>
            <div class="form-group">
                <label for="inventory-number">Инвентарный номер*</label>
                <input id="inventory-number" type="text" v-model="formData.inventoryNumber" required/>
            </div>
            <div class="form-group">
                <label for="acquisitionSource">Источник приобретения*</label>
                <input id="acquisitionSource" type="text" v-model="formData.acquisitionSource" required/>
            </div>
            <div class="form-group">
                <label for="cost">Стоимость*</label>
                <input id="cost" type="number" step="0.01" v-model="formData.cost" required/>
            </div>
            <div class="form-group">
                <label for="residualCost">Начальная стоимость (балансовая стоимость)*</label>
                <input id="residualCost" type="number" step="0.01" v-model="formData.initialCost" required/>
            </div>
            <div class="form-group">
                <label for="residualCost">Остаточная стоимость*</label>
                <input id="residualCost" type="number" step="0.01" v-model="formData.residualCost" required/>
            </div>
            <div class="form-group">
                <label for="adName">Имя оборудования в AD*</label>
                <input id="adName" type="text" v-model="formData.adName" required/>
            </div>
            <div class="form-group">
                <label for="ipAddress">IP-адрес оборудования*</label>
                <input id="ipAddress" type="text" v-model="formData.ipAddress" required/>
            </div>
            <div class="form-group">
                <label for="kfu-development-program-application">Заявка программы развития КФУ</label>
                <div id="kfu-development-program-application"
                     v-for="(field, index) in formData.kfuDevelopmentProgramApplicationList"
                     :key="index">
                    <label>{{ field.label }}</label>
                    <input v-model="field.value"/>
                    <div @click="removeField(formData.kfuDevelopmentProgramApplicationList, index)">-</div>
                </div>
                <div @click="addField(formData.kfuDevelopmentProgramApplicationList)">+</div>
            </div>
            <div class="form-group">
                <label for="warranty-service-for-representatives-of-a-foreign-party">Гарантийное обслуживание
                    (оборудования) представителями иностранной стороны</label>
                <input id="warranty-service-for-representatives-of-a-foreign-party" type="checkbox"
                       v-model="formData.warrantyServiceForRepresentativesOfAForeignParty"/>
            </div>
            <div class="form-group">
                <label for="kfu-development-program-priority-direction">Приоритетное направление программы развития
                    КФУ</label>
                <div id="kfu-development-program-priority-direction"
                     v-for="(field, index) in formData.kfuDevelopmentProgramPriorityDirectionList" :key="index">
                    <label>{{ field.label }}</label>
                    <input v-model="field.value"/>
                    <div @click="removeField(formData.kfuDevelopmentProgramPriorityDirectionList, index)">-</div>
                </div>
                <div @click="addField(formData.kfuDevelopmentProgramPriorityDirectionList)">+</div>
            </div>
            <div class="form-group">
                <label for="russia-development-priority-direction">Приоритетное направление развития науки и техники
                    РФ</label>
                <div id="russia-development-priority-direction"
                     v-for="(field, index) in formData.russiaDevelopmentPriorityDirectionList" :key="index">
                    <label>{{ field.label }}</label>
                    <input v-model="field.value"/>
                    <div @click="removeField(formData.russiaDevelopmentPriorityDirectionList, index)">-</div>
                </div>
                <div @click="addField(formData.russiaDevelopmentPriorityDirectionList)">+</div>
            </div>
            <div class="form-group">
                <label for="area">Область применения</label>
                <input id="area" type="text" v-model="formData.area"/>
            </div>
            <div class="form-group">
                <label for="research-objects">Объекты исследования</label>
                <input id="research=objects" type="text" v-model="formData.researchObjects"/>
            </div>
            <div class="form-group">
                <label for="indicators">Определяемые показатели (величины, параметры)</label>
                <input id="indicators" type="text" v-model="formData.indicators"/>
            </div>
            <div class="form-group">
                <label for="additional-features">Дополнительные возможности</label>
                <input id="additional-features" type="text" v-model="formData.additionalFeatures"/>
            </div>
            <div class="form-group">
                <label for="purpose">Назначение</label>
                <select id="purpose" v-model="formData.purpose">
                    <option value=""></option>
                    <option v-for="purpose in purposes" :key="purpose.id" :value="purpose.id">{{
                        purpose.name
                        }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="usage-type">Тип использования</label>
                <select id="usage-type" v-model="formData.usageType">
                    <option value=""></option>
                    <option v-for="usageType in usageTypes" :key="usageType.id" :value="usageType.id">{{
                        usageType.name
                        }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="verification-required">Требуется поверка оборудования</label>
                <input id="verification-required" type="checkbox" v-model="formData.verificationRequired"/>
            </div>
            <div class="form-group">
                <label for="type">Тип оборудования</label>
                <input id="type" type="text" v-model="formData.type"/>
            </div>
            <div class="form-group">
                <label for="factory-number">Заводской номер</label>
                <input id="factory-number" type="text" v-model="formData.factoryNumber"/>
            </div>
            <div class="form-group">
                <label for="manufacturer-country">Страна-изготовитель</label>
                <select id="manufacturer-country" v-model="formData.manufacturerCountry">
                    <option value=""></option>
                    <option v-for="country in countries" :key="country.id" :value="country.id">{{
                        country.name
                        }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="manufacture-year">Год изготовления</label>
                <input id="manufacture-year" type="number" v-model="formData.manufactureYear"/>
            </div>
            <div class="form-group">
                <label for="manufacturer">Фирма-изготовитель</label>
                <input id="manufacturer" type="text" v-model="formData.manufacturer"/>
            </div>
            <div class="form-group">
                <label for="supplier">Фирма-поставщик</label>
                <input id="supplier" type="text" v-model="formData.supplier"/>
            </div>
            <div class="form-group">
                <label for="delivery-date">Дата поставки</label>
                <!--                @update:model-value="formData.deliveryDate"-->
                <VueDatePicker v-model="formData.deliveryDate" auto-apply
                               :enable-time-picker="false"></VueDatePicker>
            </div>
            <div class="form-group">
                <label for="commissioning-date">Дата ввода в эксплуатацию</label>
                <VueDatePicker v-model="formData.commissioningDate"
                               auto-apply
                               :enable-time-picker="false"></VueDatePicker>
            </div>
            <div class="form-group">
                <label for="brand">Марка</label>
                <input id="brand" type="text" v-model="formData.brand"/>
            </div>
            <div class="form-group">
                <label for="providing-services-to-third-parties-possibility">Возможность оказания услуг сторонним
                    организациям</label>
                <input id="providing-services-to-third-parties-possibility" type="checkbox"
                       v-model="formData.providingServicesToThirdPartiesPossibility"/>
            </div>
            <div class="form-group">
                <label for="collective-federal-center-use">Оборудование федерального центра коллективного
                    пользования</label>
                <input id="collective-federal-center-use" type="checkbox"
                       v-model="formData.collectiveFederalCenterUse"/>
            </div>
            <div class="form-group">
                <label for="unique">Уникальное оборудование</label>
                <input id="unique" type="checkbox" v-model="formData.unique"/>
            </div>
            <div class="form-group">
                <label for="collective-interdisciplinary-center-use">Междисциплинарный центр коллективного
                    пользования</label>
                <input id="collective-interdisciplinary-center-use" type="checkbox"
                       v-model="formData.collectiveInterdisciplinaryCenterUse"/>
            </div>
            <div class="form-group">
                <label for="portal-publication-card-readiness">Готовность карточки к публикации на портале</label>
                <input id="portal-publication-card-readiness" type="checkbox"
                       v-model="formData.portalPublicationCardReadiness"/>
            </div>
            <div class="form-group">
                <label for="installation-location">Место установки</label>
                <input id="installation-location" type="text" v-model="formData.installationLocation"/>
            </div>
            <div class="form-group">
                <label for="unit">Страна-изготовитель</label>
                <select id="unit" v-model="formData.unit">
                    <option value=""></option>
                    <option v-for="unit in units" :key="unit.id" :value="unit.id">{{
                        unit.name
                        }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="responsible-person">Лицо, ответственное за функционирование оборудования</label>
                <input id="responsible-person" type="text" v-model="formData.responsiblePerson"/>
            </div>
            <div class="form-group">
                <label for="status">Статус оборудования</label>
                <select id="status" v-model="formData.status">
                    <option value=""></option>
                    <option v-for="status in statuses" :key="status.id" :value="status.id">{{
                        status.name
                        }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <button class="save-button" type="submit">Сохранить</button>
            </div>
        </form>
    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
    name: "EquipmentEdit",
    data() {
        return {
            photo: null,
            uploadedPhotoUrl: null,
            formData: {
                id: this.$route.params.id,
                name: null,
                inventoryNumber: null,
                acquisitionSource: null,
                cost: null,
                initialCost: null,
                residualCost: null,
                adName: null,
                ipAddress: null,
                kfuDevelopmentProgramApplicationList: [],
                kfuDevelopmentProgramApplication: [],
                warrantyServiceForRepresentativesOfAForeignParty: false,
                kfuDevelopmentProgramPriorityDirectionList: [],
                kfuDevelopmentProgramPriorityDirection: [],
                russiaDevelopmentPriorityDirectionList: [],
                russiaDevelopmentPriorityDirection: [],
                area: null,
                researchObjects: null,
                indicators: null,
                additionalFeatures: null,
                purpose: null,
                usageType: null,
                verificationRequired: false,
                type: null,
                factoryNumber: null,
                manufacturerCountry: null,
                manufactureYear: null,
                manufacturer: null,
                supplier: null,
                deliveryDate: new Date(),
                commissioningDate: new Date(),
                brand: null,
                providingServicesToThirdPartiesPossibility: false,
                collectiveFederalCenterUse: false,
                unique: false,
                collectiveInterdisciplinaryCenterUse: false,
                portalPublicationCardReadiness: false,
                installationLocation: null,
                unit: null,
                responsiblePerson: null,
                status: null,
                photoPath: null,
            }
        }
    },
    computed: {
        currentEquipment() {
            return this.getCurrentEquipment() || {}
        },
        purposes() {
            return this.getPurposeList();
        },
        usageTypes() {
            return this.getUsageTypeList();
        },
        countries() {
            return this.getCountryList();
        },
        units() {
            return this.getUnitList();
        },
        statuses() {
            return this.getStatusList();
        },
        photoUrl() {
            if (this.photo) {
                return this.uploadedPhotoUrl
            }
            if (this.formData.photoPath) {
                return this.getEquipmentPhoto()(this.$route.params.id);
            }
            return null;
        },
    },
    created() {
        const equipmentId = this.$route.params.id;
        this.fetchEquipmentById(equipmentId);
        this.fetchPurposeList();
        this.fetchUsageTypeList();
        this.fetchCountryList();
        this.fetchUnitList();
        this.fetchStatusList();
        this.fetchEquipmentPhoto({id: equipmentId, path: this.formData.photoPath});
    },
    methods: {
        ...mapActions('equipment', ['saveEquipment', 'fetchEquipmentById']),
        ...mapGetters('equipment', ['getCurrentEquipment']),
        ...mapActions('purpose', ['fetchPurposeList']),
        ...mapGetters('purpose', ['getPurposeList']),
        ...mapActions('usageType', ['fetchUsageTypeList']),
        ...mapGetters('usageType', ['getUsageTypeList']),
        ...mapActions('country', ['fetchCountryList']),
        ...mapGetters('country', ['getCountryList']),
        ...mapActions('unit', ['fetchUnitList']),
        ...mapGetters('unit', ['getUnitList']),
        ...mapActions('status', ['fetchStatusList']),
        ...mapGetters('status', ['getStatusList']),
        ...mapActions('photo', ['fetchEquipmentPhoto']),
        ...mapGetters('photo', ['getEquipmentPhoto']),
        ...mapActions('photo', ['uploadPhoto']),
        async updateEquipment() {
            if (this.photo) {
                try {
                    await this.uploadPhoto(this.photo)
                } catch (error) {
                    console.log(error)
                    this.formData.photoPath = null
                }
            }
            this.formData.kfuDevelopmentProgramApplication = this.formData.kfuDevelopmentProgramApplicationList.map(x => x.value)
            this.formData.kfuDevelopmentProgramPriorityDirection = this.formData.kfuDevelopmentProgramPriorityDirectionList.map(x => x.value)
            this.formData.russiaDevelopmentPriorityDirection = this.formData.russiaDevelopmentPriorityDirectionList.map(x => x.value)
            this.formData.deliveryDate = this.formData.deliveryDate ? new Date(this.formData.deliveryDate).toISOString() : null;
            this.formData.commissioningDate = this.formData.commissioningDate ? new Date(this.formData.commissioningDate).toISOString() : null;
            this.saveEquipment(this.formData)
                .then((response) => {
                    this.$router.push({name: 'EquipmentDetails', params: {id: response.updatedEquipment.id}})
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        getLabelValuePair(list) {
            return !list ? [] : list.map(x => {
                return {
                    label: null,
                    value: x
                }
            })
        },
        addField(object) {
            object.push({label: '', value: ''});
        },
        removeField(object, index) {
            object.splice(index, 1);
        },
        onPhotoChange() {
            const photoFile = this.$refs.photoInput.files[0];

            if (photoFile) {
                const formData = new FormData();
                formData.append('name', photoFile.name);
                formData.append('photo', photoFile);

                this.photo = formData
                this.uploadedPhotoUrl = URL.createObjectURL(photoFile)
                this.formData.photoPath = photoFile.name
            }
        },
        clearPhoto() {
            this.$refs.photoInput.value = null
            this.photo = null
            this.uploadedPhotoUrl = null
            this.formData.photoPath = null
        },
    },
    watch: {
        currentEquipment: {
            handler(equipment) {
                this.formData = {
                    id: this.$route.params.id,
                    name: equipment.name,
                    inventoryNumber: equipment.inventoryNumber,
                    acquisitionSource: equipment.acquisitionSource,
                    cost: equipment.cost,
                    initialCost: equipment.initialCost,
                    residualCost: equipment.residualCost,
                    adName: equipment.adName,
                    ipAddress: equipment.ipAddress,
                    kfuDevelopmentProgramApplicationList: this.getLabelValuePair(equipment.kfuDevelopmentProgramApplication),
                    warrantyServiceForRepresentativesOfAForeignParty: equipment.warrantyServiceForRepresentativesOfAForeignParty,
                    kfuDevelopmentProgramPriorityDirectionList: this.getLabelValuePair(equipment.kfuDevelopmentProgramPriorityDirection),
                    russiaDevelopmentPriorityDirectionList: this.getLabelValuePair(equipment.russiaDevelopmentPriorityDirection),
                    area: equipment.area,
                    researchObjects: equipment.researchObjects,
                    indicators: equipment.indicators,
                    additionalFeatures: equipment.additionalFeatures,
                    purpose: equipment.purpose,
                    usageType: equipment.usageType,
                    verificationRequired: equipment.verificationRequired,
                    type: equipment.type,
                    factoryNumber: equipment.factoryNumber,
                    manufacturerCountry: equipment.manufacturerCountry,
                    manufactureYear: equipment.manufactureYear,
                    manufacturer: equipment.manufacturer,
                    supplier: equipment.supplier,
                    deliveryDate: equipment.deliveryDate ? new Date(equipment.deliveryDate).toISOString().slice(0, 10) : null,
                    commissioningDate: equipment.commissioningDate ? new Date(equipment.commissioningDate).toISOString().slice(0, 10) : null,
                    brand: equipment.brand,
                    providingServicesToThirdPartiesPossibility: equipment.providingServicesToThirdPartiesPossibility,
                    collectiveFederalCenterUse: equipment.collectiveFederalCenterUse,
                    unique: equipment.unique,
                    collectiveInterdisciplinaryCenterUse: equipment.collectiveInterdisciplinaryCenterUse,
                    portalPublicationCardReadiness: equipment.portalPublicationCardReadiness,
                    installationLocation: equipment.installationLocation,
                    unit: equipment.unit,
                    responsiblePerson: equipment.responsiblePerson,
                    status: equipment.status,
                    photoPath: equipment.photoPath,
                }
            },
            immediate: true, // update form data immediately after mounted
        },
    },
}
</script>

<style scoped>
.equipment-edit {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.title {
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
    color: #3f51b5;
}

.form-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
}

label {
    font-size: 18px;
    margin-right: 10px;
    color: #444;
}

input {
    flex-grow: 1;
    font-size: 16px;
    padding: 10px;
    border: none;
    border-radius: 5px;
}

.save-button {
    background-color: #3f51b5;
    color: white;
    font-size: 18px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.save-button:hover {
    background-color: #2c3e50;
}

.photo {
    width: 400px;
    height: 400px;
}

</style>