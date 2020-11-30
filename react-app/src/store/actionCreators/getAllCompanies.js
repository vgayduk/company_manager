import { 
    GET_COMPANIES
} from '../actions/actions'

export default function getAllCompanies(jwt, user, options = {
    orderBy: 'createdAt',
    ordering: 'ASC',
    skip: 0,
    take: 10
}) {
    return dispatch => {
        fetch(`http://localhost:8080/company/all${options.orderBy}/${options.ordering}?skip=${options.skip}&take=${options.take}`, {
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
            localStorage.setItem('companies', JSON.stringify(res))
        })
        .catch(err => console.log(err))
    }

    function getSuccessfull(companies, skip, take) {
        return {
            type: GET_COMPANIES,
            payload: {
                companies,
                skip,
                take
            }
        }
    }
}