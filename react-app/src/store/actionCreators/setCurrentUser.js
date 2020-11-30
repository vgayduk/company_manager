import { 
    SET_CURRENT_USER
} from '../actions/actions'

export default function setCurrentUser(user) {
    return dispatch => {
        dispatch(setCompany(user))
    }

    function setCompany(user) {
        return {
            type: SET_CURRENT_USER,
            payload: user
        }
    }
}