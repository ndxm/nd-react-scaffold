/**
 * Created by hjx on 11/3/2015.
 */
import { combineReducers } from 'redux'
import { TASK_LIST_REQUEST,TASK_LIST_SUCCESS,TASK_LIST_FAILURE } from '../actions/task'

const initTaskState = {
	taskList:[],
	pagination:{},
	error:null
}


function task(state = initTaskState, action) {
	switch (action.type) {
		case TASK_LIST_SUCCESS:
			return Object.assign({}, state, {taskList: action.response.tasks, pagination: {pageIndex:action.pageIndex,pageSize:action.pageSize }});
		case TASK_LIST_FAILURE:
			return Object.assign({}, state, {error: action.error});
		default :
			return state;
	}
}

function fetching(state, action) {
	switch (action.type) {
		case TASK_LIST_REQUEST:
			return true;
		case TASK_LIST_SUCCESS:
		case TASK_LIST_FAILURE:
		default :
			return false;
	}
}

const taskReducer = combineReducers({
	fetching, task
})

export default taskReducer;