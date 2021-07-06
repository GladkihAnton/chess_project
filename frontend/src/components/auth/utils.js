import store from "../../redux/store";
import {updateAuthentication} from "../../redux/actions/auth";

export function doLogin(accessToken) {
    localStorage.setItem('expiresAt', _parseJwt(accessToken)['exp']);
    localStorage.setItem('accessToken', accessToken);
    store.dispatch(updateAuthentication(true));
}

export function doLogout() {
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('accessToken');
    store.dispatch(updateAuthentication(false));
}

function _parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}