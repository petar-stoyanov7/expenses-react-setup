import React, {useContext, useEffect, useState} from 'react';

import './NewExpense.scss';
import Container from "../UI/Container";
import CarList from "../Cars/CarList";
import Card from "../UI/Card";
import AuthContext from "../../Store/auth-context";
import axios from "axios";
// import moment from "moment";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// const currentDate = moment().locale('en').format('YYYY-MM-DD');
const currentDate = new Date();

const NewExpense = () => {
    const ctx = useContext(AuthContext);
    const ajx = ctx.ajaxConfig;

    const [activeCar, setActiveCar] = useState(null);
    const [expenseType, setExpenseType] = useState(null);
    const [fuelType, setFuelType] = useState(null);
    const [insuranceType, setInsuranceType] = useState(null);
    const [expenseList, setExpenseList] = useState([]);
    const [fuelList, setFuelList] = useState([]);
    const [insuranceList, setInsuranceList] = useState([]);
    const [possibleFuels, setPossibleFuels] = useState([]);
    const [mileage, setMileage] = useState(0);
    const [date, setDate] = useState(currentDate);
    const [formIsValid, setFormIsValid] = useState(false);


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

    useEffect(() => {
        let validity = null !== activeCar && null !== expenseType && 0 !== mileage;
        if (validity && expenseType === '1') {
            validity = null !== fuelType;
        }
        if (validity && expenseType === '2') {
            validity = null !== insuranceType;
        }
        setFormIsValid(validity);
    }, [activeCar, expenseType, fuelType, insuranceType, mileage, date]);

    const setCar = (car) => {
        setActiveCar(car);
        setMileage(car.mileage);
        setInsuranceType(null);
        setFuelType(null);

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
        setInsuranceType(null);
        setFuelType(null);
    }

    const setFuel = (fuelId) => {
        setFuelType(fuelId);
    }

    const setInsurance = (insuranceId) => {
        setInsuranceType(insuranceId);
    }

    const resetForm = () => {
        setExpense(null);
        setActiveCar(null);
        setFuelType(null);
        setInsuranceType(null);
        setMileage(0);
        setDate(currentDate);
        setPossibleFuels([]);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (formIsValid) {
            console.log('form data');
            console.log('car', activeCar.id);
            console.log('type', expenseType);
            console.log('fuel', fuelType);
            console.log('insurance', insuranceType);
            console.log('mileage', mileage);
            console.log('date', date);
        }
    }

    return (
        <Container customClass="new-expense">
            <h1 className="new-expense__title">
                New Expense
            </h1>
            <hr />
            <div className="new-expense__cars">
                <CarList
                    isDetailed={false}
                    hasModal={false}
                    clickAction={setCar}
                    activeCar={null != activeCar ? activeCar.id : null}
                />
            </div>
            <hr />
            <div className="new-expense__type item-list">
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
            <div
                className="new-expense__insurances item-list"
                style={{display: expenseType === '2' ? 'flex' : 'none'}}
            >
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
            <div
                className="new-expense__fuels item-list"
                style={{display: expenseType === '1' ? 'flex' : 'none'}}
            >
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
            <div className="new-expense__inputs">
                <input
                    className="new-expense__inputs-mileage"
                    type="number"
                    value={mileage}
                    onChange={(e) => {
                        setMileage(e.target.value);
                    }}
                />
                <DatePicker
                    selected={date}
                    onChange={(date) => {setDate(date)}}
                />
            </div>
            <div className="new-expense__actions">
                <button
                    disabled={!formIsValid}
                    className={`exp-button exp-button__success ${formIsValid ? '' : 'disabled'} `}
                    type='submit'
                    onClick={submitHandler}
                >
                    Submit
                </button>
                <button
                    type='button'
                    className="exp-button exp-button__danger"
                    value="Cancel"
                    onClick={resetForm}
                >
                    Reset
                </button>
            </div>
        </Container>
    );
}

export default NewExpense;