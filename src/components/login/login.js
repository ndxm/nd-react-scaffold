/**
 * Created by hjx on 11/3/2015.
 */
import styles from './login.css';
import React from 'react';
import Router from 'react-router';
const { Navigation }  = Router;

export default React.createClass({
    mixins: [ Navigation ],

    getInitialState: function () {
        return {
            username: '',
            password: '',
            showPassword: false,
            userClick: false,
            loginErr: '',
            isFocusPassword: false
        };
    },

    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.redirect();
        }
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn) {
            nextProps.redirect();
        }
    },

    handleUsernameChange: function (e) {
        this.setState({
            username: e.currentTarget.value.trim()
        });
    },
    handlePasswordChange: function (e) {
        this.setState({
            password: e.currentTarget.value.trim()
        });
    },
    handleToggle: function (e) {
        this.setState({
            showPassword: e.currentTarget.checked
        });
    },
    handleFormSubmit: function (e) {
        e.preventDefault();
        this.setState({
            userClick: true,
            loginErr: ''
        });
        if (this.state.username === '' || this.state.password === '') {
            return;
        }

        this.props.onLogin({
            name: (/@/.test(this.state.username)?this.state.username:this.state.username + '@ndtest'),
            password: this.state.password
        });
    },
    blurPassword: function () {

        this.setState({
            isFocusPassword: false
        });
    },
    focusPassword: function () {
        if (this.state.showPassword) {
            return;
        }
        this.setState({
            isFocusPassword: true
        });
    },
    render: function () {
        let errForUsername, errForPassword;
        if (this.state.userClick === true) {
            errForUsername = this.state.username === '' ? '请输入用户名' : '';
            errForPassword = this.state.password === '' ? '请输入密码' : '';
        }

        return (
            <div>
                <div className={styles.loginBody}>
                    <div className={styles.loginRoad}></div>
                </div>
                <div className={styles.loginPanel}>
                    <div
                        className={styles.loginHi + '   ' + (this.state.isFocusPassword?styles.focusPassword:'')}></div>
                    <h1 className={styles.siteTitle}>微博</h1>
                    <form noValidate onSubmit={this.handleFormSubmit} className={`${styles['c-form']}`}>
                        <div>
                            <div className={`${styles['c-form__input']}`}>
                                <span className={styles['c-form__label']+' '+styles['c-form-name']}></span>
                                <input
                                    className={errForUsername ? `${styles['c-form__inputBox']} ${styles['c-form__inputBox--err']}` : `${styles['c-form__inputBox']}`}
                                    placeholder="工号/学号"
                                    type='text' value={this.state.username}
                                    onChange={this.handleUsernameChange}/>

                                <span className={`${styles['c-form__err']}`}>{errForUsername}</span>
                            </div>
                            <div className={`${styles['c-form__input']}`}>
                                <span className={styles['c-form__label'] +' '+styles['c-form-pwd']}></span>
                                <input
                                    className={errForPassword ? `${styles['c-form__inputBox']} ${styles['c-form__inputBox--err']}` : `${styles['c-form__inputBox']}`}
                                    type={this.state.showPassword ? 'text' : 'password'} value={this.state.password}
                                    placeholder="密码"
                                    onFocus={this.focusPassword}
                                    onBlur={this.blurPassword}
                                    onChange={this.handlePasswordChange}/>
                                <span className={`${styles['c-form__err']}`}>{errForPassword}</span>
                            </div>
                            <div className={`${styles['c-form__input']}`}>
                                <label><input type='checkbox' checked={this.state.showPassword}
                                              onChange={this.handleToggle}/>显示密码</label>
                            </div>
                        </div>
                        <div className={styles.loginFormBtm}>
                            <span className={styles['c-form__err']}>{this.props.loginErr}</span>
                            <input type='submit' value='登录' className={`${styles['c-form__btn']}`}/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});
