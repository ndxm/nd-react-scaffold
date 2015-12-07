/**
 * Created by Administrator on 2015/12/7.
 */

import CONFIG from '../constants/config'
import authUtils from '../utils/authUtils'
import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';

export default class {

    request({apiUrl, body, method="get", withAuthToken=true, host=null}) {

        const _method = method.toLowerCase();

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        }
        if (withAuthToken) {
            let auth = headers['Authorization'] = authUtils.getAuthHeader({url:apiUrl, method:_method, host});
            console.info(auth)
        }

        let settings = {
            method: _method,
            headers: headers
        }


        if (!['get', 'head'].includes(_method) && body) {
            settings['body'] = JSON.stringify(body);
        }

        return fetch(apiUrl, settings).then(response =>
                response.json().then(json => ({json, response}))
        ).then(({ json, response }) => {
                if (!response.ok) {
                    return Promise.reject(json);
                }

                return camelizeKeys(json);
            });
    }


}