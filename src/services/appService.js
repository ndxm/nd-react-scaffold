/**
 * Created by Administrator on 2015/12/7.
 */

import CONFIG from '../constants/config'
import BaseService from '../services/baseService';
import { getMD5Value } from '../utils/md5Utils.js'

export default new class AppService extends BaseService {

    request({endpoint, body, method="get", withAuthToken=true})
    {
        let apiUrl = `http://${CONFIG.restfulApi.host}/${CONFIG.restfulApi.version}/${endpoint}`;
        return super.request({apiUrl, body, method, withAuthToken});
    }

    getTaskList(pageIndex, pageSize) {
        const endpoint = `tasks?page=${pageIndex}&size=${pageSize}`;
        return this.request({endpoint});
    }
}