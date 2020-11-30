import React, { useEffect } from 'react';
import './ProfilePage.css';

import { useDispatch, useSelector } from 'react-redux';
import logInCheck from '../../store/actionCreators/logInCheck';
import deleteAccaunt from '../../store/actionCreators/deleteAccaunt';
import changeInput from '../../store/actionCreators/changeInput';

import HeaderNav from '../../components/HeaderNav/HeaderNav';
import Logo from '../../components/Logo/Logo';
import RedirectLink from '../../components/RedirectLink/RedirectLink';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);
    const user = useSelector(state => state.user);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        dispatch(logInCheck(jwt, {
            redirect: true
        }))
        setFields()
    }, [dispatch]);

    if (!loggedIn) return <div/>

    function setFields() {
        if (!user) return
        changeInputDispatch(user.firstName, "firstNameValue")
        changeInputDispatch(user.lastName, "lastNameValue")
        changeInputDispatch(user.nickname, "nickNameValue")
        changeInputDispatch(user.phoneNumber, "phoneValue")
        changeInputDispatch(user.position, "positionValue")
        changeInputDispatch(user.description, "descriptionValue")
    }
    
    function changeInputDispatch(value, input) {
        dispatch(changeInput(value, input))
    }

    function deleteAccauntHandler() {
        dispatch(deleteAccaunt(localStorage.getItem('jwt'), user.id))
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
                        <p className="name">{user.firstName + ' ' + user.lastName}</p>
                        <p className="nick-name">{`Also known as ${user.nickname}`}</p>
                    </div>

                    <div>
                        <p><span>E-mail: </span>{user.email}</p>
                    </div>

                    <div>
                        <p><span>Phone: </span>{user.phoneNumber}</p>
                    </div>

                    <div>
                        <p><span>Position: </span>{user.position}</p>
                    </div>

                    <div>
                        <p><span>Description: </span>{user.description}</p>
                    </div>

                    <div className="button-container">
                        <div onClick={deleteAccauntHandler} className="submit">Delete my accaunt</div>
                        <RedirectLink className="submit" title={"Edit my profile"} linkTo={"/editUser"} />
                    </div>
                </div>
            </section>
        </div>
    )
}