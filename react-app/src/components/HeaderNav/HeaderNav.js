import React from 'react';
import './HeaderNav.css';

import { useDispatch, useSelector } from 'react-redux';
import changeLogInForm from '../../store/actionCreators/changeLogInForm';
import changeBurger from '../../store/actionCreators/changeBurger';
import logOut from '../../store/actionCreators/logOut';

import RedirectLink from '../RedirectLink/RedirectLink';

export default function HeaderNav(props) {
    const dispatch = useDispatch()
    const loggedIn = useSelector(state => state.loggedIn);
    const user = useSelector(state => state.user);
    const burgerMenu = useSelector(state => state.burgerMenu);

    function openLogInForm() {
        dispatch(changeLogInForm(true))
    }

    function sendLogOut() {
        dispatch(logOut())
    }

    function burgerHandler(e) {
        dispatch(changeBurger())
    }

    function renderUserLinks(burger) {
        if (burger) {
            return (
                <div className={`burger-menu ${burgerMenu ? 'active' : ''}`}>
                    <ul>
                        <li><RedirectLink title={"Home"} linkTo={"/"} /></li>
                        <li><RedirectLink title={"Public Companies"} linkTo={"/publicCompanies"} private={true} /></li>
                        <li><RedirectLink title={"Profile"} linkTo={"/profile"} private={true} /></li>
                        <li><RedirectLink title={"My Companies"} linkTo={"/myCompanies"} private={true} /></li>
                    </ul>
                </div>
            )
        } else {
            return (
                <ul>
                    <li><RedirectLink title={"Home"} linkTo={"/"} /></li>
                    <li><RedirectLink title={"Public Companies"} linkTo={"/publicCompanies"} private={true} /></li>
                    <li><RedirectLink title={"Profile"} linkTo={"/profile"} private={true} /></li>
                    <li><RedirectLink title={"My Companies"} linkTo={"/myCompanies"} private={true} /></li>
                </ul>
            )
        }
    }

    function renderAdminLinks(burger) {
        if (burger) {
            return (
                <div className={`burger-menu ${burgerMenu ? 'active' : ''}`}>
                    <ul>
                    <li><RedirectLink title={"Home"} linkTo={"/"} /></li>
                <li><RedirectLink title={"All Users"} linkTo={"/viewAllUsers"} /></li>
                <li><RedirectLink title={"All Companies"} linkTo={"/viewAllCompanies"} private={true} /></li>
                <li><RedirectLink title={"Admin Profile"} linkTo={"/profile"} private={true} /></li>
                <li><RedirectLink title={"My Companies"} linkTo={"/myCompanies"} private={true} /></li>
                    </ul>
                </div>
            )
        } else {
            return (
                <ul>
                    <li><RedirectLink title={"Home"} linkTo={"/"} /></li>
                    <li><RedirectLink title={"All Users"} linkTo={"/viewAllUsers"} /></li>
                    <li><RedirectLink title={"All Companies"} linkTo={"/viewAllCompanies"} private={true} /></li>
                    <li><RedirectLink title={"Admin Profile"} linkTo={"/profile"} private={true} /></li>
                    <li><RedirectLink title={"My Companies"} linkTo={"/myCompanies"} private={true} /></li>
                </ul>
            )
        }
    }

    return (
        <nav>
            {user && user.role === 'admin' ? renderAdminLinks() : renderUserLinks()}

            <div className="login" onClick={loggedIn ? sendLogOut : openLogInForm} style={{
                display: props.logIn ? 'block' : 'none'
            }}>
                <p>{loggedIn ? "Log Out" : "Log In"}</p>
            </div>

            <div className={`burger-button ${burgerMenu ? 'active' : ''}`} onClick={burgerHandler}>
                <div/>
                <div/>
                <div/>
            </div>

            {user && user.role === 'admin' ? renderAdminLinks(true) : renderUserLinks(true)}
        </nav>
    )
}
