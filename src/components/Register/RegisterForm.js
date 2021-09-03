// import React, {useRef, useState} from 'react';
// import ReactDOM from 'react-dom';
// import './RegisterForm.scss';
// import Card from "../UI/Card";
//
// const overlayContainer = document.getElementById('black-overlay-1');
// const modalContainer = document.getElementById('modal-container');
//
//
//
//
// const RegisterForm = (props) => {
//     // const [isOk, setIsOk] = useState(true);
//
//
//     const BlackOverlay = (props) => {
//         return <div className="site-overlay black-overlay-1" onClick={props.onClose}></div>;
//     }
//
//     const checkInput = () => {
//         console.log('check');
//     }
//
//     const RegisterModal = (props) => {
//         return (
//             <Card customClass="register-form">
//                 <button className="register-form__close" onClick={props.onClose}>
//                     x
//                 </button>
//                 <form className="register-form__form" onSubmit={props.submitMethod}>
//                     <h1 className="register-form__title">Login</h1>
//                     <input
//                         name='username'
//                         onBlur={checkInput}
//                         type="text"
//                         placeholder="Enter username"
//                     />
//                     <input
//                         name='password'
//                         onBlur={checkInput}
//                         type="password"
//                         placeholder="Enter your password"
//                     />
//                     <input
//                         name='password2'
//                         onBlur={checkInput}
//                         type="password"
//                         placeholder="Repeat your password"
//                     />
//                     <input
//                         name='fName'
//                         onBlur={checkInput}
//                         type="text"
//                         placeholder="First Name"
//                     />
//                     <input
//                         name='lName'
//                         onBlur={checkInput}
//                         type="text"
//                         placeholder="Last Name"
//                     />
//                     <select name='gender'>
//                         <option value='male'>Male</option>
//                         <option value='female'>Female</option>
//                     </select>
//                     <input
//                         name='city'
//                         onBlur={checkInput}
//                         type="text"
//                         placeholder="City"
//                     />
//
//
//
//                     <input
//                         type="submit"
//                         value="Login"
//                         onClick={props.submitMethod}
//                     />
//                 </form>
//             </Card>
//         );
//     }
//
//     return (
//         <React.Fragment>
//             {ReactDOM.createPortal(
//                 <BlackOverlay onClose={props.onClose}/>,
//                 overlayContainer
//             )}
//             {ReactDOM.createPortal(
//                 <RegisterModal submitMethod={props.onLogin} />,
//                 modalContainer
//             )}
//         </React.Fragment>
//     );
// }
//
// export default RegisterForm;