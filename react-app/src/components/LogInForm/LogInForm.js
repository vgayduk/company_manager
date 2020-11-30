import React from 'react';
import './LogInForm.css';
import { MdEmail, MdLockOutline } from "react-icons/md";

import changeInput from '../../store/actionCreators/changeInput';
import { useDispatch, useSelector } from 'react-redux';
import changeLogInForm from '../../store/actionCreators/changeLogInForm';
import logIn from '../../store/actionCreators/logIn';
import changeModal from '../../store/actionCreators/changeModal';

import RedirectLink from '../../components/RedirectLink/RedirectLink';
import Modal from '../Modal/Modal'

export default function LogInForm(props) {
    const dispatch = useDispatch();
    const emailValue = useSelector(state => state.emailValue);
    const passwordValue = useSelector(state => state.passwordValue);
    const modal = useSelector(state => state.modal)

    function sendForm(e) {
        e.preventDefault();

        if (emailValue === '' || passwordValue === '') {
            openModal('please fill in all fields');
            return;
        }

        if (passwordValue.length < 6) {
            openModal('Your password must contain 6 or more symbols');
            return;
        }

        dispatch(logIn(emailValue, passwordValue))
    }

    function closeForm(e) {
        if (e.target === document.querySelector('.form-wrapper')) {
            dispatch(changeLogInForm(false));
        }
    }

    function openModal(text) {
        dispatch(changeModal(true, text))
    }

    function changeInputDispatch(value, input) {
        dispatch(changeInput(value, input))
    }

    function changeInputHandler(e) {
        changeInputDispatch(e.target.value, e.target.getAttribute('data-change-value'))
    }

    return <div onClick={closeForm} className="form-wrapper" style={{
        zIndex: props.visible ? 3 : -1,
        opacity: props.visible ? 1 : 0
    }}>
        <form className="login-form" onSubmit={sendForm}>
            <h2>Login screen</h2>
            <div className="input-container">
                <div>
                    <MdEmail/>
                    <input onChange={changeInputHandler} data-change-value="emailValue" type="email" name="email" placeholder="E-mail" value={emailValue || ''}/>
                </div>
                <div>
                    <MdLockOutline/>
                    <input onChange={changeInputHandler} data-change-value="passwordValue" type="password" name="password" placeholder="Password" value={passwordValue || ''}/>
                </div>
                </div>
            <input type="submit" name="submit" value="Log In" />
            <p>OR</p>
            <RedirectLink title={"Create new accaunt"} linkTo={"/signUp"} />
        </form>
        <Modal visible={modal}/>
    </div>
}