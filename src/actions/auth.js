/**
 * Created by alex wei on 2015/12/7.
 */
import { REQUEST_API } from '../middleWare/apiRequester';
import UcService from '../services/ucService';
import authUtils from '../utils/authUtils';
import { getAuthorization } from '../utils/base64.js';
import { ASSEMBLED_REQUESTS, LINK_REQUESTS_MODE, SINGLE_REQUEST_MODE } from '../middleWare/assembledApiRequester.js'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILURE = 'USER_INFO_FAILURE';

export function login(loginName, passwords) {
    return {
        [ASSEMBLED_REQUESTS]: {
            assembleMode: LINK_REQUESTS_MODE,
            requests: [
                {
                    assembleMode: SINGLE_REQUEST_MODE,
                    actionTypes: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
                    service: ()=> UcService.login(loginName, passwords),
                    onSuccess: (response) => {
                        authUtils.saveAuth(response['accessToken'],
                            response['macKey'],
                            {id: response['userId']});
                    },
                    onFailure: (error) => {
                    },
                    outMap: (response) => {
                        return response['userId']
                    },
                    throwException: true
                },
                {
                    assembleMode: SINGLE_REQUEST_MODE,
                    actionTypes: [null, 'USER_INFO_SUCCESS', null],
                    service: (lastRes) => UcService.getUserInfo(lastRes),
                    onSuccess: (response) => {
                        let userName = response['nickName'];
                        if (userName == null || userName == '') {
                            userName = response['orgExinfo']['realName'];
                        }
                        let orgId = response['orgExinfo']['orgId'];
                        let authState = authUtils.getAuth();
                        authUtils.saveAuth(authState.accessToken, authState.macKey,
                            {id: authState.userInfo['id'], name: userName, orgId: orgId});
                    }
                }
            ]
        }
    };
}

export function tokensCheck(ucKey) {
    let Authorization = getAuthorization(ucKey)
    //console.dir(Authorization)
    return {
        [ASSEMBLED_REQUESTS]: {
            assembleMode: LINK_REQUESTS_MODE,
            requests: [
                {
                    assembleMode: SINGLE_REQUEST_MODE,
                    actionTypes: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
                    service: ()=> UcService.tokensCheck(Authorization),
                    onSuccess: (response) => {
                        authUtils.saveAuth(response['accessToken'],
                            response['macKey'],
                            {id: response['userId']});
                    },
                    onFailure: (error) => {
                    },
                    outMap: (response) => {
                        return response['userId']
                    },
                    throwException: true
                },
                {
                    assembleMode: SINGLE_REQUEST_MODE,
                    actionTypes: [null, 'USER_INFO_SUCCESS', null],
                    service: (lastRes) => UcService.getUserInfo(lastRes),
                    onSuccess: (response) => {
                        let userName = response['nickName'];
                        if (userName == null || userName == '') {
                            userName = response['orgExinfo']['realName'];
                        }
                        let orgId = response['orgExinfo']['orgId'];
                        let authState = authUtils.getAuth();
                        authUtils.saveAuth(authState.accessToken, authState.macKey,
                            {id: authState.userInfo['id'], name: userName, orgId: orgId});
                    }
                }
            ]
        }
    };
}

export const LOGOUT = 'LOGOUT';

export function logout() {
    authUtils.cleanAuth();
    return {
        type: LOGOUT
    };
}