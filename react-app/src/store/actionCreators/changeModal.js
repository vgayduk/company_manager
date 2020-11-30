import {
    OPEN_MODAL,
    CLOSE_MODAL
} from '../actions/actions'

export default function changeModal(newFormState, value) {
    return dispatch => {
        if (newFormState) {
            dispatch(openModal())
        } else {
            dispatch(closeModal())
        }
    }

    function openModal() {
        return  {
            type: OPEN_MODAL,
            payload: value
        }
    }

    function closeModal() {
        return  {
            type: CLOSE_MODAL
        }
    }
}