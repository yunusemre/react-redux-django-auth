'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.actLogin = actLogin;
exports.actRegister = actRegister;
exports.actGetUser = actGetUser;
exports.actLogOut = actLogOut;
exports.actPasswordForgot = actPasswordForgot;
exports.actConfirmPassword = actConfirmPassword;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _antd = require('antd');

var _history = require('history');

var _actionTypes = require('./actionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _history.createBrowserHistory)();
function actLogin(data) {
    return function (dispatch) {
        dispatch({ type: _actionTypes.USER_LOGGING_IN });
        _axios2.default.post('/api/auth/login/', data).then(function (res) {
            _antd.message.success('Welcome');
            history.push('/');
            window.location.reload(true);
            dispatch({ type: _actionTypes.USER_LOGGED_IN, payload: res.data });
        }).catch(function (error) {
            _antd.message.error(Object.values(error.response.data)[0].toString());
            dispatch({ type: _actionTypes.USER_LOGGING_ERROR, message: error.response.data });
        });
    };
}

function actRegister(data) {
    return function (dispatch) {
        dispatch({ type: _actionTypes.USER_REGISTER_REQUEST });
        _axios2.default.post('/api/auth/register/', data).then(function (res) {
            _antd.message.success('User register');
            history.push('/login');
            window.location.reload(true);
            dispatch({ type: _actionTypes.USER_REGISTER_SUCCESS });
        }).catch(function (error) {
            dispatch({ type: _actionTypes.USER_REGISTER_FAILURE });
        });
    };
}

function actGetUser() {
    return function (dispatch) {
        dispatch({ type: _actionTypes.USER_REQUEST });
        _axios2.default.get('/api/auth/user/').then(function (res) {
            dispatch({ type: _actionTypes.USER_SUCCESS, payload: res.data });
        }).catch(function (error) {
            dispatch({ type: _actionTypes.USER_FAILURE, message: error.data });
        });
    };
}

function actLogOut() {
    return function (dispatch) {
        dispatch({ type: _actionTypes.LOGOUT_REQUEST });
        _axios2.default.post('/api/auth/logout/').then(function (res) {
            history.push('/auth/login');
            window.location.reload(true);
            dispatch({ type: _actionTypes.LOGOUT_SUCCESS });
        });
    };
}

function actPasswordForgot(data) {
    return function (dispatch) {
        dispatch({ type: _actionTypes.FORGOT_PASSWORD_REQUEST });
        _axios2.default.post('/api/auth/password/reset/', data).then(function (res) {
            history.push('/login');
            window.location.reload(true);
            dispatch({ type: _actionTypes.FORGOT_PASSWORD_SUCCESS });
        }).catch(function (error) {
            dispatch({ type: _actionTypes.FORGOT_PASSWORD_FAILURE });
        });
    };
}

function actConfirmPassword(data) {
    return function (dispatch) {
        dispatch({ type: _actionTypes.CONFIRM_PASSWORD_REQUEST });
        _axios2.default.post('/api/auth/password/reset/confirm/', data).then(function (res) {
            history.push('/login');
            window.location.reload(true);
            dispatch({ type: _actionTypes.CONFIRM_PASSWORD_SUCCESS });
        }).catch(function (error) {
            dispatch({ type: _actionTypes.CONFIRM_PASSWORD_FAILURE });
        });
    };
}