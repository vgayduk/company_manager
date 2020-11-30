import {
    OPEN_MODAL,
    COMPANY_SUCCESSFULLY_CREATED
} from '../actions/actions'

export default function createCompany(jwt, company, user) {
    return async dispatch => {
        let existed = false;

        await fetch(`http://localhost:8080/company/findByName${company.name.trim()}`, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(res => {
            existed = true;
        })
        .catch(err => console.log('error: ', err))

        if (existed) {
            dispatch(openModal('Company with this name is already existed'));
            return;
        }

        fetch(`http://localhost:8080/company/${user.id}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({company})
        })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(() => {
            dispatch(createdSuccessfully(company))
            window.location.href = '/myCompanies'
        })
        .catch(err => console.log(err))

        function createdSuccessfully(company) {
            return {
                type: COMPANY_SUCCESSFULLY_CREATED,
                payload: company
            }
        }

        function openModal(value) {
            return  {
                type: OPEN_MODAL,
                payload: value
            }
        }
    }
}