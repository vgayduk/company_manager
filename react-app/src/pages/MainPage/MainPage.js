import React, { useEffect } from 'react';
import './MainPage.css';

import { useDispatch, useSelector } from 'react-redux';
import logInCheck from '../../store/actionCreators/logInCheck';

import HeaderNav from '../../components/HeaderNav/HeaderNav';
import Logo from '../../components/Logo/Logo';
import LogInForm from '../../components/LogInForm/LogInForm';
import Modal from '../../components/Modal/Modal';
import changeModal from '../../store/actionCreators/changeModal';

export default function MainPage() {
    const dispatch = useDispatch();
    const logInForm = useSelector(state => state.logInForm);
    const modal = useSelector(state => state.modal);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        dispatch(logInCheck(jwt, false))
    }, [dispatch])

    function openModal(text) {
        dispatch(changeModal(true, text))
    }

    return (
        <div className="wrapper">
            <header className="main">
                <Logo/>
                <HeaderNav logIn={true}/>
            </header>

            <section className="inspiration">
                <p>There are only <span>you</span> and your <span>companies</span></p>
            </section>

            <LogInForm visible={logInForm}/>

            <Modal visible={modal}/>
        </div>
    )
}