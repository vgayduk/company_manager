import {
    OPEN_MODAL,
    COMPANY_SUCCESSFULLY_CREATED
} from '../actions/actions'

export default function createCompany(jwt, company, userId) {
    return async dispatch => {
        let existed = false;

        await fetch(`http://localhost:8080/company/findByName/${company.name.trim()}`)
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(() => {
            existed = true;
        })
        .catch(() => console.log('Company created'))

        if (existed) {
            dispatch(openModal('Company with this name is already existed'));
            return;
        }

        fetch(`http://localhost:8080/company/${userId}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({company: company})
        })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(res => {
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