import expenses, {brokenExpense} from '../fixtures/expenses';
import ExpensesTotal from '../../selectors/expenses-total';

describe('expenses-total selector', () => {
    it('should return 0 if no expenses passed in', () => {
        const result = ExpensesTotal([]);
        expect(result).toBe(0);
    });
    
    it('should return expense amount if only one expense is passed in', () => {
        const result = ExpensesTotal([expenses[0]]);
        expect(result).toBe(195);
    });

    it('should return sum of all passed expenses', () => {
        const result = ExpensesTotal([...expenses]);
        expect(result).toBe(114195);
    });

    it('should count invalid expense as 0 value', () => {
        const result = ExpensesTotal([...brokenExpense, ...expenses, ...brokenExpense]);
        expect(result).toBe(114195);
    });
});
