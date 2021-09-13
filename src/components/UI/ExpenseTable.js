import React from 'react';
import './ExpenseTable.scss';

const ExpenseTable = (props) => {
    let expenses;
    console.log('exp', props.expenses);


    if (null === props.expenses || props.expenses.length === 0) {
        console.log('no expenses');
        expenses = '<td>No expenses recorded</td>'
    } else {
        expenses = props.expenses.map((expense) => {
            return (
                <tr
                    key={expense.id}
                    onClick={null == props.clickAction ? undefined : () => {
                        props.clickAction(expense.id);
                    }}
                >
                    <td className="expenses-list__mileage">
                        {expense.mileage}
                    </td>
                    <td className="expenses-list__date">
                        {expense.date}
                    </td>
                    <td className="expenses-list__car">
                        {expense.carName}
                    </td>
                    <td className="expenses-list__type">
                        {expense.type}
                    </td>
                    <td className="expenses-list__detail">
                        {expense.expenseDetail}
                    </td>
                    <td className="expenses-list__liters">
                        {expense.liters}
                    </td>
                    <td className="expenses-list__price">
                        {expense.price}
                    </td>
                    <td className="expenses-list__notes">
                        {expense.notes}
                    </td>
                </tr>
            )
        });
    }

    return (
        <table
            className={`expenses-list
                ${props.isDetailed} ? ' detailed' : ''}
                ${props.isSmall} ? ' small' : ''}
            `}
            cellSpacing='0'
        >
            <thead className='expenses-list__header'>
                <tr>
                    <th className="expenses-list__mileage">
                        Mileage
                    </th>
                    <th className="expenses-list__date">
                        Date
                    </th>
                    <th className="expenses-list__car">
                        Car
                    </th>
                    <th className="expenses-list__type">
                        Type
                    </th>
                    <th className="expenses-list__detail">
                        Detail
                    </th>
                    <th className="expenses-list__liters">
                        Liters
                    </th>
                    <th className="expenses-list__price">
                        Value
                    </th>
                    <th className="expenses-list__notes">
                        Notes
                    </th>
                </tr>
            </thead>
            <tbody>
                {expenses}
            </tbody>
        </table>
    )
};

export default ExpenseTable;