/**
 * Created by alex wei on 2015/12/7.
 */
import { REQUEST_API } from '../middleWare/apiRequester';
import UcService from '../services/ucService';
import authUtils from '../utils/authUtils';


export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function login(loginName, passwords) {
    return {
        [REQUEST_API]: {
            types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
            service: ()=> UcService.login(loginName, passwords),
            payload: {}
        }
    };
}

export const LOGOUT = 'LOGOUT';

export function logout() {
    authUtils.cleanAuth();
    return {
        type: LOGOUT
    }
}