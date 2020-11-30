import { LOG_OUT } from '../actions/actions'

export default function logOut() {
    return dispatch => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('user')
        localStorage.removeItem('companies')
        localStorage.removeItem('currentCompany')
        dispatch(sendLogOut())
    }

    function sendLogOut() {
        return {
            type: LOG_OUT
        }
    }
}