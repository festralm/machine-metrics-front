<template>
    <div class="equipment-edit" v-if="formData">
        <h1 class="title">Изменить оборудование</h1>
        <form @submit.prevent="updateEquipment">
            <div class="upper-block">
                <div class="upper-block-item photo-block">
                    <img class="photo" :src="photoUrl" alt="Equipment Photo" v-if="photoUrl">
                    <div class="upper-block-item photo-buttons-block">
                        <label for="photo" class="file-input">Загрузить фото</label>
                        <input id="photo" type="file" ref="photoInput" accept="image/*" @change="onPhotoChange()"/>
                        <input v-if="formData.photoPath" id="photo-delete" class="delete-input" type="button"
                               @click="clearPhoto()"
                               value="Удалить фото"/>
                    </div>
                    <PhotoCropModal v-if="showModal" :photoUrl="getPhotoToCrop()"
                                    @close="showOrCloseModal(false)"
                                    @save="showPhoto" @cancel="cancelPhotoCrop"></PhotoCropModal>
                </div>
                <div class="upper-block-item inputs-block">
                    <table class="equipment-table">
                        <tr class="name">
                            <td class="label"><label for="name">Наименование оборудования*</label></td>
                            <td class="value"><input id="name" type="text" v-model="formData.name" required/></td>
                        </tr>
                        <tr class="inventory-number">
                            <td class="label"><label for="inventory-number">Инвентарный номер*</label></td>
                            <td class="value"><input id="inventory-number" type="text"
                                                     v-model="formData.inventoryNumber"
                                                     required/></td>
                        </tr>
                        <tr class="acquisition-source">
                            <td class="label"><label for="acquisition-source">Источник приобретения*</label></td>
                            <td class="value"><input id="acquisition-source" type="text"
                                                     v-model="formData.acquisitionSource"
                                                     required/></td>
                        </tr>
                        <tr class="cost">
                            <td class="label"><label for="cost">Стоимость*</label></td>
                            <td class="value"><input id="cost" type="number" step="0.01" v-model="formData.cost" min="0"
                                                     required/></td>
                        </tr>
                        <tr class="residual-cost">
                            <td class="label"><label for="residual-cost">Остаточная стоимость*</label></td>
                            <td class="value"><input id="residual-cost" type="number" step="0.01"
                                                     v-model="formData.residualCost"
                                                     required/>
                            </td>
                        </tr>
                        <tr class="initial-cost">
                            <td class="label"><label for="initial-cost">Начальная стоимость (балансовая
                                стоимость)*</label></td>
                            <td class="value"><input id="initial-cost" type="number" step="0.01"
                                                     v-model="formData.initialCost"
                                                     required/>
                            </td>
                        </tr>
                        <tr class="ad-name">
                            <td class="label"><label for="ad-name">Имя оборудования в AD*</label></td>
                            <td class="value"><input id="ad-name" type="text" v-model="formData.adName" required/></td>
                        </tr>
                        <tr class="ip-address">
                            <td class="label"><label for="ip-address">IP-адрес оборудования*</label></td>
                            <td class="value"><input id="ip-address" type="text" v-model="formData.ipAddress" required/>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="downer-block">
                <table class="equipment-table-2 downer-block-item">
                    <tr class="kfu-development-program-application section">
                        <td class="label"><label for="kfu-development-program-application">Заявка программы развития
                            КФУ</label>
                        </td>
                        <td class="value">
                            <div id="kfu-development-program-application"
                                 v-for="(field, index) in formData.kfuDevelopmentProgramApplicationList"
                                 :key="index">
                                <label>{{ field.label }}</label>
                                <input type="text" v-model="field.value"/>
                                <input type="button" class="delete-section-button"
                                       @click="removeField(formData.kfuDevelopmentProgramApplicationList, index)"
                                       value="-"/>
                            </div>
                            <input class="add-section-button" type="button"
                                   @click="addField(formData.kfuDevelopmentProgramApplicationList)" value="+"/>
                        </td>
                    </tr>
                    <tr class="warranty-service-for-representatives-of-a-foreign-party">
                        <td class="label"><label for="warranty-service-for-representatives-of-a-foreign-party">Гарантийное
                            обслуживание
                            (оборудования) представителями иностранной стороны</label></td>
                        <td class="value"><input id="warranty-service-for-representatives-of-a-foreign-party"
                                                 type="checkbox"
                                                 v-model="formData.warrantyServiceForRepresentativesOfAForeignParty"/>
                        </td>
                    </tr>
                    <tr class="kfu-development-program-priority-direction section">
                        <td class="label"><label for="kfu-development-program-priority-direction">Приоритетное
                            направление программы
                            развития
                            КФУ</label></td>
                        <td class="value">
                            <div id="kfu-development-program-priority-direction"
                                 v-for="(field, index) in formData.kfuDevelopmentProgramPriorityDirectionList"
                                 :key="index">
                                <label>{{ field.label }}</label>
                                <input type="text" v-model="field.value"/>
                                <input type="button" class="delete-section-button"
                                       @click="removeField(formData.kfuDevelopmentProgramPriorityDirectionList, index)"
                                       value="-"/>
                            </div>
                            <input class="add-section-button" type="button"
                                   @click="addField(formData.kfuDevelopmentProgramPriorityDirectionList)" value="+"/>
                        </td>
                    </tr>
                    <tr class="russia-development-priority-direction">
                        <td class="label"><label for="russia-development-priority-direction">Приоритетное направление
                            развития науки и
                            техники
                            РФ</label></td>
                        <td class="value">
                            <div id="russia-development-priority-direction"
                                 v-for="(field, index) in formData.russiaDevelopmentPriorityDirectionList" :key="index">
                                <label>{{ field.label }}</label>
                                <input type="text" v-model="field.value"/>
                                <input type="button" class="delete-section-button"
                                       @click="removeField(formData.russiaDevelopmentPriorityDirectionList, index)"
                                       value="-"/>
                            </div>
                            <input type="button" class="add-section-button"
                                   @click="addField(formData.russiaDevelopmentPriorityDirectionList)" value="+"/></td>
                    </tr>
                    <tr class="area">
                        <td class="label"><label for="area">Область применения</label></td>
                        <td class="value"><input id="area" type="text" v-model="formData.area"/></td>
                    </tr>
                    <tr class="research-objects">
                        <td class="label"><label for="research-objects">Объекты исследования</label></td>
                        <td class="value"><input id="research=objects" type="text" v-model="formData.researchObjects"/>
                        </td>
                    </tr>
                    <tr class="indicators">
                        <td class="label"><label for="indicators">Определяемые показатели (величины, параметры)</label>
                        </td>
                        <td class="value"><input id="indicators" type="text" v-model="formData.indicators"/></td>
                    </tr>
                    <tr class="additional-features">
                        <td class="label"><label for="additional-features">Дополнительные возможности</label></td>
                        <td class="value"><input id="additional-features" type="text"
                                                 v-model="formData.additionalFeatures"/>
                        </td>
                    </tr>
                    <tr class="purpose">
                        <td class="label"><label for="purpose">Назначение</label></td>
                        <td class="value">
                            <select id="purpose" v-model="formData.purpose">
                                <option value=""></option>
                                <option v-for="purpose in purposes" :key="purpose.id" :value="purpose.id">{{
                                        purpose.name
                                    }}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr class="usage-type">
                        <td class="label"><label for="usage-type">Тип использования</label></td>
                        <td class="value"><select id="usage-type" v-model="formData.usageType">
                            <option value=""></option>
                            <option v-for="usageType in usageTypes" :key="usageType.id" :value="usageType.id">{{
                                    usageType.name
                                }}
                            </option>
                        </select></td>
                    </tr>
                    <tr class="verification-required">
                        <td class="label"><label for="verification-required">Требуется поверка оборудования</label></td>
                        <td class="value"><input id="verification-required" type="checkbox"
                                                 v-model="formData.verificationRequired"/>
                        </td>
                    </tr>
                </table>
                <table class="equipment-table-2 downer-block-item">
                    <tr class="type">
                        <td class="label"><label for="type">Тип оборудования</label></td>
                        <td class="value"><input id="type" type="text" v-model="formData.type"/></td>
                    </tr>
                    <tr class="factory-number">
                        <td class="label"><label for="factory-number">Заводской номер</label></td>
                        <td class="value"><input id="factory-number" type="text" v-model="formData.factoryNumber"/></td>
                    </tr>
                    <tr class="manufacturer-country">
                        <td class="label"><label for="manufacturer-country">Страна-изготовитель</label></td>
                        <td class="value"><select id="manufacturer-country" v-model="formData.manufacturerCountry">
                            <option value=""></option>
                            <option v-for="country in countries" :key="country.id" :value="country.id">{{
                                    country.name
                                }}
                            </option>
                        </select></td>
                    </tr>
                    <tr class="manufacture-year">
                        <td class="label"><label for="manufacture-year">Год изготовления</label></td>
                        <td class="value"><input id="manufacture-year" type="number"
                                                 v-model="formData.manufactureYear"/></td>
                    </tr>
                    <tr class="manufacturer">
                        <td class="label"><label for="manufacturer">Фирма-изготовитель</label></td>
                        <td class="value"><input id="manufacturer" type="text" v-model="formData.manufacturer"/></td>
                    </tr>
                    <tr class="supplier">
                        <td class="label"><label for="supplier">Фирма-поставщик</label></td>
                        <td class="value"><input id="supplier" type="text" v-model="formData.supplier"/></td>
                    </tr>
                    <tr class="delivery-date">
                        <td class="label"><label for="delivery-date">Дата поставки</label></td>
                        <td class="value">
                            <VueDatePicker v-model="formData.deliveryDate" @change="onDeliveryDateChange" auto-apply
                                           scrollable :show-current="false" :enable-time-picker="false"></VueDatePicker>
                        </td>
                    </tr>
                    <tr class="commissioning-date">
                        <td class="label"><label for="commissioning-date">Дата ввода в эксплуатацию</label></td>
                        <td class="value">
                            <VueDatePicker v-model="formData.commissioningDate" @change="onCommissioningDateChange"
                                           scrollable :show-current="false"
                                           auto-apply
                                           :enable-time-picker="false"></VueDatePicker>
                        </td>
                    </tr>
                    <tr class="brand">
                        <td class="label"><label for="brand">Марка</label></td>
                        <td class="value"><input id="brand" type="text" v-model="formData.brand"/></td>
                    </tr>
                    <tr class="providing-services-to-third-parties-possibility">
                        <td class="label"><label for="providing-services-to-third-parties-possibility">Возможность
                            оказания
                            услуг сторонним
                            организациям</label></td>
                        <td class="value"><input id="providing-services-to-third-parties-possibility" type="checkbox"
                                                 v-model="formData.providingServicesToThirdPartiesPossibility"/></td>
                    </tr>
                    <tr class="collective-federal-center-use">
                        <td class="label"><label for="collective-federal-center-use">Оборудование федерального центра
                            коллективного
                            пользования</label></td>
                        <td class="value"><input id="collective-federal-center-use" type="checkbox"
                                                 v-model="formData.collectiveFederalCenterUse"/></td>
                    </tr>
                    <tr class="unique">
                        <td class="label"><label for="unique">Уникальное оборудование</label></td>
                        <td class="value"><input id="unique" type="checkbox" v-model="formData.unique"/></td>
                    </tr>
                    <tr class="collective-interdisciplinary-center-use">
                        <td class="label"><label for="collective-interdisciplinary-center-use">Междисциплинарный центр
                            коллективного
                            пользования</label></td>
                        <td class="value"><input id="collective-interdisciplinary-center-use" type="checkbox"
                                                 v-model="formData.collectiveInterdisciplinaryCenterUse"/></td>
                    </tr>
                    <tr class="portal-publication-card-readiness">
                        <td class="label"><label for="portal-publication-card-readiness">Готовность карточки к
                            публикации на
                            портале</label></td>
                        <td class="value"><input id="portal-publication-card-readiness" type="checkbox"
                                                 v-model="formData.portalPublicationCardReadiness"/></td>
                    </tr>
                    <tr class="installation-location">
                        <td class="label"><label for="installation-location">Место установки</label></td>
                        <td class="value"><input id="installation-location" type="text"
                                                 v-model="formData.installationLocation"/>
                        </td>
                    </tr>
                    <tr class="address">
                        <td class="label"><label for="address">Адрес</label></td>
                        <td class="value"><select id="address" v-model="formData.address">
                            <option value=""></option>
                            <option v-for="address in addresses" :key="address.id" :value="address.id">{{
                                    address.address
                                }}
                            </option>
                        </select></td>
                    </tr>
                    <tr class="responsible-person">
                        <td class="label"><label for="responsible-person">Лицо, ответственное за функционирование
                            оборудования</label></td>
                        <td class="value"><input id="responsible-person" type="text"
                                                 v-model="formData.responsiblePerson"/></td>
                    </tr>
                    <tr class="status">
                        <td class="label"><label for="status">Статус оборудования</label></td>
                        <td class="value"><select id="status" v-model="formData.status">
                            <option value=""></option>
                            <option v-for="status in statuses" :key="status.id" :value="status.id">{{
                                    status.name
                                }}
                            </option>
                        </select></td>
                    </tr>
                </table>
            </div>
            <div class="form-group">
                <button class="save-button" type="submit">Сохранить</button>
            </div>
        </form>
    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import PhotoCropModal from "@/components/equipment/PhotoCropModal.vue";

