import React, { useEffect } from 'react';
import './LogInFirstPage.css';

import RedirectLink from '../../components/RedirectLink/RedirectLink'

export default function LogInFirstPage() {
    return (
        <div className="login-first-page">
            <p>Please log in first</p>
            <RedirectLink className="submit" title="go to main page" linkTo="/"/>
        </div>
    )
}