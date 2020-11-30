import React from 'react';
import './HeaderNav.css';

import { useDispatch, useSelector } from 'react-redux';
import changeLogInForm from '../../store/actionCreators/changeLogInForm';
import logOut from '../../store/actionCreators/logOut';

import RedirectLink from '../RedirectLink/RedirectLink';

export default function HeaderNav(props) {
    const dispatch = useDispatch()
    const loggedIn = useSelector(state => state.loggedIn);

    function openLogInForm() {
        dispatch(changeLogInForm(true))
    }

    function sendLogOut() {
        dispatch(logOut())
    }

    return (
        <nav>
            <ul>
                <li><RedirectLink title={"Home"} linkTo={"/"} /></li>
                <li><RedirectLink title={"About us"} linkTo={"/"} /></li>
                <li><RedirectLink title={"Public Companies"} linkTo={"/publicCompanies"} private={true} /></li>
                <li><RedirectLink title={"Profile"} linkTo={"/profile"} private={true} /></li>
                <li><RedirectLink title={"My Companies"} linkTo={"/myCompanies"} private={true} /></li>
            </ul>

            <div className="login" onClick={loggedIn ? sendLogOut : openLogInForm} style={{
                display: props.logIn ? 'block' : 'none'
            }}>
                <p>{loggedIn ? "Log Out" : "Log In"}</p>
            </div>
        </nav>
    )
}
