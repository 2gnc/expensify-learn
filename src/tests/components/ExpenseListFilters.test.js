import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters, altFilters} from '../fixtures/filters';

let onSetStartDateSpy,
    onSetEndDateSpy,
    onSetTextFilterSpy,
    onSortByDateSpy,
    onSortByAmountSpy,
    wrapper;
beforeEach(() => {
    onSetStartDateSpy = jest.fn();
    onSetEndDateSpy = jest.fn();
    onSetTextFilterSpy = jest.fn();
    onSortByDateSpy = jest.fn();
    onSortByAmountSpy = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            onSetStartDate={onSetStartDateSpy}
            onSetEndDate={onSetEndDateSpy}
            onSetTextFilter={onSetTextFilterSpy}
            onSortByDate={onSortByDateSpy}
            onSortByAmount={onSortByAmountSpy}
            filters={filters}
        />
    );
});

test('Should render ExpenseListFilters correctly with default filters', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseListFilters correctly with alt filters', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('Should handle text changes', () => {
    const textInput = wrapper.find('input').at(0);
    textInput.simulate('change', {
        target: {
            value: 'test'
        }
    });
    expect(onSetTextFilterSpy).toHaveBeenLastCalledWith('test');
});

test('Should sort by amount', () => {
    const select = wrapper.find('select');
    select.simulate('change', {
        target: {
            value: 'amount'
        }
    });
    expect(onSortByAmountSpy).toHaveBeenCalled();
});

test('Should sort by amount', () => {
    const select = wrapper.find('select');
    wrapper.setProps({
        filters: altFilters
    });
    select.simulate('change', {
        target: {
            value: 'date'
        }
    });
    expect(onSortByDateSpy).toHaveBeenCalled();
});

test('Should handle date change', () => {
    const picker = wrapper.find('DateRangePicker');
    const {startDate, endDate} = altFilters;
    picker.prop('onDatesChange')({startDate, endDate});
    expect(onSetStartDateSpy).toHaveBeenLastCalledWith(startDate);
    expect(onSetEndDateSpy).toHaveBeenLastCalledWith(endDate);
});

test('Should handle date focus change', () => {
    const picker = wrapper.find('DateRangePicker');
    const calendarFocused = 'startDate';
    picker.prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused );
});
