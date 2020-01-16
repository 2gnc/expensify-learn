import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import expensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';

export const ExpenseSummary = ({count, total}) => {
    return (
        <div>
            <h2>Total: {count}</h2>
            <span>{numeral(total/100).format('$0,0.00')}</span>
        </div>
    )
};

const mapStateToProps = (state) => {
    const expenses = selectExpenses(state.expenses, state.filters);
    return {
        total: expensesTotal(expenses),
        count: expenses.length
    };
};

export default connect(mapStateToProps)(ExpenseSummary);
