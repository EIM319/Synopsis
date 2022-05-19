import "../components/todo/Calendar.css";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import CalendarComponent from "../components/todo/CalendarComponent";
import TodoListComponent from "../components/todo/TodoListComponent";

export default function ToDoListScreen({ setScreenIndex }) {
	const [date, setDate] = useState(new Date());

	return (
		<Row className="bootstrapRow">
			<Col md={6} className="bootstrapColumn">
				<CalendarComponent date={date} setDate={setDate} />
			</Col>
			<Col md={6} className="bootstrapColumn">
				<TodoListComponent
					date={date}
					setScreenIndex={setScreenIndex}
				/>
			</Col>
		</Row>
	);
}
