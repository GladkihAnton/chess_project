import {updateSessionData} from '../../../redux/actions/actions'
import request from '../../../utils/request'

export function getSessionData(store) {

    let a = request.get('/get-session-data',
        {
            cache: 'no-cache',
            // crossDomain: true, // todo убрать мб лишнее
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            return response['data'];
        })
        .then((data) => {
            store.dispatch(updateSessionData(data));
        });
    console.log(a);
}