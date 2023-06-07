import {createStore} from 'vuex'
import cronExpression from './modules/cronExpression'
import dataService from './modules/dataService'
import equipment from './modules/equipment'
import user from './modules/user'
import equipmentStatistics from './modules/equipmentStatistics'
import equipmentSchedule from './modules/equipmentSchedule'
import role from './modules/role'
import auth from './modules/auth'
import photo from './modules/photo'
import purpose from './modules/purpose'
import usageType from './modules/usageType'
import country from './modules/country'
import unit from './modules/unit'
import address from './modules/address'
import status from './modules/status'
import schedule from './modules/schedule'

export default createStore({
    modules: {
        cronExpression,
        dataService,
        equipment,
        user,
        equipmentStatistics,
        equipmentSchedule,
        role,
        auth,
        photo,
        purpose,
        usageType,
        country,
        unit,
        address,
        status,
        schedule,
    },
})