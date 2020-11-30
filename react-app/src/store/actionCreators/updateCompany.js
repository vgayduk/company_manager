import {
    UPDATE_COMPANY
} from '../actions/actions'

export default function updateCompany(jwt, id, company) {
    return dispatch => {
        fetch(`http://localhost:8080/company/${id}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({company: company})
        })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(res => {
            dispatch(sendUpdate(res))
            localStorage.setItem('currentCompany', JSON.stringify(res))
        })
        .catch(err => console.log(err))
    }

    function sendUpdate(company) {
        return {
            type: UPDATE_COMPANY,
            payload: company
        }
    }
}