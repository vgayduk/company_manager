import React, { useCallback } from 'react';
import './CompanyItem.css';
import { MdRemoveRedEye, MdModeEdit } from "react-icons/md";

import { useDispatch } from 'react-redux';
import setEditCompany from '../../store/actionCreators/setEditCompany';

export default function CompanyItem(props) {
    const dispatch = useDispatch();
    
    function openCompanyInfo() {
        localStorage.setItem('currentCompany', JSON.stringify(props.company));
        dispatch(setEditCompany(props.company, {redirect: false}));
        window.location.href = '/viewCompany';
    }

    function openEditCompany() {
        localStorage.setItem('currentCompany', JSON.stringify(props.company));
        dispatch(setEditCompany(props.company));
    }

    return (
        <div className="company-item">
            <p className="company-name">{props.company.name}</p>
            <p><span>Service: </span>{props.company.serviceOfActivity}</p>
            <p><span>Address: </span>{props.company.address}</p>
            <p><span>Employees: </span>{props.company.numberOfEmployees}</p>
            <p><span>Type of property: </span>{props.company.type}</p>
            <div className="description">
                <p>{props.company.description}</p>
            </div>
            <div className="buttons">
                <div className="btn" onClick={openCompanyInfo}><MdRemoveRedEye/></div>
                {props.publicCompany ? null : <div className="btn" onClick={openEditCompany}><MdModeEdit/></div>}
            </div>
        </div>
    )
}