import React from 'react';
import './App.css';

import { Switch, Route } from "react-router-dom";

import MainPage from './pages/MainPage/MainPage';
import SignUpPage from './pages/LogInPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LogInFirstPage from './pages/LogInFirstPage/LogInFirstPage';
import EditUserPage from './pages/EditUserPage/EditUserPage';
import MyCompaniesPage from './pages/MyCompaniesPage/MyCompaniesPage';
import EditCompanyPage from './pages/EditCompanyPage/EditCompanyPage';
import CompanyViewPage from './pages/CompanyViewPage/CompanyViewPage';
import CreateCompanyPage from './pages/CreateCompanyPage/CreateCompanyPage';
import PublicCompaniesPage from './pages/PublicCompaniesPage/PublicCompaniesPage';
import PublicCompanyViewPage from './pages/PublicCompanyViewPage/PublicCompanyViewPage';
import AllCompaniesPage from './pages/AllCompaniesPage/AllCompaniesPage';
import AllUsersPage from './pages/AllUsersPage/AllUsersPage';
import EditCurrentUserPage from './pages/EditCurrentUserPage/EditCurrentUserPage';
import UserDetailsPage from './pages/UserDetailsPage/UserDetailsPage';

function App() {

  return (
    <div>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/signUp" component={SignUpPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/logInFirst" component={LogInFirstPage} />
        <Route exact path="/editUser" component={EditUserPage} />
        <Route exact path="/myCompanies" component={MyCompaniesPage} />
        <Route exact path="/EditCompany" component={EditCompanyPage} />
        <Route exact path="/viewCompany" component={CompanyViewPage} />
        <Route exact path="/createCompany" component={CreateCompanyPage} />
        <Route exact path="/publicCompanies" component={PublicCompaniesPage} />
        <Route exact path="/viewPublicCompany" component={PublicCompanyViewPage} />
        <Route exact path="/viewAllCompanies" component={AllCompaniesPage} />
        <Route exact path="/viewAllUsers" component={AllUsersPage} />
        <Route exact path="/editCurrentUser" component={EditCurrentUserPage} />
        <Route exact path="/userDetails" component={UserDetailsPage} />
      </Switch>

    </div>
  )
}

export default App;
