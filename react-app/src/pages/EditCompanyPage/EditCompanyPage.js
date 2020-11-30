import React, { useEffect } from 'react';
import './EditCompanyPage.css';

import { useDispatch, useSelector } from 'react-redux';
import logInCheck from '../../store/actionCreators/logInCheck';
import changeModal from '../../store/actionCreators/changeModal';
import changeInput from '../../store/actionCreators/changeInput';
import setFieldsFlag from '../../store/actionCreators/setFieldsFlag';
import updateCompany from '../../store/actionCreators/updateCompany';
import setEditCompany from '../../store/actionCreators/setEditCompany';

import HeaderNav from '../../components/HeaderNav/HeaderNav';
import Logo from '../../components/Logo/Logo';
import RedirectLink from '../../components/RedirectLink/RedirectLink';
import Modal from '../../components/Modal/Modal';

export default function EditCompanyPage() {
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
    const company = useSelector(state => state.currentCompany);

    const isFieldsSet = useSelector(state => state.isFieldsSet);

    const user = useSelector(state => state.user);
    const localCompany = JSON.parse(localStorage.getItem('currentCompany'));

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        dispatch(logInCheck(jwt, {
            redirect: true
        }));
    }, [dispatch]);

    useEffect(() => {
        if(localCompany) {
            dispatch(setEditCompany(localCompany, {redirect: false}))
        } else if (user) {
            dispatch(setEditCompany(user.company[user.company.length - 1], {redirect: false}));
        }
    }, [dispatch, user])

    if (!loggedIn) return <div/>

    function setFields() {
        changeInputDispatch(company.name, "cNameValue")
        changeInputDispatch(company.address, "cAddressValue")
        changeInputDispatch(company.serviceOfActivity, "cServiceValue")
        changeInputDispatch(company.numberOfEmployees, "cEmployeesValue")
        changeInputDispatch(company.description, "cDescriptionValue")
        changeInputDispatch(company.type, "cTypeValue")
        changeInputDispatch(company.private, "cPrivateValue")
        dispatch(setFieldsFlag(true))
    }
    
    function changeInputDispatch(value, input) {
        dispatch(changeInput(value, input))
    }

    function changeInputHandler(e) {
        changeInputDispatch(e.target.value, e.target.getAttribute('data-change-value'))
    }

    function openModal(text) {
        dispatch(changeModal(true, text))
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

        let isInfoNew = false;

        for (let key in newCompany) {
            if (newCompany[key] !== company[key]) {
                isInfoNew = true;
                break;
            } 
        }

        if (!isInfoNew) {
            openModal('You haven\'t changed your info')
            return;
        }

        dispatch(updateCompany(jwt, company.id, newCompany))
        
        openModal('Your info has been successfully updated')
    }

    function renderCompany() {
        if (!isFieldsSet) {
            setFields();
        }
        
        return (
            <form className="company edit-form" onSubmit={sendForm}>
                <h2>Edit company</h2>
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
                <div className="button-container">
                    <RedirectLink className="submit" title={"Back"} linkTo={"/myCompanies"} />
                    <input className="submit" type="submit" name="submit" value="Save" />
                </div>
            </form>
        )
    }

    return (
        <div className="wrapper profile">
            <header className="profile">
                <Logo/>
                <HeaderNav/>
            </header>
            
            <section>
                {company ? renderCompany() : <div>Loading...</div>}
            </section>
            
            <Modal visible={modal}/>
        </div>
        
    )
}