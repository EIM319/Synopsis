import { monthNames } from "../commonValues";
import mockCalendar from "../../mockdata/calendar_events.json";
import medication from "../../mockdata/medication.json";

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
			<TodoList date={date} />
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
			<div
				style={{ paddingBottom: 5, paddingTop: 5 }}
				key={"event" + events.indexOf(event)}
			>
				<p style={{ fontSize: 17, fontWeight: 500 }}>
					{formattedTime + " - " + event.name}
				</p>
				<p style={{ fontSize: 13 }}>{event.location}</p>
			</div>
		);
	});
	return <div className="card">{array}</div>;
}

function TodoList({ date }) {
	const todos = getTodo(date);
	const preBreakfast = [];
	const postBreakfast = [];
	const preLunch = [];
	const postLunch = [];
	const preDinner = [];
	const postDinner = [];
	const preSleep = [];
	todos.forEach((todo) => {
		const index = todos.indexOf(todo);
		if (todo.dosage_time[0]) {
			preBreakfast.push(
				<TodoItem
					todo={todo}
					index={index}
					time="Before Breakfast"
					key="Todo 0"
				/>
			);
		}
		if (todo.dosage_time[1]) {
			postBreakfast.push(
				<TodoItem
					todo={todo}
					index={index}
					time="After Breakfast"
					key="Todo 1"
				/>
			);
		}
		if (todo.dosage_time[2]) {
			preLunch.push(
				<TodoItem
					todo={todo}
					index={index}
					time="Before Lunch"
					key="Todo 2"
				/>
			);
		}
		if (todo.dosage_time[3]) {
			postLunch.push(
				<TodoItem
					todo={todo}
					index={index}
					time="After Lunch"
					key="Todo 3"
				/>
			);
		}
		if (todo.dosage_time[4]) {
			preDinner.push(
				<TodoItem
					todo={todo}
					index={index}
					time="Before Dinner"
					key="Todo 4"
				/>
			);
		}
		if (todo.dosage_time[5]) {
			postDinner.push(
				<TodoItem
					todo={todo}
					index={index}
					time="After Dinner"
					key="Todo 5"
				/>
			);
		}
		if (todo.dosage_time[6]) {
			postDinner.push(
				<TodoItem
					todo={todo}
					index={index}
					time="Before Sleep"
					key="Todo 6"
				/>
			);
		}
	});
	return (
		<div className="card">
			{preBreakfast}
			<p
				style={{
					fontSize: 17,
					textAlign: "center",
					width: "100%",
					opacity: 0.5,
				}}
			>
				--- Breakfast ---
			</p>
			{postBreakfast}
			{preLunch}
			<p
				style={{
					fontSize: 17,
					textAlign: "center",
					width: "100%",
					opacity: 0.5,
				}}
			>
				--- Lunch ---
			</p>
			{postLunch}
			{preDinner}
			<p
				style={{
					fontSize: 17,
					textAlign: "center",
					width: "100%",
					opacity: 0.5,
				}}
			>
				--- Dinner ---
			</p>
			{postDinner}
			{preSleep}
		</div>
	);
}

function TodoItem({ todo, index, time }) {
	return (
		<div style={{ paddingBottom: 5, paddingTop: 5 }} key={"todo" + index}>
			<p style={{ fontSize: 17, fontWeight: 500 }}>
				{time + " - " + todo.name}
			</p>
			<p style={{ fontSize: 13 }}>{todo.purpose}</p>
		</div>
	);
}

function getTodo(date) {
	var day = date.getDay();
	return medication.medication.filter((item) => item.dosage_days[day] === 1);
}
