import {
    LOG_IN_SECCESS,
    LOG_IN_FAILURE
} from '../actions/actions'

export default function logInCheck(jwt, options = {
    redirect: false
}) {
    return dispatch => {

        if (!jwt) {
            dispatch(logInFailure({statusCode: 401}))
            if (options.redirect) window.location.href = '/logInFirst'
            return
        }

        let userInfo = JSON.parse(localStorage.getItem('user'))

        fetch('http://localhost:8080/user/check', {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(() => {
            dispatch(logInSuccess(userInfo))
        })
        .catch(err => {
            localStorage.removeItem('jwt')
            localStorage.removeItem('user')
            localStorage.removeItem('companies')
            dispatch(logInFailure(err))
            if (options.redirect) window.location.href = '/logInFirst'
        })
    }
    
    function logInSuccess(user) {
        return {
            type: LOG_IN_SECCESS,
            payload: user
        }
    }

    function logInFailure(error) {
        return {
            type: LOG_IN_FAILURE,
            payload: error
        }
    }
}