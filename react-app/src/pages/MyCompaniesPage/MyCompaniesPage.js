import React, { useEffect } from 'react';
import './MyCompaniesPage.css';
import { MdAdd } from "react-icons/md";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

import { useDispatch, useSelector } from 'react-redux';
import logInCheck from '../../store/actionCreators/logInCheck';
import getCompanies from '../../store/actionCreators/getCompanies';
import changeInput from '../../store/actionCreators/changeInput';

import HeaderNav from '../../components/HeaderNav/HeaderNav';
import Logo from '../../components/Logo/Logo';
import CompanyItem from '../../components/CompanyItem/CompanyItem';

export default function MyCompaniesPage() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);
    const companies = useSelector(state => state.companies);
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
        if (user) dispatch(getCompanies(localStorage.getItem('jwt'), user.id))
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

        dispatch(getCompanies(localStorage.getItem('jwt'), user.id, {
            orderBy: orderByValue,
            ordering: orderingWay,
            skip: 0,
            take: took
        }))
    }

    function createCompany() {
        window.location.href = '/createCompany'
    }

    function paginationNext() {
        dispatch(getCompanies(localStorage.getItem('jwt'), user.id, {
            orderBy: orderByValue,
            ordering: orderingWay,
            skip: skipped + took,
            take: took
        }))
    }

    function paginationPrevious() {
        if (skipped - took > 0) {
            dispatch(getCompanies(localStorage.getItem('jwt'), user.id, {
                orderBy: orderByValue,
                ordering: orderingWay,
                skip: skipped - took,
                take: took
            }))
        } else if (skipped - took <= 0) {
            dispatch(getCompanies(localStorage.getItem('jwt'), user.id, {
                orderBy: orderByValue,
                ordering: orderingWay,
                skip: 0,
                take: took
            }))
        }
    }

    function renderCompanies() {
        return (
            <div className="companies-container">
                {companies.map((company, i) => (<CompanyItem key={i} company={company} publicCompany={false}/>))}
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
                    <div className="add-btn" onClick={createCompany}>
                        <MdAdd/>
                        <p>Add company</p>
                    </div>

                    <form className="filter" onSubmit={filter}>
                        <p>Filter by:</p>
                        <select data-change-value="orderByValue" onChange={changeInputHandler} name="orderBy" value={orderByValue}>
                            <option value="createdAt">Date</option>
                            <option value="name">Name</option>
                            <option value="serviceOfActivity">Service</option>
                            <option value="numberOfEmployees">Employees</option>
                        </select>
                        <select data-change-value="orderingWay" onChange={changeInputHandler} name="orderingWay" value={orderingWay}>
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select>

                        <input type="submit" className="submit" value="filter"></input>
                    </form>
                </div>
                {companies.length ? renderCompanies() : <p className="no-companies">You have no companies</p>}
            </section>

            <div className="pagination">
                {companies.length && skipped > 0 ? <div className="submit" onClick={paginationPrevious}><MdNavigateBefore/></div> : null}
                {companies.length === took && skipped >= 0 ? <div className="submit" onClick={paginationNext}><MdNavigateNext/></div> : null}                
            </div>
        </div>
     )
 }