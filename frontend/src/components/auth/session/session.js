import {updateSessionData} from '../../../redux/actions/auth'
import request from '../../../utils/request'

export function getSessionData(store) {

    let a = request.get('/get-session-data',
        {
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    let c = request.get('/get-session-data',
        {
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    let b = request.get('/get-session-data',
        {
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    Promise.all([a, b, c]).then((data) => console.log('asd'));

        // .then((data) => {
        //     store.dispatch(updateSessionData(data));
        // });

}