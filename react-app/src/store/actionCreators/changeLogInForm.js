import {
    LOG_IN_OPEN,
    LOG_IN_CLOSE
} from '../actions/actions'

export default function changeLogInForm(newFormState) {
    return dispatch => {
        if (newFormState) {
            dispatch(openLogInForm())
        } else {
            dispatch(closeLogInForm())
        }
    }

    function openLogInForm() {
        return  {
            type: LOG_IN_OPEN
        }
    }

    function closeLogInForm() {
        return  {
            type: LOG_IN_CLOSE
        }
    }
}