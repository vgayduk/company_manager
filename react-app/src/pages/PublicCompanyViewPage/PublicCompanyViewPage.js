import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import logInCheck from '../../store/actionCreators/logInCheck';
import setEditCompany from '../../store/actionCreators/setEditCompany';
import deleteCompany from '../../store/actionCreators/deleteCompany';

import HeaderNav from '../../components/HeaderNav/HeaderNav';
import Logo from '../../components/Logo/Logo';
import RedirectLink from '../../components/RedirectLink/RedirectLink';

export default function PublicCompanyViewPage() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);
    const user = useSelector(state => state.user);
    const company = useSelector(state => state.currentCompany);

    const localCompany = JSON.parse(localStorage.getItem('currentCompany'));

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        dispatch(logInCheck(jwt, {
            redirect: true
        }));
    }, [dispatch]);

    useEffect(() => {
        if(localCompany) {
            dispatch(setEditCompany(localCompany, {redirect: false}))
        } else if (user) {
            dispatch(setEditCompany(user.company[user.company.length - 1], {redirect: false}));
        }
    }, [dispatch, user])

    if (!loggedIn) return <div/>

    function deleteCompanyHandler() {
        dispatch(deleteCompany(localStorage.getItem('jwt'), company.id))
    }

    function renderCompany() {
        return (
            <div className="user-info">
                <div className="names">
                    <p className="name">{company.name}</p>
                </div>

                <div>
                    <p><span>Service: </span>{company.serviceOfActivity}</p>
                </div>

                <div>
                    <p><span>Address: </span>{company.address}</p>
                </div>

                <div>
                    <p><span>Employees: </span>{company.numberOfEmployees}</p>
                </div>

                <div>
                    <p><span>Type: </span>{company.type}</p>
                </div>

                <div>
                    <p><span>Private: </span>{company.private ? 'Private' : 'Public'}</p>
                </div>

                <div>
                    <p><span>Description: </span>{company.description}</p>
                </div>

                <div className="button-container">
                    <RedirectLink className="submit" title={"Back"} linkTo={"/myCompanies"} />
                </div>
            </div>
        )
    }

    return (
        <div className="wrapper profile">
            <header className="profile">
                <Logo/>
                <HeaderNav/>
            </header>
            
            <section>
                {company ? renderCompany() : <div>Loading...</div>}
            </section>
        </div>
    )
}