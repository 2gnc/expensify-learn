import React from 'react';
import { shallow } from 'enzyme';
import {ExpenseSummary} from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

describe('ExpenseSummary component', () => {
    it('renders $0.00 correctly if there is no expenses shown', () => {
        const wrapper = shallow(<ExpenseSummary count={0} total={0} />);
        const text = wrapper.find('span').text();
        expect(text).toBe('$0.00');
        expect(wrapper).toMatchSnapshot();
    }); 

    it('renders with one expense', () => {
        const wrapper = shallow(<ExpenseSummary count={1} total={12300} />);
        const text = wrapper.find('span').text();
        expect(text).toBe('$123.00');
        expect(wrapper).toMatchSnapshot();
    }); 
});
