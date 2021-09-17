import React, {Fragment, useContext, useEffect, useState} from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import NewExpense from "./components/NewExpense/NewExpense";
import AuthContext from "./Store/auth-context";

function App() {
    const ctx = useContext(AuthContext);

    const [activeElement, setActiveElement] = useState(<HomePage />);
    const setHomepage = () => {
        setActiveElement(<HomePage />);
    }
    const setNewExpense = () => {
        setActiveElement(<NewExpense />);
    }

    useEffect(() => {
        if (!ctx.userDetails.isLogged) {
            setActiveElement(<HomePage />);
        }
    }, [ctx.userDetails.isLogged]);


    return (
        <Fragment>
            <Header
                setHomepage={setHomepage}
                setNewExpense={setNewExpense}
            />
            <main className="main-content">
                {activeElement}
            </main>
            <Footer/>
        </Fragment>
    );
}

export default App;
