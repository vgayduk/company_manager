import React from "react";

import { useDispatch, useSelector } from 'react-redux';
import logInCheck from '../../store/actionCreators/logInCheck';
import changeModal from '../../store/actionCreators/changeModal';

import { Link } from "react-router-dom";

export default function RedirectLink(props) {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loggedIn);

  let linkTo = '/';

  if (props.private) {
    linkTo = loggedIn ? props.linkTo : '/'
  } else {
    linkTo = props.linkTo;
  }

  async function loginCheck () {
    const jwt = localStorage.getItem('jwt');
    await dispatch(logInCheck(jwt))
    if (!loggedIn) openModal('Please log in first')
  }

  async function openModal(text) {
    dispatch(changeModal(true, text))
  }

  return (
    <Link onClick={props.private ? loginCheck : null} className={props.className} to={linkTo} >
      {props.title}
    </Link>
  );
}
