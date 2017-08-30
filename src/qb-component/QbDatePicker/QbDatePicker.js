/**
 * Created by az on 2017/7/20.
 */
import React, {Component} from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './QbDatePicker.scss';

/*eslint-disable*/
class QbDatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate : null,
            endDate: null,
            focusedInput: null,
        };
    }
    dateChange({startDate, endDate}) {
        const {onDatesChange} = this.props;
        if(startDate) {
            this.setState({
                startDate,
            });
        };
        if(endDate) {
            this.setState({
                endDate,
            });
        }
        onDatesChange(startDate, endDate);
    }
    render() {
        const {style} = this.props;
        return (
            <div style={style}>
                <DateRangePicker startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                 endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                 onDatesChange = {({startDate, endDate})=> this.dateChange({startDate, endDate})}
                    // onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                 focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                 onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
            </div>
        )
    }
}

export default QbDatePicker;
