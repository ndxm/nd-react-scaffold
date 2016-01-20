/**
 * Created by Administrator on 2015/12/7.
 */
import CONFIG from '../constants/config';
import BaseService from '../services/baseService';
import { getMD5Value } from '../utils/md5Utils.js';

export default new class UcService extends BaseService {

    request({ endpoint, body, method='get', withAuthToken=true }) {
        let apiUrl = `https://${CONFIG.uc.host}/${CONFIG.uc.version}/${endpoint}`;
        return super.request({apiUrl, body, method, withAuthToken});
    }

    login(loginName, passwords) {
        const endpoint = 'tokens';
        const body = {login_name: loginName, password: getMD5Value(passwords)};
        return this.request({endpoint, body, method: 'post', withAuthToken: false});
    }

    getUserInfo(userId) {
        const endpoint = 'users/' + userId;
        return this.request({endpoint, null, method: 'get', withAuthToken: true});
    }

    getUsersInfo(ids = []) {
        const endpoint = 'users/actions/query';

        let users = new Set(ids.map(item=>item['user_id']));
        const body = Array.from(users).filter(item=>item).sort().map(item=> {
            return {'user_id': item}
        });
        return this.request({endpoint, body, method: 'post', withAuthToken: true});
    }

    searchUserInfo(query, size) {
        let orgId = authUtils.getAuth().userInfo.orgId;
        const endpoint = `organizations/${orgId}/orgnodes/0/users/actions/search?name=${query}&$offset=0&$limit=${size}`;
        return this.request({endpoint, null, method: 'get', withAuthToken: true})
    }

    tokensCheck(Authorization) {
        const endpoint = `tokens/${Authorization.accessToken}/actions/valid`;
        const body = {
            mac: Authorization.mac,
            nonce: Authorization.nonce,
            host: Authorization.host,
            request_uri: Authorization.request_uri,
            http_method: Authorization.http_method
        };
        return this.request({endpoint, body, method: 'post', withAuthToken: false});
    }

};
