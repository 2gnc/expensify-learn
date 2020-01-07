import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };
    onDatesChange = ({ startDate, endDate }) => {
        this.props.onSetStartDate(startDate);
        this.props.onSetEndDate(endDate)
    };
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    };
    onTextChange = (e) => {
        this.props.onSetTextFilter(e.target.value)
    };

    render() {
        return (
            <div>
            <input
                type="text"
                value={this.props.filters.text}
                onChange={this.onTextChange}
            />
            <select
                value={this.props.filters.sortBy}
                onChange={(e) => {
                if (e.target.value === 'date') {
                    this.props.onSortByDate()
                } else if (e.target.value === 'amount') {
                    this.props.onSortByAmount()
                }
                }}
            >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
            </select>
            <DateRangePicker
                startDate={this.props.filters.startDate}
                endDate={this.props.filters.endDate}
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                showClearDates={true}
                numberOfMonths={1}
                isOutsideRange={() => false}
            />
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    onSetStartDate: (data) => dispatch(setStartDate(data)),
    onSetEndDate: (data) => dispatch(setEndDate(data)),
    onSetTextFilter: (data) => dispatch(setTextFilter(data)),
    onSortByDate: () => dispatch(sortByDate()),
    onSortByAmount: () => dispatch(sortByAmount())
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
