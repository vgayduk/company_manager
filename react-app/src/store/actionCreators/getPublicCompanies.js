import { 
    GET_COMPANIES
} from '../actions/actions'

export default function getPublicCompanies(jwt, options = {
    orderBy: 'createdAt',
    ordering: 'ASC',
    skip: 0,
    take: 10
}) {
    return dispatch => {
        fetch(`http://localhost:8080/company/${options.orderBy}/${options.ordering}?skip=${options.skip}&take=${options.take}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
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