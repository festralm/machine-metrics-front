<template>
    <div class="equipment-create">
        <h1 class="title">Создать оборудование</h1>
        <form @submit.prevent="createEquipment">
            <div class="form-group">
                <label for="photo">Добавить фото</label>
                <img class="photo" :src="photoUrl" alt="Equipment Photo" v-if="photoUrl">
                <input id="photo" type="file" ref="photoInput" accept="image/*" @change="onPhotoChange()"/>
                <input id="photo-delete" type="button" @click="clearPhoto()" value="Удалить фото"/>
            </div>
            <div class="form-group">
                <label for="name">Наименование оборудования*</label>
                <input id="name" type="text" v-model="name" required/>
            </div>
            <div class="form-group">
                <label for="inventory-number">Инвентарный номер*</label>
                <input id="inventory-number" type="text" v-model="inventoryNumber" required/>
            </div>
            <div class="form-group">
                <label for="acquisition-source">Источник приобретения*</label>
                <input id="acquisition-source" type="text" v-model="acquisitionSource" required/>
            </div>
            <div class="form-group">
                <label for="cost">Стоимость*</label>
                <input id="cost" type="number" step="0.01" v-model="cost" required/>
            </div>
            <div class="form-group">
                <label for="initial-cost">Начальная стоимость (балансовая стоимость)*</label>
                <input id="initial-cost" type="number" step="0.01" v-model="initialCost" required/>
            </div>
            <div class="form-group">
                <label for="residual-cost">Остаточная стоимость*</label>
                <input id="residual-cost" type="number" step="0.01" v-model="residualCost" required/>
            </div>
            <div class="form-group">
                <label for="ad-name">Имя оборудования в AD*</label>
                <input id="ad-name" type="text" v-model="adName" required/>
            </div>
            <div class="form-group">
                <label for="ip-address">IP-адрес оборудования*</label>
                <input id="ip-address" type="text" v-model="ipAddress" required/>
            </div>
            <div class="form-group">
                <label for="kfu-development-program-application">Заявка программы развития КФУ</label>
                <div id="kfu-development-program-application" v-for="(field, index) in kfuDevelopmentProgramApplication"
                     :key="index">
                    <label>{{ field.label }}</label>
                    <input v-model="field.value"/>
                    <input type="button" @click="removeField(kfuDevelopmentProgramApplication, index)" value="-"/>
                </div>
                <input type="button"  @click="addField(kfuDevelopmentProgramApplication)" value="+"/>
            </div>
            <div class="form-group">
                <label for="warranty-service-for-representatives-of-a-foreign-party">Гарантийное обслуживание
                    (оборудования) представителями иностранной стороны</label>
                <input id="warranty-service-for-representatives-of-a-foreign-party" type="checkbox"
                       v-model="warrantyServiceForRepresentativesOfAForeignParty"/>
            </div>
            <div class="form-group">
                <label for="kfu-development-program-priority-direction">Приоритетное направление программы развития
                    КФУ</label>
                <div id="kfu-development-program-priority-direction"
                     v-for="(field, index) in kfuDevelopmentProgramPriorityDirection" :key="index">
                    <label>{{ field.label }}</label>
                    <input v-model="field.value"/>
                    <input type="button" @click="removeField(kfuDevelopmentProgramPriorityDirection, index)" value="-"/>
                </div>
                <input type="button"  @click="addField(kfuDevelopmentProgramPriorityDirection)" value="+"/>
            </div>
            <div class="form-group">
                <label for="russia-development-priority-direction">Приоритетное направление развития науки и техники
                    РФ</label>
                <div id="russia-development-priority-direction"
                     v-for="(field, index) in russiaDevelopmentPriorityDirection" :key="index">
                    <label>{{ field.label }}</label>
                    <input v-model="field.value"/>
                    <input type="button" @click="removeField(russiaDevelopmentPriorityDirection, index)" value="-"/>
                </div>
                <input type="button"  @click="addField(russiaDevelopmentPriorityDirection)" value="+"/>
            </div>
            <div class="form-group">
                <label for="area">Область применения</label>
                <input id="area" type="text" v-model="area"/>
            </div>
            <div class="form-group">
                <label for="research-objects">Объекты исследования</label>
                <input id="research=objects" type="text" v-model="researchObjects"/>
            </div>
            <div class="form-group">
                <label for="indicators">Определяемые показатели (величины, параметры)</label>
                <input id="indicators" type="text" v-model="indicators"/>
            </div>
            <div class="form-group">
                <label for="additional-features">Дополнительные возможности</label>
                <input id="additional-features" type="text" v-model="additionalFeatures"/>
            </div>
            <div class="form-group">
                <label for="purpose">Назначение</label>
                <select id="purpose" v-model="purpose">
                    <option value=""></option>
                    <option v-for="purpose in purposes" :key="purpose.id" :value="purpose.id">{{
                        purpose.name
                        }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="usage-type">Тип использования</label>
                <select id="usage-type" v-model="usageType">
                    <option value=""></option>
                    <option v-for="usageType in usageTypes" :key="usageType.id" :value="usageType.id">{{
                        usageType.name
                        }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="verification-required">Требуется поверка оборудования</label>
                <input id="verification-required" type="checkbox" v-model="verificationRequired"/>
            </div>
            <div class="form-group">
                <label for="type">Тип оборудования</label>
                <input id="type" type="text" v-model="type"/>
            </div>
            <div class="form-group">
                <label for="factory-number">Заводской номер</label>
                <input id="factory-number" type="text" v-model="factoryNumber"/>
            </div>
            <div class="form-group">
                <label for="manufacturer-country">Страна-изготовитель</label>
                <select id="manufacturer-country" v-model="manufacturerCountry">
                    <option value=""></option>
                    <option v-for="country in countries" :key="country.id" :value="country.id">{{
                        country.name
                        }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="manufacture-year">Год изготовления</label>
                <input id="manufacture-year" type="number" v-model="manufactureYear"/>
            </div>
            <div class="form-group">
                <label for="manufacturer">Фирма-изготовитель</label>
                <input id="manufacturer" type="text" v-model="manufacturer"/>
            </div>
            <div class="form-group">
                <label for="supplier">Фирма-поставщик</label>
                <input id="supplier" type="text" v-model="supplier"/>
            </div>
            <div class="form-group">
                <label for="delivery-date">Дата поставки</label>
                <VueDatePicker v-model="deliveryDate" @update:model-value="deliveryDate" auto-apply
                               :enable-time-picker="false"></VueDatePicker>
            </div>
            <div class="form-group">
                <label for="commissioning-date">Дата ввода в эксплуатацию</label>
                <VueDatePicker v-model="commissioningDate" @update:model-value="commissioningDate" auto-apply
                               :enable-time-picker="false"></VueDatePicker>
            </div>
            <div class="form-group">
                <label for="brand">Марка</label>
                <input id="brand" type="text" v-model="brand"/>
            </div>
            <div class="form-group">
                <label for="providing-services-to-third-parties-possibility">Возможность оказания услуг сторонним
                    организациям</label>
                <input id="providing-services-to-third-parties-possibility" type="checkbox"
                       v-model="providingServicesToThirdPartiesPossibility"/>
            </div>
            <div class="form-group">
                <label for="collective-federal-center-use">Оборудование федерального центра коллективного
                    пользования</label>
                <input id="collective-federal-center-use" type="checkbox" v-model="collectiveFederalCenterUse"/>
            </div>
            <div class="form-group">
                <label for="unique">Уникальное оборудование</label>
                <input id="unique" type="checkbox" v-model="unique"/>
            </div>
            <div class="form-group">
                <label for="collective-interdisciplinary-center-use">Междисциплинарный центр коллективного
                    пользования</label>
                <input id="collective-interdisciplinary-center-use" type="checkbox"
                       v-model="collectiveInterdisciplinaryCenterUse"/>
            </div>
            <div class="form-group">
                <label for="portal-publication-card-readiness">Готовность карточки к публикации на портале</label>
                <input id="portal-publication-card-readiness" type="checkbox" v-model="portalPublicationCardReadiness"/>
            </div>
            <div class="form-group">
                <label for="installation-location">Место установки</label>
                <input id="installation-location" type="text" v-model="installationLocation"/>
            </div>
            <div class="form-group">
                <label for="unit">Подразделение</label>
                <select id="unit" v-model="unit">
                    <option value=""></option>
                    <option v-for="unit in units" :key="unit.id" :value="unit.id">{{
                        unit.name
                        }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="responsible-person">Лицо, ответственное за функционирование оборудования</label>
                <input id="responsible-person" type="text" v-model="responsiblePerson"/>
            </div>
            <div class="form-group">
                <label for="status">Статус оборудования</label>
                <select id="status" v-model="status">
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
    name: "EquipmentCreate",
    data() {
        return {
            photo: null,
            photoUrl: null,
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
        units() {
            return this.getUnitList();
        },
        statuses() {
            return this.getStatusList();
        },
    },
    created() {
        this.fetchPurposeList();
        this.fetchUsageTypeList();
        this.fetchCountryList();
        this.fetchUnitList();
        this.fetchStatusList();
    },
    methods: {
        ...mapActions('equipment', ['saveEquipment']),
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
        ...mapActions('photo', ['uploadPhoto']),
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
                unit: this.unit,
                responsiblePerson: this.responsiblePerson,
                status: this.status,
                photoPath: this.photoPath,
            }

            const response = await this.saveEquipment(equipmentData)
            if (response.ok) {
                this.$router.push({name: 'EquipmentDetails', params: {id: response.updatedEquipment.id}})
            }
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
                this.photoPath = photoFile.name
                this.photoUrl = URL.createObjectURL(photoFile)
            }
        },
        clearPhoto() {
            this.$refs.photoInput.value = null
            this.photoPath = null
            this.photoUrl = null
        },
    },
}
</script>

<style scoped>
.equipment-create {
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