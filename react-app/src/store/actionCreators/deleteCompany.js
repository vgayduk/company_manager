import { 
    DELETE_COMPANY
} from '../actions/actions'

export default function deleteCompany(jwt, id) {
    return dispatch => {
        fetch(`http://localhost:8080/company/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(() => {
            dispatch(deleteCompany())
            window.location.href = '/myCompanies'
        })
        .catch(err => console.log(err))
    }

    function deleteCompany() {
        return {
            type: DELETE_COMPANY
        }
    }
}