import React, { useEffect } from 'react';
import './CreateCompanyPage.css';

import { useDispatch, useSelector } from 'react-redux';

import changeModal from '../../store/actionCreators/changeModal';
import changeInput from '../../store/actionCreators/changeInput';
import logInCheck from '../../store/actionCreators/logInCheck';
import createCompany from '../../store/actionCreators/createCompany';

import Logo from '../../components/Logo/Logo';
import RedirectLink from '../../components/RedirectLink/RedirectLink';
import Modal from '../../components/Modal/Modal';
import HeaderNav from '../../components/HeaderNav/HeaderNav';

export default function CreateCompanyPage() {
    const dispatch = useDispatch();

    const loggedIn = useSelector(state => state.loggedIn);

    const modal = useSelector(state => state.modal)
    const cNameValue = useSelector(state => state.cNameValue);
    const cAddressValue = useSelector(state => state.cAddressValue);
    const cServiceValue = useSelector(state => state.cServiceValue);
    const cEmployeesValue = useSelector(state => state.cEmployeesValue);
    const cDescriptionValue = useSelector(state => state.cDescriptionValue);
    const cTypeValue = useSelector(state => state.cTypeValue);
    const cPrivateValue = useSelector(state => state.cPrivateValue);
    const user = useSelector(state => state.user);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        dispatch(logInCheck(jwt, {
            redirect: true
        }));
        setEmptyFields()
    }, [dispatch]);

    if (!loggedIn) return <div/>

    function changeInputDispatch(value, input) {
        dispatch(changeInput(value, input))
    }

    function changeInputHandler(e) {
        changeInputDispatch(e.target.value, e.target.getAttribute('data-change-value'))
    }

    function sendForm(e) {
        e.preventDefault();

        const jwt = localStorage.getItem('jwt')

        const newCompany = {
            name: cNameValue,
            address: cAddressValue,
            serviceOfActivity: cServiceValue,
            numberOfEmployees: cEmployeesValue,
            description: cDescriptionValue,
            type: cTypeValue,
            private: cPrivateValue
        }

        for (let key in newCompany) {
            if (newCompany[key] === '' || Number.isNaN(newCompany[key])) {
                openModal('please fill in all fields');
                return;
            }
        }

        dispatch(createCompany(jwt, newCompany, user.id))
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
        <div className="create-company-wrapper">
            <header className="my-companies">
                <Logo/>
                <HeaderNav/>
            </header>

            <section>
                <form className="company create-company-form" onSubmit={sendForm}>
                    <h2>Company Creation</h2>
                    <div className="input-container">
                    <div>
                        
                        <input data-change-value="cNameValue" onChange={changeInputHandler} type="text" name="name" placeholder="Company name" value={cNameValue || ''}/>
                    </div>
                    <div>
                        
                        <input data-change-value="cAddressValue" onChange={changeInputHandler} type="text" name="address" placeholder="Address" value={cAddressValue || ''}/>
                    </div>
                    <div>
                        
                        <input data-change-value="cServiceValue" onChange={changeInputHandler} type="text" name="service" placeholder="Service" value={cServiceValue || ''}/>
                    </div>
                    <div>
                        
                        <input data-change-value="cEmployeesValue" onChange={changeInputHandler} type="number" name="employees" placeholder="Employees" value={cEmployeesValue || ''}/>
                    </div>
                    <div>
                        
                        <input data-change-value="cTypeValue" onChange={changeInputHandler} type="text" name="type" placeholder="Type" value={cTypeValue || ''}/>
                    </div>
                    <div>
                        <select data-change-value="cPrivateValue" onChange={changeInputHandler} name="isPrivate" value={cPrivateValue}>
                            <option value={true}>Only I can see this company</option>
                            <option value={false}>Everyone can see this company</option>
                        </select>
                    </div>
                    <div>
                        
                        <textarea data-change-value="cDescriptionValue" onChange={changeInputHandler} placeholder="Description" value={cDescriptionValue || ''}/>
                    </div>
                </div>
                    <input className="submit" type="submit" name="submit" value="Create" />
                </form>
            </section>

            <Modal visible={modal}/>
        </div>
    )
}