export default {
    name: "EquipmentEdit",
    components: {PhotoCropModal},
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
                address: null,
                responsiblePerson: null,
                status: null,
                photoPath: null,
            },
            croppingPhotoFile: null,
            showModal: false,
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
        addresses() {
            return this.getAddressList();
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
            return this.getDefaultPhoto();
        },
    },
    async created() {
        const equipmentId = this.$route.params.id;
        await this.fetchEquipmentById(equipmentId);
        await this.fetchPurposeList();
        await this.fetchUsageTypeList();
        await this.fetchCountryList();
        await this.fetchAddressList();
        await this.fetchStatusList();
        await this.fetchDefaultPhoto();
        await this.fetchEquipmentPhoto({id: equipmentId, path: this.currentEquipment.photoPath});
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
        ...mapActions('address', ['fetchAddressList']),
        ...mapGetters('address', ['getAddressList']),
        ...mapActions('status', ['fetchStatusList']),
        ...mapGetters('status', ['getStatusList']),
        ...mapActions('photo', ['fetchEquipmentPhoto', 'fetchDefaultPhoto', 'uploadPhoto']),
        ...mapGetters('photo', ['getEquipmentPhoto', 'getDefaultPhoto']),
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
                this.croppingPhotoFile = photoFile

                this.showOrCloseModal(true)
            }
        },
        showOrCloseModal(show) {
            this.showModal = show
        },
        clearPhoto() {
            this.$refs.photoInput.value = null
            this.photo = null
            this.formData.photoPath = null
            this.uploadedPhotoUrl = null
            this.croppingPhotoFile = null
        },
        showPhoto(blob) {
            var formData = new FormData();
            formData.append('name', this.croppingPhotoFile.name);
            formData.append('photo', blob);

            this.photo = formData
            this.formData.photoPath = this.croppingPhotoFile.name
            this.uploadedPhotoUrl = URL.createObjectURL(blob)

            this.showOrCloseModal(false)
        },
        cancelPhotoCrop() {
            this.croppingPhotoFile = null
            this.showOrCloseModal(false)
        },
        getPhotoToCrop() {
            return URL.createObjectURL(this.croppingPhotoFile)
        },
        onDeliveryDateChange() {
            this.deliveryDate = this.deliveryDate ? new Date(this.deliveryDate).toISOString() : null
        },
        onCommissioningDateChange() {
            this.commissioningDate = this.commissioningDate ? new Date(this.commissioningDate).toISOString() : null
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
                    purpose: equipment.purpose ? equipment.purpose.id : null,
                    usageType: equipment.usageType ? equipment.usageType.id : null,
                    verificationRequired: equipment.verificationRequired,
                    type: equipment.type,
                    factoryNumber: equipment.factoryNumber,
                    manufacturerCountry: equipment.manufacturerCountry ? equipment.manufacturerCountry.id : null,
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
                    address: equipment.address ? equipment.address.id : null,
                    responsiblePerson: equipment.responsiblePerson,
                    status: equipment.status ? equipment.status.id : null,
                    photoPath: equipment.photoPath,
                }
            },
            immediate: true,
        },
    },
}
</script>

