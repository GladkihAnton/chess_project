import {updateAuthentication} from '../../../redux/actions/auth'
import request from '../../../utils/request'
import {doLogin} from "../utils";

export function getSessionData(store) {
    request.get('/get-session-data',
        {
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            return response['data'];
        }).then((data) => {
            if (data['result'] === 'ok') {
                doLogin(localStorage.getItem('accessToken'));
            }
        }).catch((err) => {
            console.log(err);
            store.dispatch(updateAuthentication(false));
        })
}