import {updateAuthentication} from '../../../redux/actions/auth'
import request from '../../../utils/request'

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
                store.dispatch(updateAuthentication(true));
            }
        }).catch((err) => {
            console.log(err);
            store.dispatch(updateAuthentication(false));
        })
}