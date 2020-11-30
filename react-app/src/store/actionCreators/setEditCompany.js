import { 
    SET_EDIT_COMPANY
} from '../actions/actions'

export default function setEditCompany(company, options = {
    redirect: true
}) {
    return dispatch => {
        dispatch(setCompany(company))
        if (options.redirect) window.location.href = '/editCompany'
    }

    function setCompany(company) {
        return {
            type: SET_EDIT_COMPANY,
            payload: company
        }
    }
}