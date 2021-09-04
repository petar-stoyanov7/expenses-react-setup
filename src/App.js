import React, {Fragment, useContext} from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import AuthContext from "./Store/auth-context";

function App() {
    // const [isLoggedIn, setLoggedIn] = useState(false);
    // const {activeComponent, setActiveComponent} = useState(
    //     <HomePage />
    // );
    const ctx = useContext(AuthContext);

    return (
        <Fragment>
            <Header/>
            <main className="main-content">
                <HomePage/>
            </main>
            <Footer/>
        </Fragment>
    );
}

export default App;