<style scoped>

.equipment-edit {
    width: 85%;
    background-color: white;
    flex: 1;
}

input[type="file"] {
    display: none;
}

.title {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    margin: 0;
    padding: 20px 0 20px 0;
    color: white;
}

form {
    margin: 50px;
}

.photo {
    width: 200px;
}

.file-input {
    background-color: rgba(0, 85, 144, 0.69);
    font-size: 15px;
    width: 150px;
    height: 30px;
    color: white;
    font-weight: bold;
    border: 1px solid white;
    border-radius: 5px;
    cursor: pointer;
}

.file-input:hover {
    border-color: rgba(255, 255, 255, 0.27);
}

.delete-input {
    background-color: rgba(144, 0, 0, 0.69);
    font-size: 15px;
    width: 150px;
    height: 30px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
    margin-top: 5px;
}

.delete-input:hover {
    border-color: rgba(255, 255, 255, 0.27);
}

.upper-block label {
    line-height: 30px;
}

.upper-block {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
}

.photo-buttons-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
}

.inputs-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.inputs-block .label {
    text-align: right;
    padding-right: 30px;
    width: 400px;
}

.equipment-table input[type=text], .equipment-table input[type=number] {
    width: 250px;
    height: 20px;
    border-radius: 0;
    border-width: 1px;
    outline: none;
    font-size: 15px;
}

