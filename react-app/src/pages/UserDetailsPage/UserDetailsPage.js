import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import logInCheck from '../../store/actionCreators/logInCheck';
import deleteAccaunt from '../../store/actionCreators/deleteAccaunt';
import setCurrentUser from '../../store/actionCreators/setCurrentUser';

import HeaderNav from '../../components/HeaderNav/HeaderNav';
import Logo from '../../components/Logo/Logo';
import RedirectLink from '../../components/RedirectLink/RedirectLink';

export default function UserDetailsPage() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);
    const currentUser = useSelector(state => state.currentUser);

    const localUser = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        dispatch(logInCheck(jwt, {
            redirect: true
        }))
        dispatch(setCurrentUser(localUser, {redirect: false}))
    }, [dispatch]);

    if (!loggedIn) return <div/>

    function deleteAccauntHandler() {
        dispatch(deleteAccaunt(localStorage.getItem('jwt'), currentUser.id, {
            adminDelete: true
        }))
    }

    return (
        <div className="wrapper profile">
            <header className="profile">
                <Logo/>
                <HeaderNav/>
            </header>
            
            <section>
                <div className="user-info">
                    <div className="names">
                        <p className="name">{currentUser.firstName + ' ' + currentUser.lastName}</p>
                        <p className="nick-name">{`Also known as ${currentUser.nickname}`}</p>
                    </div>

                    <div>
                        <p><span>E-mail: </span>{currentUser.email}</p>
                    </div>

                    <div>
                        <p><span>Phone: </span>{currentUser.phoneNumber}</p>
                    </div>

                    <div>
                        <p><span>Position: </span>{currentUser.position}</p>
                    </div>

                    <div>
                        <p><span>Description: </span>{currentUser.description}</p>
                    </div>

                    <div className="button-container">
                        <div onClick={deleteAccauntHandler} className="submit">Delete accaunt</div>
                        <RedirectLink className="submit" title={"Edit profile"} linkTo={"/editCurrentUser"} />
                    </div>
                </div>
            </section>
        </div>
    )
}