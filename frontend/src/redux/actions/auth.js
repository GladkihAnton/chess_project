export const UPDATE_TOKEN_REFRESHING_ACTION='UPDATE_TOKEN_REFRESHING_ACTION';
export const UPDATE_AUTHENTICATION_ACTION='UPDATE_AUTHENTICATION_ACTION';
export const GET_SESSION_DATA_ACTION='GET_SESSION_DATA_ACTION';


export function updateTokenRefreshing(isRefreshing) {
    return {type: UPDATE_TOKEN_REFRESHING_ACTION, isRefreshing}
}

export function updateAuthentication(isAuthenticate) {
    return {type: UPDATE_AUTHENTICATION_ACTION, isAuthenticate}
}

export function updateSessionData(data) {
    return {type: GET_SESSION_DATA_ACTION, data}
}