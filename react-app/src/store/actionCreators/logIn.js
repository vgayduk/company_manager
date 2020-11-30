import {
    LOG_IN_SECCESS,
    LOG_IN_FAILURE,
    OPEN_MODAL
} from '../actions/actions'

export default function logIn(email, password) {
    return dispatch => {
        const body = {
            email: email, 
            password: password
        }

        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(res => {
            localStorage.setItem('jwt', res.access_token);
            localStorage.setItem('user', res.user)
            dispatch(logInSuccess(JSON.parse(res.user)))
        })
        .catch(err => {
            dispatch(openModal('There is no such user with this email and password'))
            dispatch(logInFailure(err))
        })
    }

    function logInSuccess(res) {
        return {
            type: LOG_IN_SECCESS,
            payload: res
        }
    }

    function logInFailure(error) {
        return {
            type: LOG_IN_FAILURE,
            payload: {
                error
            }
        }
    }

    function openModal(value) {
        return  {
            type: OPEN_MODAL,
            payload: value
        }
    }
}