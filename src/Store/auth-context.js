import React, {useEffect, useState, createContext} from 'react';
import {useCookies} from "react-cookie";
// import LoginForm from "../components/Login/LoginForm";
import Login from "../components/Login/Login";
import RegisterForm from "../components/Register/RegisterForm";
import ajaxConfig from "../cfg/ajax.json";
import axios from "axios";

const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    user: {},
    isAdmin: false,
    ajaxConfig: {},
    showLogin: () => {},
    showRegister: () => {},
    onLogin: (user, isAdmin) => {},
    onLogout: () => {},
});

export const AuthContextProvider = (props) => {
    const [isLogged, setIsLogged] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [userDetails, setUserDetails] = useState({
        isLogged: false,
        isAdmin: false,
        user: {}
    })


    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    useEffect(() => {
        const storedUserId = parseInt(cookies.expUserId);
        const storedLoggedIn = parseInt(cookies.expIsLoggedIn) === 1;
        const storedIsAdmin = parseInt(cookies.expIsAdmin) === 1;

        if (Boolean(storedUserId) && storedLoggedIn) {
            const path = ajaxConfig.server + ajaxConfig.getUser;
            axios.post(path, {
                id: storedUserId,
                hash: ajaxConfig.hash
            }).then((response) => {
                console.log(response);
                const data = response.data;
                if (data.success) {
                    console.log('success');
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
                }
            });
        }
    }, [isLogged]);

    const showLoginForm = () => {
        if (!userDetails.isLogged) {
            setShowLogin(true);
        }
    }
    const showRegisterForm = () => {
        if (!userDetails.isLogged) {
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
        console.log('logout handler');
        setUserDetails({
            isLogged: false,
            userId: null,
            isAdmin: false
        });
        removeCookie('expUserId');
        removeCookie('expIsLoggedIn');
        removeCookie('expIsAdmin');
        //removeCookie
    };

    const loginHandler = (user, isAdmin) => {
        setIsLogged(true);
        if (null === isAdmin) {
            isAdmin = 0;
        } else {
            isAdmin = isAdmin ? 1 : 0;
        }

        setUserDetails({
            isLogged: true,
            isAdmin: false,
            user: user
        });
        console.log('isadmin', isAdmin);
        setCookie('expUserId', user.id, {path: '/'});
        setCookie('expIsLoggedIn', 1, {path: '/'});
        setCookie('expIsAdmin', isAdmin, {path: '/'});
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
                isLoggedIn: userDetails.isLogged,
                userId: userDetails.userId,
                user: userDetails.user,
                isAdmin: userDetails.isAdmin,
                ajaxConfig: ajaxConfig,
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