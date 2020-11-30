import React, { useEffect } from 'react';
import { MdEmail, MdPermIdentity, MdPhone, MdWork, MdLockOutline, MdDescription } from "react-icons/md";

import { useDispatch, useSelector } from 'react-redux';
import logInCheck from '../../store/actionCreators/logInCheck';
import changeModal from '../../store/actionCreators/changeModal';
import updateUser from '../../store/actionCreators/updateUser';
import changeInput from '../../store/actionCreators/changeInput';
import setFieldsFlag from '../../store/actionCreators/setFieldsFlag';
import setCurrentUser from '../../store/actionCreators/setCurrentUser';

import HeaderNav from '../../components/HeaderNav/HeaderNav';
import Logo from '../../components/Logo/Logo';
import RedirectLink from '../../components/RedirectLink/RedirectLink';
import Modal from '../../components/Modal/Modal';

export default function EditCurrentUserPage() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);
    const modal = useSelector(state => state.modal)
    const currentUser = useSelector(state => state.currentUser);

    const emailValue = useSelector(state => state.emailValue);
    const passwordValue = useSelector(state => state.passwordValue);
    const firstNameValue = useSelector(state => state.firstNameValue);
    const lastNameValue = useSelector(state => state.lastNameValue);
    const nickNameValue = useSelector(state => state.nickNameValue);
    const phoneValue = useSelector(state => state.phoneValue);
    const positionValue = useSelector(state => state.positionValue);
    const descriptionValue = useSelector(state => state.descriptionValue);

    const localUser = JSON.parse(localStorage.getItem('currentUser'));

    const isFieldsSet = useSelector(state => state.isFieldsSet);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        dispatch(logInCheck(jwt, {
            redirect: true
        }));
        dispatch(setCurrentUser(localUser, {redirect: false}))
    }, [dispatch]);

    if (!loggedIn) return <div/>

    function setFields() {
        changeInputDispatch(currentUser.firstName, "firstNameValue")
        changeInputDispatch(currentUser.lastName, "lastNameValue")
        changeInputDispatch(currentUser.nickname, "nickNameValue")
        changeInputDispatch(currentUser.phoneNumber, "phoneValue")
        changeInputDispatch(currentUser.position, "positionValue")
        changeInputDispatch(currentUser.description, "descriptionValue")
        dispatch(setFieldsFlag(true))
    }
    
    function changeInputDispatch(value, input) {
        dispatch(changeInput(value, input))
    }

    function changeInputHandler(e) {
        changeInputDispatch(e.target.value, e.target.getAttribute('data-change-value'))
    }

    function openModal(text) {
        dispatch(changeModal(true, text))
    }

    function sendForm(e) {
        e.preventDefault();
        const jwt = localStorage.getItem('jwt')

        const newUser = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            nickname: nickNameValue,
            phoneNumber: phoneValue,
            position: positionValue,
            description: descriptionValue
        }

        if (emailValue) newUser.email = emailValue
        if (passwordValue) newUser.password = passwordValue

        for (let key in newUser) {
            if (newUser[key] === '' || Number.isNaN(newUser[key])) {
                openModal('please fill in all fields');
                return;
            }
        }

        if (newUser.password && newUser.password.length < 6) {
            openModal('Your new password must contain 6 or more symbols');
            return;
        }

        let isInfoNew = false;

        for (let key in newUser) {
            if (newUser[key] !== currentUser[key] && newUser[key] !== Number.parseInt(currentUser[key])) {
                isInfoNew = true;
                break;
            } 
        }

        if (!isInfoNew) {
            openModal('You haven\'t changed your info')
            return;
        }

        dispatch(updateUser(jwt, currentUser.id, newUser, {
            adminChange: true
        }))

        openModal('Your info has been successfully updated')
    }

    function renderForm() {
        if (!isFieldsSet) {
            setFields();
        }

        return (
            <form className="edit-user edit-form" onSubmit={sendForm} name='editUser'>
                <h2>Edit user's info</h2>
                <div className="input-container">
                    <div>
                        <MdPermIdentity/>
                        <input onChange={changeInputHandler} data-change-value="firstNameValue" type="text" name="firstName" placeholder="First name" value={firstNameValue || ''}/>
                    </div>
                    <div>
                        <MdPermIdentity/>
                        <input onChange={changeInputHandler} data-change-value="lastNameValue" type="text" name="lastName" placeholder="Last name" value={lastNameValue || ''}/>
                    </div>
                    <div>
                        <MdPermIdentity/>
                        <input onChange={changeInputHandler} data-change-value="nickNameValue" type="text" name="nickName" placeholder="Nickname" value={nickNameValue || ''}/>
                    </div>
                    <div>
                        <MdPhone/>
                        <input onChange={changeInputHandler} data-change-value="phoneValue" type="tel" name="phoneNumber" placeholder="Phone number" value={phoneValue || ''}/>
                    </div>
                    <div>
                        <MdWork/>
                        <input onChange={changeInputHandler} data-change-value="positionValue" type="text" name="position" placeholder="Position" value={positionValue || ''}/>
                    </div>
                    <div>
                        <MdEmail/>
                        <input onChange={changeInputHandler} data-change-value="emailValue" type="email" name="email" placeholder="New E-mail (optional)" value={emailValue || ''}/>
                    </div>
                    <div>
                        <MdLockOutline/>
                        <input onChange={changeInputHandler} data-change-value="passwordValue" type="password" name="password" placeholder="New password (optional)" value={passwordValue || ''}/>
                    </div>
                    <div>
                        <MdDescription/>
                        <textarea onChange={changeInputHandler} data-change-value="descriptionValue" name="description" placeholder="Description" value={descriptionValue || ''}/>
                    </div>
                </div>
                <div className="button-container">
                    <RedirectLink className="submit" title={"Go to main"} linkTo={"/"} />
                    <input className="submit" type="submit" name="submit" value="Save" />
                </div>
            </form>
        )
    }

    return (
        <div className="wrapper profile">
            <header className="profile">
                <Logo/>
                <HeaderNav/>
            </header>
            
            <section>
                {currentUser ? renderForm() : 'Choose a user'}
            </section>
            
            <Modal visible={modal}/>
        </div>
    )
}