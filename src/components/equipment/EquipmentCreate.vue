<template>
    <div class="equipment-create">
        <h1 class="title">Создать оборудование</h1>
        <form @submit.prevent="createEquipment" v-if="loaded">
            <div class="upper-block">
                <div class="upper-block-item photo-block">
                    <img class="photo" :src="photoUrl" alt="Equipment Photo" v-if="photoUrl">
                    <div class="upper-block-item photo-buttons-block">
                        <label for="photo" class="file-input">Загрузить фото</label>
                        <input id="photo" type="file" ref="photoInput" accept="image/*" @change="onPhotoChange()"/>
                        <input v-if="photoPath" id="photo-delete" type="button" class="delete-input" @click="clearPhoto()"
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
                            <td class="value"><input id="name" type="text" v-model="name" required/></td>
                        </tr>
                        <tr class="inventory-number">
                            <td class="label"><label for="inventory-number">Инвентарный номер*</label></td>
                            <td class="value"><input id="inventory-number" type="text" v-model="inventoryNumber"
                                                     required/></td>
                        </tr>
                        <tr class="acquisition-source">
                            <td class="label"><label for="acquisition-source">Источник приобретения*</label></td>
                            <td class="value"><input id="acquisition-source" type="text" v-model="acquisitionSource"
                                                     required/></td>
                        </tr>
                        <tr class="cost">
                            <td class="label"><label for="cost">Стоимость*</label></td>
                            <td class="value"><input id="cost" type="number" step="0.01" v-model="cost" min="0"
                                                     required/></td>
                        </tr>
                        <tr class="residual-cost">
                            <td class="label"><label for="residual-cost">Остаточная стоимость*</label></td>
                            <td class="value"><input id="residual-cost" type="number" step="0.01" v-model="residualCost"
                                                     required/>
                            </td>
                        </tr>
                        <tr class="initial-cost">
                            <td class="label"><label for="initial-cost">Начальная стоимость (балансовая
                                стоимость)*</label></td>
                            <td class="value"><input id="initial-cost" type="number" step="0.01" v-model="initialCost"
                                                     required/>
                            </td>
                        </tr>
                        <tr class="ad-name">
                            <td class="label"><label for="ad-name">Имя оборудования в AD*</label></td>
                            <td class="value"><input id="ad-name" type="text" v-model="adName" required/></td>
                        </tr>
                        <tr class="ip-address">
                            <td class="label"><label for="ip-address">IP-адрес оборудования*</label></td>
                            <td class="value"><input id="ip-address" type="text" v-model="ipAddress" required/></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="downer-block">
                <table class="equipment-table-2 downer-block-item">
                    <tr class="kfu-development-program-application section">
                        <td class="label"><label for="kfu-development-program-application">Заявка программы
                            развития
                            КФУ</label>
                        </td>
                        <td class="value">
                            <div id="kfu-development-program-application"
                                 v-for="(field, index) in kfuDevelopmentProgramApplication"
                                 :key="index">
                                <label>{{ field.label }}</label>
                                <input type="text" v-model="field.value"/>
                                <input type="button" class="delete-section-button"
                                       @click="removeField(kfuDevelopmentProgramApplication, index)"
                                       value="-"/>
                            </div>
                            <input class="add-section-button" type="button"
                                   @click="addField(kfuDevelopmentProgramApplication)" value="+"/>
                        </td>
                    </tr>
                    <tr class="warranty-service-for-representatives-of-a-foreign-party">
                        <td class="label"><label
                            for="warranty-service-for-representatives-of-a-foreign-party">Гарантийное
                            обслуживание
                            (оборудования) представителями иностранной стороны</label></td>
                        <td class="value"><input id="warranty-service-for-representatives-of-a-foreign-party"
                                                 type="checkbox"
                                                 v-model="warrantyServiceForRepresentativesOfAForeignParty"/></td>
                    </tr>
                    <tr class="kfu-development-program-priority-direction section">
                        <td class="label"><label for="kfu-development-program-priority-direction">Приоритетное
                            направление
                            программы развития
                            КФУ</label></td>
                        <td class="value">
                            <div id="kfu-development-program-priority-direction"
                                 v-for="(field, index) in kfuDevelopmentProgramPriorityDirection" :key="index">
                                <label>{{ field.label }}</label>
                                <input type="text" v-model="field.value"/>
                                <input type="button" class="delete-section-button"
                                       @click="removeField(kfuDevelopmentProgramPriorityDirection, index)"
                                       value="-"/>
                            </div>
                            <input class="add-section-button" type="button"
                                   @click="addField(kfuDevelopmentProgramPriorityDirection)" value="+"/>
                        </td>
                    </tr>
                    <tr class="russia-development-priority-direction">
                        <td class="label"><label for="russia-development-priority-direction">Приоритетное
                            направление
                            развития
                            науки и техники
                            РФ</label></td>
                        <td class="value">
                            <div id="russia-development-priority-direction"
                                 v-for="(field, index) in russiaDevelopmentPriorityDirection" :key="index">
                                <label>{{ field.label }}</label>
                                <input type="text" v-model="field.value"/>
                                <input type="button" class="delete-section-button"
                                       @click="removeField(russiaDevelopmentPriorityDirection, index)"
                                       value="-"/>
                            </div>
                            <input type="button" class="add-section-button"
                                   @click="addField(russiaDevelopmentPriorityDirection)" value="+"/></td>
                    </tr>
                    <tr class="area">
                        <td class="label"><label for="area">Область применения</label></td>
                        <td class="value"><input id="area" type="text" v-model="area"/></td>
                    </tr>
                    <tr class="research-objects">
                        <td class="label"><label for="research-objects">Объекты исследования</label></td>
                        <td class="value"><input id="research=objects" type="text" v-model="researchObjects"/></td>
                    </tr>
                    <tr class="indicators">
                        <td class="label"><label for="indicators">Определяемые показатели (величины, параметры)</label>
                        </td>
                        <td class="value"><input id="indicators" type="text" v-model="indicators"/></td>
                    </tr>
                    <tr class="additional-features">
                        <td class="label"><label for="additional-features">Дополнительные возможности</label></td>
                        <td class="value"><input id="additional-features" type="text" v-model="additionalFeatures"/>
                        </td>
                    </tr>
                    <tr class="purpose">
                        <td class="label"><label for="purpose">Назначение</label></td>
                        <td class="value">
                            <select id="purpose" v-model="purpose">
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
                        <td class="value"><select id="usage-type" v-model="usageType">
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
                                                 v-model="verificationRequired"/>
                        </td>
                    </tr>
                </table>
                <table class="equipment-table-2 downer-block-item">
                    <tr class="type">
                        <td class="label"><label for="type">Тип оборудования</label></td>
                        <td class="value"><input id="type" type="text" v-model="type"/></td>
                    </tr>
                    <tr class="factory-number">
                        <td class="label"><label for="factory-number">Заводской номер</label></td>
                        <td class="value"><input id="factory-number" type="text" v-model="factoryNumber"/></td>
                    </tr>
                    <tr class="manufacturer-country">
                        <td class="label"><label for="manufacturer-country">Страна-изготовитель</label></td>
                        <td class="value"><select id="manufacturer-country" v-model="manufacturerCountry">
                            <option value=""></option>
                            <option v-for="country in countries" :key="country.id" :value="country.id">{{
                                    country.name
                                }}
                            </option>
                        </select></td>
                    </tr>
                    <tr class="manufacture-year">
                        <td class="label"><label for="manufacture-year">Год изготовления</label></td>
                        <td class="value"><input id="manufacture-year" type="number" v-model="manufactureYear"/></td>
                    </tr>
                    <tr class="manufacturer">
                        <td class="label"><label for="manufacturer">Фирма-изготовитель</label></td>
                        <td class="value"><input id="manufacturer" type="text" v-model="manufacturer"/></td>
                    </tr>
                    <tr class="supplier">
                        <td class="label"><label for="supplier">Фирма-поставщик</label></td>
                        <td class="value"><input id="supplier" type="text" v-model="supplier"/></td>
                    </tr>
                    <tr class="delivery-date">
                        <td class="label"><label for="delivery-date">Дата поставки</label></td>
                        <td class="value">
                            <VueDatePicker v-model="deliveryDate" @change="onDeliveryDateChange" auto-apply
                                           scrollable :show-current="false" :enable-time-picker="false"></VueDatePicker>
                        </td>
                    </tr>
                    <tr class="commissioning-date">
                        <td class="label"><label for="commissioning-date">Дата ввода в эксплуатацию</label></td>
                        <td class="value">
                            <VueDatePicker v-model="commissioningDate" @change="onCommissioningDateChange"
                                           scrollable :show-current="false"
                                           auto-apply
                                           :enable-time-picker="false"></VueDatePicker>
                        </td>
                    </tr>
                    <tr class="brand">
                        <td class="label"><label for="brand">Марка</label></td>
                        <td class="value"><input id="brand" type="text" v-model="brand"/></td>
                    </tr>
                    <tr class="providing-services-to-third-parties-possibility">
                        <td class="label"><label for="providing-services-to-third-parties-possibility">Возможность
                            оказания
                            услуг сторонним
                            организациям</label></td>
                        <td class="value"><input id="providing-services-to-third-parties-possibility" type="checkbox"
                                                 v-model="providingServicesToThirdPartiesPossibility"/></td>
                    </tr>
                    <tr class="collective-federal-center-use">
                        <td class="label"><label for="collective-federal-center-use">Оборудование федерального центра
                            коллективного
                            пользования</label></td>
                        <td class="value"><input id="collective-federal-center-use" type="checkbox"
                                                 v-model="collectiveFederalCenterUse"/></td>
                    </tr>
                    <tr class="unique">
                        <td class="label"><label for="unique">Уникальное оборудование</label></td>
                        <td class="value"><input id="unique" type="checkbox" v-model="unique"/></td>
                    </tr>
                    <tr class="collective-interdisciplinary-center-use">
                        <td class="label"><label for="collective-interdisciplinary-center-use">Междисциплинарный центр
                            коллективного
                            пользования</label></td>
                        <td class="value"><input id="collective-interdisciplinary-center-use" type="checkbox"
                                                 v-model="collectiveInterdisciplinaryCenterUse"/></td>
                    </tr>
                    <tr class="portal-publication-card-readiness">
                        <td class="label"><label for="portal-publication-card-readiness">Готовность карточки к
                            публикации на
                            портале</label></td>
                        <td class="value"><input id="portal-publication-card-readiness" type="checkbox"
                                                 v-model="portalPublicationCardReadiness"/></td>
                    </tr>
                    <tr class="installation-location">
                        <td class="label"><label for="installation-location">Место установки</label></td>
                        <td class="value"><input id="installation-location" type="text" v-model="installationLocation"/>
                        </td>
                    </tr>
                    <tr class="address">
                        <td class="label"><label for="address">Адрес*</label></td>
                        <td class="value"><select id="address" v-model="address" required>
                            <option v-for="address in addresses" :key="address.id" :value="address.id">{{
                                    address.address
                                }}
                            </option>
                        </select></td>
                    </tr>
                    <tr class="responsible-person">
                        <td class="label"><label for="responsible-person">Лицо, ответственное за функционирование
                            оборудования</label></td>
                        <td class="value"><input id="responsible-person" type="text" v-model="responsiblePerson"/></td>
                    </tr>
                    <tr class="status">
                        <td class="label"><label for="status">Статус оборудования</label></td>
                        <td class="value"><select id="status" v-model="status">
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
    name: "EquipmentCreate",
    components: {PhotoCropModal},
    data() {
        return {
            photo: null,
            name: null,
            inventoryNumber: null,
            acquisitionSource: null,
            cost: null,
            initialCost: null,
            residualCost: null,
            adName: null,
            ipAddress: null,
            kfuDevelopmentProgramApplication: [],
            warrantyServiceForRepresentativesOfAForeignParty: false,
            kfuDevelopmentProgramPriorityDirection: [],
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
            deliveryDate: null,
            commissioningDate: null,
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
            showModal: false,
            croppingPhotoFile: null,
            loaded: false,
        };
    },
    computed: {
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
            return this.getDefaultPhoto();
        }
    },
    async created() {
        await this.fetchPurposeList();
        await this.fetchUsageTypeList();
        await this.fetchCountryList();
        await this.fetchAddressList();
        await this.fetchStatusList();
        await this.fetchDefaultPhoto();
        this.showOrCloseModal(false)
        this.loaded = true;
    },
    methods: {
        ...mapActions('equipment', ['saveEquipment']),
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
        ...mapActions('photo', ['uploadPhoto', 'fetchDefaultPhoto']),
        ...mapGetters('photo', ['getDefaultPhoto']),
        async createEquipment() {
            if (this.photo) {
                try {
                    await this.uploadPhoto(this.photo)
                } catch (error) {
                    console.log(error)
                    this.photoPath = null
                }
            }
            const equipmentData = {
                name: this.name,
                inventoryNumber: this.inventoryNumber,
                acquisitionSource: this.acquisitionSource,
                cost: this.cost,
                initialCost: this.initialCost,
                residualCost: this.residualCost,
                adName: this.adName,
                ipAddress: this.ipAddress,
                kfuDevelopmentProgramApplication: this.kfuDevelopmentProgramApplication.map(x => x.value),
                warrantyServiceForRepresentativesOfAForeignParty: this.warrantyServiceForRepresentativesOfAForeignParty,
                kfuDevelopmentProgramPriorityDirection: this.kfuDevelopmentProgramPriorityDirection.map(x => x.value),
                russiaDevelopmentPriorityDirection: this.russiaDevelopmentPriorityDirection.map(x => x.value),
                area: this.area,
                researchObjects: this.researchObjects,
                indicators: this.indicators,
                additionalFeatures: this.additionalFeatures,
                purpose: this.purpose,
                usageType: this.usageType,
                verificationRequired: this.verificationRequired,
                type: this.type,
                factoryNumber: this.factoryNumber,
                manufacturerCountry: this.manufacturerCountry,
                manufactureYear: this.manufactureYear,
                manufacturer: this.manufacturer,
                supplier: this.supplier,
                deliveryDate: this.deliveryDate ? this.deliveryDate.toISOString() : null,
                commissioningDate: this.commissioningDate ? this.commissioningDate.toISOString() : null,
                brand: this.brand,
                providingServicesToThirdPartiesPossibility: this.providingServicesToThirdPartiesPossibility,
                collectiveFederalCenterUse: this.collectiveFederalCenterUse,
                unique: this.unique,
                collectiveInterdisciplinaryCenterUse: this.collectiveInterdisciplinaryCenterUse,
                portalPublicationCardReadiness: this.portalPublicationCardReadiness,
                installationLocation: this.installationLocation,
                address: this.address,
                responsiblePerson: this.responsiblePerson,
                status: this.status,
                photoPath: this.photoPath,
            }

            const response = await this.saveEquipment(equipmentData)
            if (response.ok) {
                this.$router.push({name: 'EquipmentDetails', params: {id: response.updatedEquipment.id}})
            }
        },
        onDeliveryDateChange() {
            this.deliveryDate = this.deliveryDate ? new Date(this.deliveryDate).toISOString() : null
        },
        onCommissioningDateChange() {
            this.commissioningDate = this.commissioningDate ? new Date(this.commissioningDate).toISOString() : null
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
        clearPhoto() {
            this.$refs.photoInput.value = null
            this.photo = null
            this.photoPath = null
            this.uploadedPhotoUrl = null
            this.croppingPhotoFile = null
        },
        showOrCloseModal(show) {
            this.showModal = show
        },
        showPhoto(blob) {
            var formData = new FormData();
            formData.append('name', this.croppingPhotoFile.name);
            formData.append('photo', blob);

            this.photo = formData
            this.photoPath = this.croppingPhotoFile.name
            this.uploadedPhotoUrl = URL.createObjectURL(blob)

            this.showOrCloseModal(false)
        },
        cancelPhotoCrop() {
            this.croppingPhotoFile = null
            this.showOrCloseModal(false)
        },
        getPhotoToCrop() {
           return  URL.createObjectURL(this.croppingPhotoFile)
        }
    },
}
</script>

<style scoped>
.equipment-create {
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
}

.equipment-table input[type=text], .equipment-table input[type=number] {
    outline: none;
}

.equipment-table input[type=text], .equipment-table input[type=number] {
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