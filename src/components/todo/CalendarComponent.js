import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { monthNames } from "../commonValues";
import { Col, Row } from "react-bootstrap";
import { Attachment } from "../../pages/AdditionalNoteScreen";

const ROWS = 6;
const COLUMNS = 7;

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarComponent({
	date,
	setDate,
	setScreenIndex,
	user,
	appointments,
}) {
	return (
		<div className="calendarCenter">
			<div style={{ padding: 20 }}>
				<Header date={date} setDate={setDate} />
				<Calendar
					date={date}
					setDate={setDate}
					appointments={appointments}
				/>
			</div>

			<div className="line-horizontal" />
			<DoctorNotes setScreenIndex={setScreenIndex} user={user} />
		</div>
	);
}

function Header({ date, setDate }) {
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

function Calendar({ date, setDate, appointments }) {
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
						appointments={appointments}
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

function DatePicker({ value, date, dateToday, setDate, appointments }) {
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
	if (!hasEvent(value, date, appointments)) {
		indicatorClass += "hidden";
	}
	return (
		<div
			className={dateClass}
			onClick={() => {
				const top = document.getElementById("Top");
				top.scrollTop = 100;
				var newDate = new Date(date);
				newDate.setDate(value);
				setDate(newDate);
			}}
		>
			<div className={indicatorClass} />
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

function hasEvent(value, date, appointments) {
	const event = appointments.find((item) => {
		const eventDate = item.datetime.toDate();
		return (
			eventDate.getDate() === value &&
			eventDate.getMonth() === date.getMonth() &&
			eventDate.getFullYear() === date.getFullYear()
		);
	});
	return event !== undefined;
}

function DoctorNotes({ setScreenIndex, user }) {
	const array = [];
	user.additional_notes.forEach((note) => {
		array.push(
			<Col xs={12} className="bootstrapColumn">
				<div style={{ marginBottom: 20 }}>
					<p style={{ fontSize: 17, fontWeight: 500 }}>
						{note.title}
					</p>
					<p style={{ fontSize: 13 }}>{note.value}</p>
					<Attachment
						type={note.attachedType}
						content={note.attachedItem}
						user={user}
					/>
				</div>
			</Col>
		);
	});
	return (
		<div
			style={{
				padding: 30,
				overflowY: "auto",
				background: "#fff9d9",
				flexGrow: 1,
			}}
		>
			<p className="header">Care Staff's Comments</p>
			<p className="paragraph" style={{ opacity: 0.7 }}>
				Additional notes from doctors and nurses are stated below.
			</p>
			<Row
				className="bootstrapRow"
				style={{ paddingTop: 20, paddingBottom: 20 }}
			>
				{array}
			</Row>
		</div>
	);
}
