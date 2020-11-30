import { 
    SKIP_ITEMS
} from '../actions/actions'

export default function skipItems(skip, take) {
    return dispatch => {
        dispatch(skip(skip, take))
    }

    function skip(skip, take) {
        return {
            type: SKIP_ITEMS,
            payload: {
                skip: skip,
                take: take
            }
        }
    }
}