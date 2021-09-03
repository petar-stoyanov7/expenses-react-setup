import React from 'react';
import './ExpenseTable.scss';

const ExpenseTable = (props) => {
    let expenses;

    if (null === props.expenses || props.expenses.length === 0) {
        console.log('no expenses');
        expenses = '<td>No expenses recorded</td>'
    } else {
        expenses = props.expenses.map((expense) => {
            let expenseName;
            switch (expense.Expense_ID) {
                case 1:
                    expenseName = 'Fuel';
                    break;
                case 2:
                    expenseName = expense.insuranceName;
                    break;
                default:
                    expense = '';
                    break;
            }

            return (
                <tr key={expense.id}>
                    <td>{expense.mileage}</td>
                    <td>{expense.date}</td>
                    <td>{expense.carName}</td>
                    <td>{expenseName}</td>
                    <td>{expense.fuelType}</td>
                    <td>{expense.liters}</td>
                    <td>{expense.price}</td>
                    <td>{expense.notes}</td>
                    <td>---</td>
                </tr>
            )
        });
    }

    return (
        <table className="expenses-list">
            <thead>
            <tr>
                <th>Mileage</th>
                <th>Date</th>
                <th>Car</th>
                <th>Type</th>
                <th>Fuel Type</th>
                <th>Liters</th>
                <th>Value</th>
                <th>Notes</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                {expenses}
            </tbody>
        </table>
    )
};

export default ExpenseTable;