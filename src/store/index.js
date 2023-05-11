import { createStore } from 'vuex'
import cronExpression from './modules/cronExpression'
import dataService from './modules/dataService'
import equipment from './modules/equipment'
import user from './modules/user'
import equipmentStatistics from './modules/equipmentStatistics'
import equipmentSchedule from './modules/equipmentSchedule'
import role from './modules/role'

export default createStore({
    modules: {
        cronExpression,
        dataService,
        equipment,
        user,
        equipmentStatistics,
        equipmentSchedule,
        role,
    },
})