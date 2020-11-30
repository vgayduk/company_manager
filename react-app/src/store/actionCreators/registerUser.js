import {
    LOG_IN_SECCESS,
    LOG_IN_FAILURE,
    OPEN_MODAL
} from '../actions/actions'

export default function registerUser(user) {
    return async dispatch => {
        let existed = false;
        
        const body = {
            user: user
        }
        
        await fetch(`http://localhost:8080/user/findByEmail${body.user.email.trim()}`)
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(res => {
            existed = true;
            console.log(res);
        })
        .catch(err => console.log(err))

        if (existed) {
            dispatch(openModal('User with this E-mail is already existed'));
            return;
        }

        fetch('http://localhost:8080/user', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(() => {
            const logInBody = {
                email: user.email, 
                password: user.password
            }
            fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logInBody)
            })
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(res => {
                localStorage.setItem('jwt', res.access_token)
                localStorage.setItem('user', res.user)
                dispatch(logInSuccess())
                window.location.href = 'http://localhost:3000'
            })
            .catch(err => {
                dispatch(logInFailure(err))
            })
        })
    }

    function logInSuccess() {
        return {
            type: LOG_IN_SECCESS
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