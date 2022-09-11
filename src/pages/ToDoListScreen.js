import "../components/todo/Calendar.css";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import CalendarComponent from "../components/todo/CalendarComponent";
import TodoListComponent from "../components/todo/TodoListComponent";

export default function ToDoListScreen({
	setScreenIndex,
	user,
	userName,
	database,
	appointments,
}) {
	const [date, setDate] = useState(new Date());

	return (
		<Col className="bootstrapColumn">
			<Row className="bootstrapRow">
				<Col md={{ span: 6 }} className="bootstrapColumn">
					<TodoListComponent
						date={date}
						setScreenIndex={setScreenIndex}
						user={user}
						userName={userName}
						database={database}
						appointments={appointments}
					/>
				</Col>
				<Col md={{ span: 6 }} className="bootstrapColumn">
					<CalendarComponent
						date={date}
						setDate={setDate}
						setScreenIndex={setScreenIndex}
						user={user}
						appointments={appointments}
					/>
				</Col>
			</Row>
		</Col>
	);
}
