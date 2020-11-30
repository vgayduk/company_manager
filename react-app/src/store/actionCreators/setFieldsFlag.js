import { SET_FIELDS } from '../actions/actions'

export default function  setFieldsFlag(newState) {
    return dispatch => {
        dispatch(setFlag(newState))
    }

    function setFlag(newState) {
        return {
            type: SET_FIELDS,
            payload: newState
        }
    }
}