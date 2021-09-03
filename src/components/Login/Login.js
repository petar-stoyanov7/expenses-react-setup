import React, {useContext, useEffect, useState} from 'react';
import Card from "../UI/Card";
import ReactDOM from "react-dom";
import AuthContext from "../../Store/auth-context";
import axios from "axios";
import './Login.scss';
import iconClose from '../../assets/icons/icon-close.svg';

const overlayContainer = document.getElementById('black-overlay-1');

const Login = (props) => {
    const [user, setUser] = useState({
        value: '',
        isValid: true,
        message: '',
    });
    const [pass, setPass] = useState({
        value: '',
        isValid: true,
        message: '',
    });
    const [form, setForm] = useState({
        isValid: false,
        message: '',
    });

    const ctx = useContext(AuthContext);

    useEffect(() => {
        if (user.value.length > 0 && pass.value.length > 0) {
            const timer = setTimeout(() => {
                setForm({
                    isValid: user.isValid && pass.isValid,
                    message: 'Invalid username or password'
                })
            }, 500);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [user.value, pass.value])

    const BlackOverlay = (props) => {
        return <div className="site-overlay black-overlay-1" onClick={props.onClose}></div>;
    }

    const handleInput = (e) => {
        const val = e.target.value;
        const inputName = e.target.name;
        let message = '';
        let isValid = true;
        switch(inputName) {
            case 'username':
                console.log('usr');
                if (val.length < 4) {
                    isValid = false;
                    message = 'Username is too short';
                }
                if (null === val.match(/^[A-Za-z0-9]+$/g)) {
                    isValid = false;
                    message = 'Invalid characters';
                }
                setUser({
                    value: val,
                    isValid: isValid,
                    message: message
                });
                break;
            case 'password':
                if (val.length < 5) {
                    isValid = false;
                    message = 'Password is too short';
                }
                setPass({
                    value: val,
                    isValid: isValid,
                    message: message
                });
                break;
            default:
                break;
        }
    }

    const onSubmit = (e) => {
        /** Statuses
         * 0 - missing data
         * 1 - incorrect username/password
         */
        e.preventDefault();
        const path = ctx.ajaxConfig.server + ctx.ajaxConfig.login;
        if (user.isValid && pass.isValid && form.isValid) {
            axios.post(path, {
                user: user.value,
                pass: pass.value,
                hash: ctx.ajaxConfig.hash
            }).then((response) => {
                const data = response.data;
                if (data.success) {
                    const isAdmin = data.user.Group === 'admins';
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

                    ctx.onLogin(user, isAdmin);
                } else if (!data.success) {
                    let message = '';
                    switch(data.status) {
                        case 1:
                            message = 'Invalid username or password';
                            setUser({...user, isValid: false});
                            setPass({...pass, isValid: false});
                            break;
                        case 2:
                        default:
                            message = 'We have a problem with this app, please try again later';
                            break;
                    }
                    setForm({
                        isValid: false,
                        message: message
                    });
                    console.log(data);
                } else {
                    setForm({
                        isValid: false,
                        message: 'No connection to DB. Please check later!'
                    });
                }
            });
        }
    }


    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <BlackOverlay onClose={props.onClose}/>,
                overlayContainer
            )}
            <Card customClass="login-form">
                <button className="login-form__close" onClick={props.onClose}>
                    <img src={iconClose} className="login-form__close-icon" />
                </button>
                <form className="login-form__form" onSubmit={onSubmit}>
                    <h1 className="login-form__title">Login</h1>
                    {!form.isValid && (
                        <div className="login-form__error">
                            {form.message}
                        </div>
                    )}
                    {!user.isValid && (
                        <div className="login-form__error">
                            {user.message}
                        </div>
                    )}
                    <input
                        className={user.isValid ? '' : 'input-error'}
                        name='username'
                        value={user.value}
                        onChange={handleInput}
                    />
                    {!pass.isValid && (
                        <div className="login-form__error">
                            {pass.message}
                        </div>
                    )}
                    <input
                        className={pass.isValid ? '' : 'input-error'}
                        name='password'
                        value={pass.value}
                        onChange={handleInput}
                    />
                    <input
                        className={
                            user.isValid &&
                            pass.isValid &&
                            user.value.length > 0 &&
                            pass.value.length > 0
                            ? '' : 'disabled'
                        }
                        type="submit"
                        value="Login"
                    />
                </form>
            </Card>
        </React.Fragment>
    );
}

export default Login;