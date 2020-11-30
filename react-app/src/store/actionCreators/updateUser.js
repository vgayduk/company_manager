import {
    UPDATE_USER
} from '../actions/actions'

export default function updateUser(jwt, id, user) {
    return dispatch => {
        fetch(`http://localhost:8080/user/${id}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({user: user})
        })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(res => {
            dispatch(sendUpdate(res))
            localStorage.setItem('user', JSON.stringify(res))
            localStorage.setItem('companies', JSON.stringify(JSON.parse(res).company))
        })
        .catch(err => console.log(err))
    }

    function sendUpdate() {
        return {
            type: UPDATE_USER,
            payload: user
        }
    }
}