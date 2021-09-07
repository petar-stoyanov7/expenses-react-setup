import React, {useEffect, useState, createContext} from 'react';
import {useCookies} from "react-cookie";
// import LoginForm from "../components/Login/LoginForm";
import Login from "../components/Login/Login";
import RegisterForm from "../components/Register/RegisterForm";
import ajaxConfig from "../cfg/ajax.json";
import axios from "axios";

const AuthContext = createContext({
    isLoggedIn: false,
    // userId: null,
    // user: {},
    // isAdmin: false,
    // userDetails: {},
    ajaxConfig: {},
    showLogin: () => {},
    showRegister: () => {},
    onLogin: (user, isAdmin) => {},
    onLogout: () => {},
});

export const AuthContextProvider = (props) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [userDetails, setUserDetails] = useState({
        isLogged: false,
        isAdmin: false,
        user: {}
    });

    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    useEffect(() => {
        console.log('context check');
        const storedUserId = parseInt(cookies.expUserId);
        const storedLoggedIn = parseInt(cookies.expIsLoggedIn) === 1;
        const storedIsAdmin = parseInt(cookies.expIsAdmin) === 1;

        if (
            Boolean(storedUserId) &&
            storedLoggedIn &&
            !userDetails.isLogged
        ) {
            const path = ajaxConfig.server + ajaxConfig.getUser;
            axios.post(path, {
                id: storedUserId,
                hash: ajaxConfig.hash
            }).then((response) => {
                const data = response.data;
                if (data.success) {
                    const user = {
                        id: data.user.ID,
                        username: data.user.Username,
                        city: data.user.City,
                        email: data.user.Email,
                        firstName: data.user.Fname,
                        lastName: data.user.Lname,
                        sex: data.user.Sex,
                        notes: data.user.Notes,
                    }

                    setUserDetails({
                        isLogged: storedLoggedIn,
                        isAdmin: storedIsAdmin,
                        user: user,
                    });
                    hideLoginForm();
                    hideRegisterForm();
                }
            });
        }
    }, [userDetails]);

    const showLoginForm = () => {
        console.log('login');
        console.log(userDetails);
        if (!userDetails.isLogged) {
            setShowRegister(false);
            setShowLogin(true);
        }
    }
    const showRegisterForm = () => {
        if (!userDetails.isLogged) {
            setShowLogin(false);
            setShowRegister(true);
        }
    }

    const hideLoginForm = () => {
        setShowLogin(false);
    }

    const hideRegisterForm = () => {
        setShowRegister(false);
    }

    const logoutHandler = () => {
        removeCookie('expUserId');
        removeCookie('expIsLoggedIn');
        removeCookie('expIsAdmin');

        setUserDetails({
            isLogged: false,
            isAdmin: false,
            user: {}
        });
    };

    const loginHandler = (user, isAdmin) => {
        console.log('Logging in');
        setCookie('expUserId', user.id, {path: '/'});
        setCookie('expIsLoggedIn', 1, {path: '/'});
        setCookie('expIsAdmin', isAdmin ? 1 : 0, {path: '/'});
        setUserDetails({
            isLogged: true,
            isAdmin: isAdmin,
            user: user
        });
        hideLoginForm();
    }

    const registerHandler = () => {
        console.log('reg handler');
        //register form
    }

    return (
        <AuthContext.Provider
            value={{
                // isLoggedIn: userDetails.isLogged,
                // userId: userDetails.userId,
                // user: userDetails.user,
                // isAdmin: userDetails.isAdmin,
                ajaxConfig: ajaxConfig,
                userDetails: userDetails,
                showLogin: showLoginForm,
                showRegister: showRegisterForm,
                onLogin: loginHandler,
                onLogout: logoutHandler,
                onRegister: showRegisterForm
            }}
        >
            {
                showLogin &&
                <Login
                    onLogin={loginHandler}
                    onRegister={showRegisterForm}
                    onClose={hideLoginForm}
                />
            }
            {
                showRegister &&
                <RegisterForm
                    onRegister={registerHandler}
                    onClose={hideRegisterForm}
                />
            }
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;