import axios from 'axios'
import configFile from '../config.json'
import {doLogout, doLogin} from '../components/auth/utils'
import store from "../redux/store";
import {updateTokenRefreshing} from "../redux/actions/auth";

const config = {
    baseURL: `http://${configFile.SERVER_URL}`,
    headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`},

    withCredentials: true
}

const request = axios.create(config);

request.interceptors.request.use(async (config) => {
    const expireAt = localStorage.getItem('expiresAt');
    let token = localStorage.getItem('accessToken');
    if (!store.getState().auth.isTokenRefreshing && token && expireAt - parseInt(new Date().getTime() / 1000) < 60) {
        console.log('try refresh');
        store.dispatch(updateTokenRefreshing(true));
        const response = await fetch(`http://${configFile.SERVER_URL}/auth/refresh-token`,
            {
                method: 'POST',
                body: JSON.stringify({'access_token': token}),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
        const data = await response.json();
        if ('error' in data) {
            switch (data['error']) {
                case 'token_is_invalid':
                    doLogout();
                    store.dispatch(updateTokenRefreshing(false));
                    return config;
            }
        } else if ('access_token' in data) {
            token = data['access_token'];
            doLogin(token);
        }

    }
    store.dispatch(updateTokenRefreshing(false));

    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
}, (err) => {
   console.log("error in getting ",err)
});

export default request