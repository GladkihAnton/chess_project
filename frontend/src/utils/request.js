import axios from 'axios'
import configFile from '../config.json'
import store from '../redux/store'

const config = {
    baseURL: configFile.SERVER_URL,
    headers: {'Authorization': 'asdasd'},
    withCredentials: true
}

if (store.getState().profile.accessToken) {
    config.headers['Authorization'] = `Bearer ${store.getState().profile.accessToken}`
}

const request = axios.create(config);

// request.interceptors.request.use(async (config) => {
//     const expireAt = localStorage.getItem('expiresAt');
//     let token = localStorage.getItem('accessToken');
//     if (dayjs(expireAt).diff(dayjs()) < 1) {
//         const data = fetch('/refresh-token',
//             {
//         method: 'POST',
//         body: JSON.stringify({'access_token': token}), // данные могут быть 'строкой' или {объектом}!
//         headers: {
//           'Content-Type': 'application/json'
//         }
//         })
//         .then((response) => {
//             return response['data'];
//         })
//         .then((data) => {
//             store.dispatch(updateSessionData(data));
//     });
//
//     token = typeof data === 'string' ? data : await data();
//   }
//   // setting updated token
//   // localStorage.setItem('authToken', token);
//   //   console.log('ypa');
//     delete config.headers['Authorization'];
//     return config;
// }, (err) => {
//    console.log("error in getting ",err)
// });

export default request