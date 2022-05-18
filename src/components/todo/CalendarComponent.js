import { useState } from "react";

const ROWS = 6;
const COLUMNS = 7;
const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarComponent() {
	const [date, setDate] = useState(new Date());
	return (
		<div className="calendarCenter">
			<p style={{ fontWeight: 500, fontSize: 27, marginBottom: 20 }}>
				{monthNames[date.getMonth()] + " " + date.getFullYear()}
			</p>
			<Calendar date={date} setDate={setDate} />
		</div>
	);
}

function Calendar({ date, setDate }) {
	const cells = getCalendarArray(date);
	const dateToday = new Date();
	const Calendar = [];
	const header = [];
	dayNames.forEach((day) => {
		header.push(
			<div className="dayHeader" key={"header" + day}>
				<p>{day}</p>
			</div>
		);
	});
	Calendar.push(
		<div className="row-full" key={"row header"}>
			{header}
		</div>
	);
	for (let i = 0; i < ROWS; i++) {
		const row = [];
		var emptyCount = 0;
		cells[i].forEach((value) => {
			if (value === null) {
				row.push(
					<div
						className="datePickerEmpty"
						key={"empty" + emptyCount}
					/>
				);
				emptyCount++;
			} else {
				row.push(
					<DatePicker
						value={value}
						date={date}
						dateToday={dateToday}
						setDate={setDate}
						key={value}
					/>
				);
			}
		});
		Calendar.push(
			<div className="row-full" key={"row" + i}>
				{row}
			</div>
		);
	}
	return Calendar;
}

function DatePicker({ value, date, dateToday, setDate }) {
	var dateClass = "datePicker ";
	if (
		date.getMonth() === dateToday.getMonth() &&
		date.getFullYear() === dateToday.getFullYear() &&
		value === dateToday.getDate()
	) {
		dateClass += "datePickerToday ";
	}
	if (value === date.getDate()) {
		dateClass += "datePickerSelected ";
	}
	var indicatorClass = "indicator ";
	if (!hasEvent(value, date)) {
		indicatorClass += "hidden";
	}
	return (
		<div
			className={dateClass}
			onClick={() => {
				var newDate = new Date(date);
				newDate.setDate(value);
				setDate(newDate);
			}}
		>
			<span className={indicatorClass} />
			<p>{value}</p>
		</div>
	);
}

function hasEvent(value, date) {
	return false;
}

function getCalendarArray(date) {
	const cells = new Array(ROWS);
	for (let i = 0; i < ROWS; i++) {
		cells[i] = new Array(COLUMNS);
	}
	const offset = getOffset(date);
	const days = getTotalDays(date);
	for (let i = 0; i < ROWS; i++) {
		for (let j = 0; j < COLUMNS; j++) {
			const cellIndex = i * COLUMNS + j;
			const correspondingDay = cellIndex - offset + 1;
			if (correspondingDay > 0 && correspondingDay <= days) {
				cells[i][j] = correspondingDay;
			} else {
				cells[i][j] = null;
			}
		}
	}
	return cells;
}

function getOffset(date) {
	const tempDate = new Date(date.getFullYear(), date.getMonth(), 1);
	return tempDate.getDay();
}

function getTotalDays(date) {
	const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	return lastDay.getDate();
}
