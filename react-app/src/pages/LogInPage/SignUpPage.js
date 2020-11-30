import React, { useEffect } from 'react';
import './SignUpPage.css';
import { MdEmail, MdPermIdentity, MdPhone, MdWork, MdLockOutline, MdDescription } from "react-icons/md";

import { useDispatch, useSelector } from 'react-redux';

import registerUser from '../../store/actionCreators/registerUser';
import changeModal from '../../store/actionCreators/changeModal';
import changeInput from '../../store/actionCreators/changeInput';

import Logo from '../../components/Logo/Logo';
import RedirectLink from '../../components/RedirectLink/RedirectLink';
import Modal from '../../components/Modal/Modal';

export default function SignUpPage() {
    const dispatch = useDispatch();

    const modal = useSelector(state => state.modal)
    const emailValue = useSelector(state => state.emailValue);
    const passwordValue = useSelector(state => state.passwordValue);
    const firstNameValue = useSelector(state => state.firstNameValue);
    const lastNameValue = useSelector(state => state.lastNameValue);
    const nickNameValue = useSelector(state => state.nickNameValue);
    const phoneValue = useSelector(state => state.phoneValue);
    const positionValue = useSelector(state => state.positionValue);
    const descriptionValue = useSelector(state => state.descriptionValue);

    useEffect(() => {
        setEmptyFields()
    }, []);

    function changeInputDispatch(value, input) {
        dispatch(changeInput(value, input))
    }

    function changeInputHandler(e) {
        changeInputDispatch(e.target.value, e.target.getAttribute('data-change-value'))
    }

    function sendForm(e) {
        e.preventDefault();

        const user = {
            email: emailValue,
            password: passwordValue,
            firstName: firstNameValue,
            lastName: lastNameValue,
            nickname: nickNameValue,
            phoneNumber: phoneValue,
            position: positionValue,
            description: descriptionValue
        }

        for (let key in user) {
            if (user[key] === '') {
                openModal('please fill in all fields');
                return;
            } 
        }

        if (user.password.length < 6) {
            openModal('Your password must contain 6 or more symbols');
            return;
        }

        dispatch(registerUser(user))
    }

    function openModal(text) {
        dispatch(changeModal(true, text))
    }

    function setEmptyFields() {
        changeInputDispatch('', "firstNameValue")
        changeInputDispatch('', "lastNameValue")
        changeInputDispatch('', "nickNameValue")
        changeInputDispatch('', "phoneValue")
        changeInputDispatch('', "positionValue")
        changeInputDispatch('', "descriptionValue")
    }

    return (
        <div className="signup-page-wrapper">
            <Logo/>

            <div>
                <form className="signup-form" onSubmit={sendForm}>
                    <h2>Registration screen</h2>
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
                            <input onChange={changeInputHandler} data-change-value="emailValue" type="email" name="email" placeholder="E-mail" value={emailValue || ''}/>
                        </div>
                        <div>
                            <MdLockOutline/>
                            <input onChange={changeInputHandler} data-change-value="passwordValue" type="password" name="password" placeholder="Password" value={passwordValue || ''}/>
                        </div>
                        <div>
                            <MdDescription/>
                            <textarea onChange={changeInputHandler} data-change-value="descriptionValue" name="description" placeholder="Description" value={descriptionValue || ''}/>
                        </div>
                    </div>
                    <input className="submit" type="submit" name="submit" value="Register" />
                </form>

                <div className="login-ref">
                    <div>
                        <p>Already registered?<br/>Go to main page<br/>and</p>
                        <RedirectLink className="submit" title={"Log In"} linkTo={"/"} />
                    </div>
                </div>
            </div>

            <Modal visible={modal}/>
        </div>
    )
}