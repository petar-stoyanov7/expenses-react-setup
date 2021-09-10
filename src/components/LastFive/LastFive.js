import React, {
    useContext,
    useEffect,
    useState,
    Fragment
} from 'react';

import './LastFive.scss';
import AuthContext from "../../Store/auth-context";
import axios from "axios";
// import ExpenseTable from "../UI/ExpenseTable";

const dummyData = [
    {
        id: 0,
        expenseType: 'fuel',
        expenseDetail: 'Gasoline',
        mileage: '114300',
        date: '2021.01.01',
        carName: 'BMW 330i',
        liters: 8,
        price: 20,
        notes: 'theft'
    },
    {
        id: 1,
        expenseType: 'fuel',
        expenseDetail: 'LPG',
        mileage: '114500',
        date: '2021.01.01',
        carName: 'BMW 330i',
        liters: 33,
        price: 50,
        notes: 'crap gas station'
    },
    {
        id: 2,
        expenseType: 'insurance',
        expenseDetail: 'Kasko + GO',
        mileage: '115010',
        date: '2021.01.01',
        carName: 'BMW 330i',
        price: 50,
        notes: 'Taxation is theft!'
    },
];

const LastFive = (props) => {
    const ctx = useContext(AuthContext);
    const [lastFive, setLastFive] = useState(dummyData);

    useEffect(() => {
        const ajaxCfg = ctx.ajaxConfig;
        console.log('ajax',ajaxCfg);
        let data = {
            hash: ctx.ajaxConfig.hash
        }
        switch(props.type) {
            case 'car':
                data['carId'] = props.carId;
                break;
            case 'user':
                data['userId'] = props.userId;
                break;
            default:
                data['userId'] = ctx.userDetails.user.id;
                break;
        }
        axios.post(`${ajaxCfg.server}${ajaxCfg.getLastFive}`, data)
            .then((response) => {
                console.log('last five');
                console.log(response);
            });
    }, [ctx]);

    return (
        <Fragment>
            <h3>Last five:</h3>
            {/*<ExpenseTable expenses={lastFive} />*/}
        </Fragment>
    );
}

export default LastFive;