.equipment-table tr {
    font-size: 15px;
    border-bottom: 1px solid #ccc;
}

.equipment-table td {
    width: 300px;
}

.downer-block {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

.downer-block-item {
    width: 50%;
}

.photo-block {
    margin-left: 30px;
}

.add-section-button {
    background-color: rgba(0, 85, 144, 0.69);
    font-size: 15px;
    width: 20px;
    height: 20px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
    margin-top: 5px;
    padding: 0;
}

.add-section-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}

.delete-section-button {
    background-color: rgba(144, 0, 0, 0.69);
    font-size: 15px;
    width: 21px;
    height: 21px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 10px;
}

.delete-section-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}

input[type=checkbox] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    width: 16px;
    height: 16px;
    border: 2px solid rgb(0, 85, 144);
    border-radius: 3px;
    background-color: #fff;
    cursor: pointer;
}

input[type=checkbox]:checked {
    background-color: rgba(0, 85, 144, 0.69);
}

.equipment-table-2 input[type=text], .equipment-table-2 input[type=number], .equipment-table-2 select {
    width: 200px;
    height: 20px;
    border-radius: 0;
    border-width: 1px;
    font-size: 15px;
    outline: none;
}

.equipment-table-2 select {
    margin-top: 5px;
    width: 205px;
    height: 23px;
}

.equipment-table-2 tr {
    font-size: 15px;
    border-bottom: 1px solid #ccc;
}

.equipment-table-2 td {
    width: 300px;
}

.save-button {
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

.save-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}
</style>