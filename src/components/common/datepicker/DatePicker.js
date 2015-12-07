import styles from './DatePicker.css'
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN'; // spm error
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
const formatter = new DateTimeFormat('yyyy-MM-dd');

export default React.createClass({

	getInitialState() {
		let value;
		if (this.props.value) {
			value = new GregorianCalendar(zhCn);
			value.setTime(new Date(this.props.value).valueOf());
		}
		let defaultCalendarValue = new GregorianCalendar(zhCn);
		defaultCalendarValue.setTime(Date.now());
		return {
			showTime: false,
			value: value,
			defaultValue:defaultCalendarValue
		};
	},
	componentWillReceiveProps(nextProps) {
		if ('value' in nextProps) {
			let value = null;
			if (nextProps.value) {
				value = new GregorianCalendar(zhCn);
				value.setTime(new Date(nextProps.value).valueOf());
			}
			this.setState({
				value: value
			});
		}
	},

	handleChange(date) {
		this.setState({
			value: date
		});
		this.props.onSelect(date!=null?formatter.format(date):"");
	},
	render() {
		let state = this.state;
		let calendar = <Calendar locale={CalendarLocale} showTime={this.props.showTime} defaultValue={state.defaultValue}/>;
		return (
			<DatePicker ref='picker'
			            calendar={calendar}
			            value={state.value}
			            disabled={this.props.disabled}
			            onChange={this.handleChange}>
				{
					({value}) => {
						return (
							<span className={styles['date-span']}>
                <input type="text"
                       placeholder={(this.props.disabled == true)?"":"请选择时间"}
                       readOnly
                       value={value &&formatter.format(value)}
                       className={styles['date-input'] + ((this.props.disabled == true)?(" "+ styles['date-input-disabled']):"")} />
              </span>
						);
					}
				}
			</DatePicker>
		)
	}
})
