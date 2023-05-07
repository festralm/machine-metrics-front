import { createStore } from 'vuex'
import cronExpression from './modules/cronExpression'
import dataService from './modules/dataService'
import equipment from './modules/equipment'
import equipmentStatistics from './modules/equipmentStatistics'
import equipmentSchedule from './modules/equipmentSchedule'

export default createStore({
    modules: {
        cronExpression,
        dataService,
        equipment,
        equipmentStatistics,
        equipmentSchedule,
    },
})