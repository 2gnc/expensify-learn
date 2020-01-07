import React from 'react';
import {shallow} from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('Should render ExpenseForm', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseForm with given data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render error on invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    const form = wrapper.find('form');
    form.simulate('submit', {preventDefault: () => undefined});
    expect(wrapper.state('error')).toBe('Please provide description and amount.');
    expect(wrapper).toMatchSnapshot();
});

test('Should set description on input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const input = wrapper.find('input').at(0);
    input.simulate('change', {
        target: {
            value: 'test'
        }
    });
    expect(wrapper.state('description')).toBe('test');
    expect(wrapper).toMatchSnapshot();
});

test('Should set note on note input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const input = wrapper.find('textarea').at(0);
    input.simulate('change', {
        target: {
            value: 'test note'
        }
    });
    expect(wrapper.state('note')).toBe('test note');
    expect(wrapper).toMatchSnapshot();
});

test('Should set amount if input is valid', () => {
    const wrapper = shallow(<ExpenseForm />);
    const input = wrapper.find('input').at(1);
    input.simulate('change', {
        target: {
            value: '23.22'
        }
    });
    expect(wrapper.state('amount')).toBe('23.22');
    expect(wrapper).toMatchSnapshot();
});

test('Should not set amount if input is invalid', () => {
    const wrapper = shallow(<ExpenseForm />);
    const input = wrapper.find('input').at(1);
    input.simulate('change', {
        target: {
            value: '23.222'
        }
    });
    expect(wrapper.state('amount')).toBe('');
});

test('Should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    const form = wrapper.find('form');
    form.simulate('submit', {preventDefault: () => undefined});
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        ...expenses[0],
        id: undefined
    });
});

test('Should set new date on date change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const now = moment();
    const picker = wrapper.find('SingleDatePicker');
    picker.prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
    expect(wrapper).toMatchSnapshot();
});

test('Should set focused on focus change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const picker = wrapper.find('SingleDatePicker');
    picker.prop('onFocusChange')(true);
});
