import { CHANGE_INPUT } from '../actions/actions'

export default function changeInput(value, input) {
    return dispatch => {
        if (input === 'phoneValue') {
            const phoneValue = parseInt(value, 10);
            if (!isNaN(phoneValue) || value === '') {
                dispatch(sendNewValue(phoneValue, input))
            }
        } else {
            dispatch(sendNewValue(value, input))
        }
    }

    function sendNewValue(value, input) {
        return {
            type: CHANGE_INPUT,
            payload: {
                value,
                input
            }
        }
    }
}