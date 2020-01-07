import React from 'react';
import { shallow } from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let wrapper, editExpenseSpy, removeExpenseSpy, historySpy;

beforeEach(() => {
    editExpenseSpy = jest.fn();
    removeExpenseSpy = jest.fn();
    historySpy = {
        push: jest.fn()
    }
    wrapper = shallow(<EditExpensePage editExpense={editExpenseSpy} removeExpense={removeExpenseSpy} history={historySpy} expense={expenses[0]} />);
});

test('Should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle editExpense', () => {
    const form = wrapper.find('ExpenseForm');
    form.prop('onSubmit')(expenses[0]);
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
    expect(editExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
});

test('Should handle removeExpense', () => {
    const button = wrapper.find('button');
    button.simulate('click');
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
    expect(removeExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id);
});
