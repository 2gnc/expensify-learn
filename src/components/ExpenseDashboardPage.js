import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

const ExpenseDashboardPage = (props) => (
  <div>
    <ExpenseListFilters />
    <ExpenseList />
    <ExpensesSummary />
  </div>
);

export default ExpenseDashboardPage;
