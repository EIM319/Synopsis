import { monthNames } from "../commonValues";
import mockCalendar from "../../mockdata/calendar_events.json";

export default function TodoListComponent({ date }) {
	return (
		<div className="todoList">
			<p style={{ fontWeight: 500, fontSize: 15 }}>
				{date.getDate() +
					" " +
					monthNames[date.getMonth()] +
					" " +
					date.getFullYear()}
			</p>
			<EventList date={date} />
			<ToDoList date={date} />
		</div>
	);
}

function EventList({ date }) {
	const events = mockCalendar.events.filter(
		(item) =>
			item.date === date.getDate() &&
			item.month === date.getMonth() &&
			item.year === date.getFullYear()
	);
	if (events.length === 0) return null;
	const array = [];
	events.sort((e1, e2) => e1.hour + 60 * e1.min - (e2.hour + 60 * e2.min));
	events.forEach((event) => {
		var time = new Date();
		time.setHours(event.hour);
		time.setMinutes(event.min);
		var formattedTime = time.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
		array.push(
			<div style={{ paddingBottom: 5, paddingTop: 5 }}>
				<p style={{ fontSize: 11, fontWeight: 500 }}>
					{formattedTime + " - " + event.name}
				</p>
				<p style={{ fontSize: 9 }}>{event.location}</p>
			</div>
		);
	});
	return <div className="card">{array}</div>;
}

function ToDoList() {
	const preBreakfast = [];
	const preLunch = [];
	const preDinner = [];
	const postDinner = [];
	return (
		<div className="card">
			{preBreakfast}
			<p
				style={{
					fontSize: 11,
					textAlign: "center",
					width: "100%",
					opacity: 0.5,
				}}
			>
				--- Breakfast ---
			</p>
			{preLunch}
			<p
				style={{
					fontSize: 11,
					textAlign: "center",
					width: "100%",
					opacity: 0.5,
				}}
			>
				--- Lunch ---
			</p>
			{preDinner}
			<p
				style={{
					fontSize: 11,
					textAlign: "center",
					width: "100%",
					opacity: 0.5,
				}}
			>
				--- Dinner ---
			</p>
			{postDinner}
		</div>
	);
}
