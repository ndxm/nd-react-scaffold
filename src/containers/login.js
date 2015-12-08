/**
 * Created by hjx on 11/3/2015.
 */
import { Provider, connect } from 'react-redux'
import { pushState } from 'redux-router'

import { login } from '../actions/auth.js'
import LoginView from '../components/login/index.js'

function mapStateToProps (state) {
  return {
    isLoggedIn: state.auth.auth.accessToken ? true : false,
    loginErr: state.auth.auth.error,
    roleName: state.auth.auth.userInfo ? state.auth.auth.userInfo.roleName : null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (user) => dispatch(login(user.name, user.password)) ,
    redirect: () => dispatch(pushState(null, '/')),
  }
}


export default connect(
    mapStateToProps, mapDispatchToProps
)(LoginView);
