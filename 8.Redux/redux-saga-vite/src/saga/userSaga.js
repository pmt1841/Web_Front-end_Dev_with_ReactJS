import axios from "axios";
import {put, takeLatest} from "redux-saga/effects";
import {
    FETCH_USER,
    FETCH_USER_SUCCESS,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from "../redux/action.js";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

function* getUser() {
    try {
        const response = yield axios.get(BASE_URL);
        yield put({type: FETCH_USER_SUCCESS, payload: response.data});
    } catch (err) {
        console.log("Fetch user error: ", err);
    }
}

function* authSagaFun(action) {
    const user = action.payload;
    if (user.username === "admin" && user.password === "letmein") {
        yield put({type: LOGIN_SUCCESS, payload: user});
        yield put({type: FETCH_USER, payload: {}});
    } else {
        yield put({type: LOGIN_ERROR, payload: "Tên đăng nhập hoặc mật khẩu không đúng!"});
    }
}

export default function* rootSaga() {
    yield takeLatest(LOGIN, authSagaFun);
    yield takeLatest(FETCH_USER, getUser);
}