import React, {useState} from 'react';
// import React, {useState, useContext} from 'react';
import './HomePage.scss';
import Container from "../UI/Container";
// import ExpenseTable from "../UI/ExpenseTable";
// import AuthContext from "../../Store/auth-context";

const HomePage = (props) => {
    // const ctx = useContext(AuthContext);


    // const [userData, setUserData] = useState({
    const [userData] = useState({
        name: 'Guest',
        carsNumber: 1,
        yearTotal: 4315,
        lastYear: new Date().getFullYear(),
        cars: [
            {
                id: 0,
                brand: 'BMW',
                model: '330i',
                year: '2014',
                mileage: '115010',
                lastYearSpent: 4315
            }
        ],
        lastFive: [
            {
                id: 0,
                Expense_ID: 1,
                mileage: '114300',
                date: '2021.01.01',
                carName: 'BMW 330i',
                fuelType: 'Gasoline',
                liters: 8,
                price: 20,
                notes: '...'
            },
            {
                id: 1,
                Expense_ID: 1,
                mileage: '114500',
                date: '2021.01.01',
                carName: 'BMW 330i',
                fuelType: 'LPG',
                liters: 33,
                price: 50,
                notes: '...'
            },
            {
                id: 2,
                Expense_ID: 2,
                mileage: '115010',
                date: '2021.01.01',
                carName: 'BMW 330i',
                insuranceName: 'Kasko + GO',
                price: 50,
                notes: '...'
            },
        ]
    });

    return (
        <div className='homepage'>
            <Container customClass="half-width">
                <h3 className='container-title'>Welcome {userData.name}</h3>
                <div className="content">
                <div>
                    <strong>Number of cars:</strong> {userData.carsNumber}
                </div>
                <div>
                    <strong>Total spent for {userData.lastYear}</strong>: {userData.yearTotal}
                </div>
                </div>
            </Container>
            <Container customClass="half-width">
                <h3 className='container-title'>Cars:</h3>
                {userData.cars.map((car) => {
                    return (
                        <div className="element" key={car.id}>
                            <h4>{car.brand} {car.model} {car.year}</h4>
                            <div>
                                <strong>Mileage:</strong> {car.mileage}
                            </div>
                            <div>
                                <strong>Spent for {userData.lastYear}:</strong> {userData.yearTotal}
                            </div>
                        </div>
                    );
                })}
            </Container>
            <Container>
                <h3>Last five:</h3>
                {/*<ExpenseTable expenses={userData.lastFive} />*/}
            </Container>
        </div>
        );
};

export default  HomePage;