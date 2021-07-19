import store from "../../redux/store";
import {updateAuthentication, updatePlayerId} from "../../redux/actions/auth";

export function doLogin(accessToken) {
    const parsedToken = _parseJwt(accessToken);

    localStorage.setItem('expiresAt', parsedToken['exp']);
    localStorage.setItem('accessToken', accessToken);

    store.dispatch(updateAuthentication(true));
    store.dispatch(updatePlayerId(parsedToken['player_id']));
}

export function doLogout() {
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('accessToken');

    store.dispatch(updateAuthentication(false));
    store.dispatch(updatePlayerId(null));
}

function _parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}