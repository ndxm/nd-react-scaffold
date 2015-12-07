// 全局样式
import '../../style/select.css'
import '../../style/datePicker.css'

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { ReduxRouter, pushState } from 'redux-router';
import { Route, Link, Redirect } from 'react-router';
import { Provider, connect } from 'react-redux';
import injectTapEventPlugin from'react-tap-event-plugin'
import Loading from './loading.js'

//局域样式
import styles from '../../style/app.css'

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

class Index extends Component {

	componentDidMount() {
		if (!this.props.isLoggedIn) {
			this.props.redirectLoginView();
		}
	}

	componentWillReceiveProps(nextProps){
		if (!nextProps.isLoggedIn) {
			nextProps.redirectLoginView();
		}
	}

	render() {
		return (
			<div>
				<Loading/>
				{this.props.children}
			</div>
		);
	}
}

function mapStateToProps (state) {
	return {
		isLoggedIn: state.auth.auth.accessToken ? true : false,
		roleName: state.auth.auth.userInfo ? state.auth.auth.userInfo.role : null,
		pathName: state.router.location.pathname? state.router.location.pathname: null
	}
}

function mapDispatchToProps(dispatch) {
	return {
		redirectLoginView: () => dispatch(pushState(null, '/login'))
	}
}

export default connect(
	mapStateToProps, mapDispatchToProps
)(Index)

