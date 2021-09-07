import React, {
    useContext,
    useEffect,
    useState,
    Fragment
} from 'react';

import './LastFive.scss';
import AuthContext from "../../Store/auth-context";
// import ExpenseTable from "../UI/ExpenseTable";

const dummyData = [
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
];

const LastFive = (props) => {
    const ctx = useContext(AuthContext);
    const [lastFive, setLastFive] = useState(dummyData);

    useEffect(() => {
        //get from DB
    }, [ctx]);

    return (
        <Fragment>
            <h3>Last five:</h3>
            {/*<ExpenseTable expenses={lastFive} />*/}
        </Fragment>
    );
}

export default LastFive;