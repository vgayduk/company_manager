import { 
    GET_ALL_USERS
} from '../actions/actions'

export default function getAllUsers(jwt, user, options = {
    orderBy: 'createdAt',
    ordering: 'ASC',
    skip: 0,
    take: 10
}) {
    return dispatch => {
        fetch(`http://localhost:8080/user/all${options.orderBy}/${options.ordering}?skip=${options.skip}&take=${options.take}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({user: {role: user.role}})
        })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(res => {
            if (options.skip > 0 && !res.length) return res;
            dispatch(getSuccessfull(res, options.skip, options.take))
        })
        .catch(err => console.log(err))
    }

    function getSuccessfull(users, skip, take) {
        return {
            type: GET_ALL_USERS,
            payload: {
                users,
                skip,
                take
            }
        }
    }
}