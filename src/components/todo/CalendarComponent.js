import mockCalendar from "../../mockdata/calendar_events.json";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

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

export default function CalendarComponent({ date, setDate }) {
	return (
		<div className="calendarCenter">
			<Header date={date} setDate={setDate} />
			<Calendar date={date} setDate={setDate} />
		</div>
	);
}

function Header({ date, setDate }) {
	const today = new Date();
	return (
		<div
			className="row-full"
			style={{
				justifyContent: "space-between",
				alignItems: "center",
				marginBottom: 20,
				paddingLeft: 30,
				paddingRight: 30,
			}}
		>
			<AiOutlineLeft
				size={23}
				className="toggle"
				onClick={() => {
					setDate(
						new Date(date.getFullYear(), date.getMonth() - 1, 1)
					);
				}}
			/>
			<p style={{ fontWeight: 500, fontSize: 23, textAlign: "center" }}>
				{monthNames[date.getMonth()] + " " + date.getFullYear()}
			</p>
			<AiOutlineRight
				size={23}
				className="toggle"
				onClick={() => {
					setDate(
						new Date(date.getFullYear(), date.getMonth() + 1, 1)
					);
				}}
			/>
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
	var indicatorClass = "indicator ";
	if (
		date.getMonth() === dateToday.getMonth() &&
		date.getFullYear() === dateToday.getFullYear() &&
		value === dateToday.getDate()
	) {
		dateClass += "datePickerToday ";
	}
	if (value === date.getDate()) {
		dateClass += "datePickerSelected ";
		indicatorClass += "indicatorSelected ";
	}
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

function hasEvent(value, date) {
	const event = mockCalendar.events.find(
		(item) =>
			item.date === value &&
			item.month === date.getMonth() &&
			item.year === date.getFullYear()
	);
	return event !== undefined;
}
