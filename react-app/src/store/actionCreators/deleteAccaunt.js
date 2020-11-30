import { 
    DELETE_USER
} from '../actions/actions'

export default function deleteAccaunt(jwt, id, options = {
    adminDelete: false
}) {
    return dispatch => {
        fetch(`http://localhost:8080/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(() => {
            if (!options.adminDelete) {
                localStorage.removeItem('jwt')
                localStorage.removeItem('user')
                localStorage.removeItem('companies')
                dispatch(deleteUser())
                window.location.href = '/'
            } else {
                window.location.href = '/viewAllUsers'
            }
        })
        .catch(err => console.log(err))
    }

    function deleteUser() {
        return {
            type: DELETE_USER
        }
    }
}