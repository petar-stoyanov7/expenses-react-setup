import React, {Fragment} from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";

function App() {
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
