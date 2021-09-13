import React, {
    useContext,
    useEffect,
    useState,
    Fragment
} from 'react';

import './LastFive.scss';
import AuthContext from "../../Store/auth-context";
import axios from "axios";
import ExpenseTable from "../UI/ExpenseTable";
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
        if (undefined !== data['userId'] || undefined !== data['carId']) {
            axios.post(`${ajaxCfg.server}${ajaxCfg.getLastFive}`, data)
                .then((response) => {
                    const result = response.data
                    if (result.success) {
                        console.log('exp_raw');
                        console.log(result.data);
                        const formattedData = result.data.map((expense) => {
                            const exp = {
                                id: expense.ID,
                                carName: `${expense.car_brand} ${expense.car_model}`,
                                date: expense.Date,
                                type: expense.expense_name,
                                cid: expense.CID,
                                fuelId: expense.Fuel_ID,
                                liters: expense.Liters,
                                insuranceId: expense.Insurance_ID,
                                mileage: expense.Mileage,
                                price: expense.Price,
                                notes: expense.Notes
                            }
                            switch (expense.Expense_ID) {
                                case '1':
                                    exp['expenseDetail'] = expense.fuel_name;
                                    break;
                                case '2':
                                    exp['expenseDetail'] = expense.insurance_name;
                                    break;
                                case '3':
                                case '4':
                                case '999':
                                default:
                                    exp['expenseDetail'] = '';
                                    break;
                            }
                            return exp;
                        })
                        setLastFive(formattedData);
                    } else {
                        setLastFive(dummyData);
                    }
                });
        } else {
            setLastFive(dummyData);
        }
    }, [ctx.userDetails.isLogged]);

    return (
        <Fragment>
            <h3>Last five:</h3>
            <ExpenseTable
                expenses={lastFive}
            />
        </Fragment>
    );
}

export default LastFive;