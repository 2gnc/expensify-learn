import React from 'react';
import { shallow } from 'enzyme';
import {AddExpensePage} from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpenseSpy, historySpy, wrapper;

beforeEach(() => {
    addExpenseSpy = jest.fn();
    historySpy = {
        push: jest.fn()
    };
    wrapper = shallow(<AddExpensePage addExpense={addExpenseSpy} history={historySpy} />);
});

test('Should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle onSubmit', () => {
    const form = wrapper.find('ExpenseForm');
    form.prop('onSubmit')(expenses[0]);
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
    expect(addExpenseSpy).toHaveBeenLastCalledWith(expenses[0]);
});
