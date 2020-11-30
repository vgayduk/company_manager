import React, { useEffect } from 'react';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

import { useDispatch, useSelector } from 'react-redux';
import logInCheck from '../../store/actionCreators/logInCheck';
import getAllUsers from '../../store/actionCreators/getAllUsers';
import changeInput from '../../store/actionCreators/changeInput';

import HeaderNav from '../../components/HeaderNav/HeaderNav';
import Logo from '../../components/Logo/Logo';
import UserItem from '../../components/UserItem/UserItem';

export default function AllUsersPage() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.user);
    const skipped = useSelector(state => state.skipped);
    const took = useSelector(state => state.took);

    const orderByValue = useSelector(state => state.orderByValue);
    const orderingWay = useSelector(state => state.orderingWay);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        dispatch(logInCheck(jwt, {
            redirect: true
        }))
    }, [dispatch]);

    useEffect(() => {
        if (user) dispatch(getAllUsers(localStorage.getItem('jwt'), user))
    }, [dispatch, user])

    if (!loggedIn) return <div/>

    function changeInputDispatch(value, input) {
        dispatch(changeInput(value, input))
    }

    function changeInputHandler(e) {
        changeInputDispatch(e.target.value, e.target.getAttribute('data-change-value'))
    }

    function filter(e) {
        e.preventDefault()

        dispatch(getAllUsers(localStorage.getItem('jwt'), user, {
            orderBy: orderByValue,
            ordering: orderingWay,
            skip: 0,
            take: took
        }))
    }

    function paginationNext() {
        dispatch(getAllUsers(localStorage.getItem('jwt'), user, {
            orderBy: orderByValue,
            ordering: orderingWay,
            skip: skipped + took,
            take: took
        }))
    }

    function paginationPrevious() {
        if (skipped - took > 0) {
            dispatch(getAllUsers(localStorage.getItem('jwt'), user, {
                orderBy: orderByValue,
                ordering: orderingWay,
                skip: skipped - took,
                take: took
            }))
        } else if (skipped - took <= 0) {
            dispatch(getAllUsers(localStorage.getItem('jwt'), user, {
                orderBy: orderByValue,
                ordering: orderingWay,
                skip: 0,
                take: took
            }))
        }
    }

    function renderCompanies() {
        return (
            <div className="users-container">
                {users.map((user, i) => (<UserItem key={i} user={user}/>))}
            </div>
        )
    }

     return (
        <div className="wrapper my-companies">
            <header className="my-companies">
                <Logo/>
                <HeaderNav/>
            </header>
            
            <section>
                <div className="control">
                    <form className="filter" onSubmit={filter}>
                        <p>Filter by:</p>
                        <select data-change-value="orderByValue" onChange={changeInputHandler} name="orderBy" value={orderByValue}>
                            <option value="createdAt">Date</option>
                            <option value="firstName">Name</option>
                            <option value="nickname">Nickname</option>
                            <option value="email">E-mail</option>
                        </select>
                        <select data-change-value="orderingWay" onChange={changeInputHandler} name="orderingWay" value={orderingWay}>
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select>

                        <input type="submit" className="submit" value="filter"></input>
                    </form>
                </div>
                {users.length ? renderCompanies() : <p className="no-companies">There is no users</p>}
            </section>

            <div className="pagination">
                {users.length && skipped > 0 ? <div className="submit" onClick={paginationPrevious}><MdNavigateBefore/></div> : null}
                {users.length === took && skipped >= 0 ? <div className="submit" onClick={paginationNext}><MdNavigateNext/></div> : null}                
            </div>
        </div>
     )
 }