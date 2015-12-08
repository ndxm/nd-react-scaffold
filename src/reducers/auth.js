/**
 * Created by hjx on 11/3/2015.
 */
import { combineReducers } from 'redux'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,LOGOUT } from '../actions/auth'
import authUtils from '../utils/authUtils'

const initAuthState = authUtils.getAuth();

function auth(state = initAuthState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log(action.type);
            console.dir(action.response)
            const resp = action.response;
            let userInfo = {
                userName: resp.username,
                nickName: resp.nickName,
                id: resp.userId,
                roleName: resp.roleName
            };
            let accessToken = resp["accessToken"];
            let macKey = resp["macKey"];

            authUtils.saveAuth(accessToken, macKey, userInfo);

            return Object.assign({}, state, {userInfo, macKey, accessToken});
        case LOGIN_FAILURE:
            return Object.assign({}, state, {error: action.error});
        case LOGOUT:
            return {userInfo: null, macKey: null, accessToken: null, error: null};
        default:
            return state;
    }
}

function fetching(state, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return true;
        case LOGIN_FAILURE:
        case LOGIN_SUCCESS:
        default :
            return false;
    }
}

const authReducer = combineReducers({
    auth, fetching
})

export default authReducer;