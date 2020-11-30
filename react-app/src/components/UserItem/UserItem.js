import React from 'react';
import './UserItem.css';
import { MdRemoveRedEye, MdModeEdit } from "react-icons/md";

import { useDispatch } from 'react-redux';
import setCurrentUser from '../../store/actionCreators/setCurrentUser';

export default function UserItem(props) {
    const dispatch = useDispatch();

    function openUserInfo() {
        localStorage.setItem('currentUser', JSON.stringify(props.user));
        dispatch(setCurrentUser(props.user))
        window.location.href = '/userDetails'
    }

    function openEditUser() {
        localStorage.setItem('currentUser', JSON.stringify(props.user));
        dispatch(setCurrentUser(props.user))
        window.location.href = '/editCurrentUser'
    }

    return (
        <div className="user-item">
            <div className="names">
                <p className="usernames">{props.user.firstName + ' ' + props.user.lastName}</p>
                <p className="nick-name">Also known as {props.user.nickname}</p>
            </div>
            <p><span>Role: </span>{props.user.role}</p>
            <p><span>E-mail: </span>{props.user.email}</p>
            <p><span>Position: </span>{props.user.position}</p>
            <p><span>Phone: </span>{props.user.phoneNumber}</p>
            <div className="description">
                <p>{props.user.description}</p>
            </div>
            <div className="buttons">
                <div className="btn" onClick={openUserInfo}><MdRemoveRedEye/></div>
                <div className="btn" onClick={openEditUser}><MdModeEdit/></div>
            </div>
        </div>
    )
}