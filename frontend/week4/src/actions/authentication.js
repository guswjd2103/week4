//액션 생성자 함수와 thunk를 정의
import axios from 'axios';
import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE
} from './ActionTypes';

export function loginRequest(username, password) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());
   
        // API REQUEST
        return axios.post('/api/account/login', { username, password }) //loginRequest가 실행되면 thunk함수의 인자를 post에 전송
        .then((response) => {
            // SUCCEED
            dispatch(loginSuccess(username));
        }).catch((error) => {
            // FAILED
            dispatch(loginFailure());
        });
    };
}
   
export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}
  
/* REGISTER */
export function registerRequest(username, password) { //thunk
    return (dispatch) => {
        // Inform Register API is starting
        dispatch(register()); //action.type = AUTH_REGISTER 인 액션객체를 리듀서로 보내 회원가입 요청 시작
 
        return axios.post('/api/account/signup', { username, password })
            .then((response) => {
                dispatch(registerSuccess());
            }).catch((error) => {
                dispatch(registerFailure(error.response.data.code));
        });
    };
}
 
export function register() {
    return {
        type: AUTH_REGISTER
    };
}
 
export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS,
    };
}
 
export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}

