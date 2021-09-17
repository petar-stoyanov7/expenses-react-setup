import React, {useContext, useEffect, useState} from 'react';

import './NewExpense.scss';
import Container from "../UI/Container";
import CarList from "../Cars/CarList";
import Card from "../UI/Card";
import AuthContext from "../../Store/auth-context";
import axios from "axios";
import moment from "moment";

const currentDate = moment().locale('en').format('YYYY-MM-DD');

const NewExpense = () => {
    const ctx = useContext(AuthContext);
    const ajx = ctx.ajaxConfig;

    const [activeCar, setActiveCar] = useState(null);
    const [expenseType, setExpenseType] = useState(1);
    const [fuelType, setFuelType] = useState(null);
    const [insuranceType, setInsuranceType] = useState(null);
    const [expenseList, setExpenseList] = useState([]);
    const [fuelList, setFuelList] = useState([]);
    const [insuranceList, setInsuranceList] = useState([]);
    const [possibleFuels, setPossibleFuels] = useState([]);
    const [mileage, setMileage] = useState(0);
    const [date, setDate] = useState(currentDate);

    let secondaryContainer;

    useEffect(() => {
        axios.post(ajx.server+ajx.getExpenses, {hash: ajx.hash})
            .then((response) => {
                if (response.data.success) {
                    setExpenseList(response.data.expenses);
                }
            });
        axios.post(ajx.server+ajx.getFuels, {hash: ajx.hash})
            .then((response) => {
                if (response.data.success) {
                    setFuelList(response.data.fuels);
                }
            });
        axios.post(ajx.server+ajx.getInsurances, {hash: ajx.hash})
            .then((response) => {
                if (response.data.success) {
                    setInsuranceList(response.data.insurances);
                }
            });
    }, []);

    const setCar = (car) => {
        setActiveCar(car);
        setMileage(car.mileage);
        let carFuels = [];
        fuelList.map((fuel) => {
            if (fuel.ID === car.fuelId) {
                carFuels.push({
                    id: fuel.ID,
                    name: fuel.Name
                })
            }
            if (fuel.ID === car.fuelId2) {
                carFuels.push({
                    id: fuel.ID,
                    name: fuel.Name
                })
            }
        });
        setPossibleFuels(carFuels);
    }

    const setExpense = (expenseId) => {
        setExpenseType(expenseId);
    }

    const setFuel = (fuelId) => {
        setFuelType(fuelId);
    }

    const setInsurance = (insuranceId) => {
        console.log(insuranceId);
        setInsuranceType(insuranceId);
    }

    const fuelContainer = (
        <div className="new-expense__fuels">
            {possibleFuels.map((fuel) => {
                let customClass = "item-selector";
                customClass += fuel.id === fuelType ? ' is-active' : '';
                return (
                    <Card
                        customClass={customClass}
                        key={fuel.id}
                        clickAction={() => {setFuel(fuel.id)}}
                    >
                        {fuel.name}
                    </Card>
                );
            })}
        </div>
    );

    const insuranceContainer = (
        <div className="new-expense__insurances">
            {insuranceList.map((insurance) => {
                let customClass = "item-selector";
                customClass += insurance.ID === insuranceType ? ' is-active' : '';
                return (
                    <Card
                        customClass={customClass}
                        key={insurance.ID}
                        clickAction={() => {setInsurance(insurance.ID)}}
                    >
                        {insurance.Name}
                    </Card>
                )
            })}
        </div>
    );

    return (
        <Container customClass="new-expense">
            <h1 className="new-expense__title">
                New Expense
            </h1>
            <hr />
            <div className="new-expense__cars">
                <CarList isDetailed={false} hasModal={false} clickAction={setCar} />
            </div>
            <hr />
            <div className="new-expense__type">
                {expenseList.map((expense) => {
                    let customClass = `item-selector new-expense__type-${expense.Name.toLowerCase()}`;
                    if (expense.ID === expenseType) {
                        customClass += ' is-active';
                    }
                    return (
                        <Card
                            key={expense.ID}
                            customClass={customClass}
                            clickAction={() => {setExpense(expense.ID)}}
                        >
                            {expense.Name}
                        </Card>
                    )
                })}

            </div>
            <hr />
            <hr />
            <div className="new-expense__inputs">
                <input
                    type="number"
                    value={mileage}
                    onChange={(e) => {
                        setMileage(e.target.value);
                    }}
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => {setDate(e.target.value)}}
                />
            </div>
        </Container>
    );
}

export default NewExpense;