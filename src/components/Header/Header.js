import React, {useContext} from 'react';
import './Header.scss';
// import siteLogo from '../../assets/img/logo1.png';
import HeaderButton from "../UI/HeaderButton";

import iconHome from '../../assets/icons/icon-home.svg';
import iconAdd from '../../assets/icons/icon-add.svg';
import iconStatistics from '../../assets/icons/icon-statistics.svg';
import iconProfile from '../../assets/icons/icon-profile.svg';
import iconAdmin from '../../assets/icons/icon-admin.svg';
import AuthContext from "../../Store/auth-context";
import iconLogin from "../../assets/icons/icon-login.svg";
import iconRegister from "../../assets/icons/icon-register.svg";
import iconLogout from "../../assets/icons/icon-logout.svg";

const Header = () => {
    const ctx = useContext(AuthContext);

    console.log('hdr', ctx.userDetails);

    return (
        <header className={`top-bar${ctx.isLoggedIn ? ' is-logged' : '' }`}>
            <div className="site-logo">
                {/*<a href="/">*/}
                {/*    <img src={siteLogo} alt='Site Logo'/>*/}
                {/*</a>*/}
            </div>

            <div className="toolbar">
                <HeaderButton
                    text='Home'
                    imageUrl={iconHome}
                    imageAlt='Home Page'
                    onClick=''
                />
                {ctx.userDetails.isLogged && (
                    <React.Fragment>
                        <HeaderButton
                            customClass='teal-icon'
                            text='New Expense'
                            imageUrl={iconAdd}
                            imageAlt='New Expense'
                            onClick=''
                        />
                        <HeaderButton
                            text='Statistics'
                            imageUrl={iconStatistics}
                            imageAlt='Statistics'
                            onClick=''
                        />
                        <HeaderButton
                            text='Profile'
                            imageUrl={iconProfile}
                            imageAlt='Profile'
                            onClick=''
                        />
                    </React.Fragment>
                )}
                <div className="test">
                    {ctx.userDetails.isAdmin && (
                        <HeaderButton
                            text='Admin Panel'
                            imageUrl={iconAdmin}
                            imageAlt='Admin Panel'
                            onClick=''
                        />
                    )}
                </div>
            </div>
            <div className="login">
                {!ctx.userDetails.isLogged && (
                    <React.Fragment>
                        <HeaderButton
                            customClass='smaller-icon teal-icon'
                            text='Login'
                            imageUrl={iconLogin}
                            imageAlt='Login'
                            method={ctx.showLogin}
                        />
                        <HeaderButton
                            customClass='smaller-icon'
                            text='Register'
                            imageUrl={iconRegister}
                            imageAlt='Register'
                            method={ctx.showRegister}
                        />
                    </React.Fragment>
                )}
                {ctx.userDetails.isLogged && (
                    <HeaderButton
                        customClass='smaller-icon orange-icon'
                        text='Logout'
                        imageUrl={iconLogout}
                        imageAlt='Logout'
                        method={ctx.onLogout}
                    />
                )}
            </div>
        </header>
    );
}

export default Header;