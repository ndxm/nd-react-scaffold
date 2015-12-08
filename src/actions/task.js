/**
 * Created by Administrator on 2015/12/7.
 */

import { REQUEST_API } from '../middleWare/apiRequester';
import AppService from '../services/appService';



export const TASK_LIST_REQUEST = "TASK_LIST_REQUEST";
export const TASK_LIST_SUCCESS = "TASK_LIST_SUCCESS";
export const TASK_LIST_FAILURE = "TASK_LIST_FAILURE";

export function getTaskList(pageIndex, pageSize) {
    return {
        [REQUEST_API]: {
            types: [TASK_LIST_REQUEST, TASK_LIST_SUCCESS, TASK_LIST_FAILURE],
            service: ()=> AppService.getTaskList(pageIndex, pageSize),
            payload: {}
        }
    };
}